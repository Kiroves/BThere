import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cards({ token, email }) {
  // friends
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getAllFriends() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get_all_friends?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();

      const friends = json.friends;
      console.log(friends);

      const storage = getStorage();

      const mappedFriends = friends.map(async (friend) => {
        const fbRef = ref(storage, friend.photo);
        const imgURL = await getDownloadURL(fbRef);
        return {
          name: friend.name,
          description: friend.rec,
          image: imgURL, // url
        };
      });

      const fulFilledFriends = await Promise.all(mappedFriends);

      console.log(fulFilledFriends);
      setCards(fulFilledFriends);
    }
    if (token) {
      getAllFriends();
    }
  }, [token]);

  return (
    <>
      {cards.map((card, idx) => {
        return (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={card.image} width="100" height="100" />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
