import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfilePlaceholder from "../../public/png/profile_placeholder.jpg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Friends from "@/app/friend/[id]/page";
import YSkel from "./YSkel";

export default function Cards({ token, email, refresh }) {
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

      const storage = getStorage();

      const mappedFriends = friends.map(async (friend) => {
        console.log(friend.photo);
        if (!friend.photo) {
          return {
            name: friend.name,
            description: friend.rec || "",
            image: ProfilePlaceholder.src,
            id: friend.id,
          };
        }
        const fbRef = ref(storage, friend.photo);
        const imgURL = await getDownloadURL(fbRef);
        return {
          name: friend.name,
          description: friend.rec || "",
          image: imgURL, // url
          id: friend.id,
        };
      });

      const fulFilledFriends = await Promise.all(mappedFriends);

      setCards(fulFilledFriends);
    }
    if (token) {
      getAllFriends();
    }
  }, [token, refresh]);

  return (
    <>
      {cards.length === 0 && (
        <>
          <YSkel />
          <YSkel />
        </>
      )}
      {cards.map((card, idx) => {
        console.log(card.image);
        return (
          <Dialog key={card.id}>
            <DialogTrigger>
              <Card>
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>
                    <div className="text-left">{card.description}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={card.image} width="100" height="100" />
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <div className="pb-2">Conversation History with</div>
                </DialogTitle>
                <DialogDescription>
                  <Friends params={{ id: card.id }} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}
