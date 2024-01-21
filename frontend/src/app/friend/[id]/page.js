"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmail, setStateEmail } from "@/app/page"; // email is user's email
import { getDownloadURL, getStorage, ref } from "firebase/storage";
// ... (imports)

export default function Friends({ params }) {
  const [cards, setCards] = useState([]);
  const [friend, setFriend] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imgURL, setImgURL] = useState(""); // Declare imgURL state
  console.log(params.id);
  const id = params.id;
  const email = window.localStorage.getItem("email") || "";
  const token = window.localStorage.getItem("token") || "";
  console.log(email);

  useEffect(() => {
    async function getFriendInfo() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/friend/${id}?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await response.json();
        const events = json.events;
        const friendInfo = json.friend;

        const storage = getStorage();
        const fbRef = ref(storage, friendInfo.photo);
        const imageURL = await getDownloadURL(fbRef);
        setImgURL(imageURL); // Set imgURL state

        const mappedEvents = events.map(async (event) => {
          return {
            date: event.date,
            overall_mood: event.overall_mood,
            transcript_summary: event.transcript_summary,
          };
        });

        const fulfilledEvents = await Promise.all(mappedEvents);

        setCards(fulfilledEvents);
        setFriend(friendInfo);
        setDataLoaded(true); // Mark data as loaded
      } catch (error) {
        console.error("Error fetching friend info:", error);
        // Handle error if necessary
      }
    }

    if (token) {
      getFriendInfo();
    }
  }, [id, email, token]); // Include dependencies in the dependency array

  return (
    <>
      {dataLoaded ? (
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>{friend.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={imgURL} width="100" height="100" alt="Friend's Photo" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {dataLoaded ? (
        <>
          {cards.map((card, idx) => {
            return (
              <Card>
                <CardHeader>
                  <CardTitle>{card.title_summary}</CardTitle>
                  <CardDescription>{card.overall_mood}</CardDescription>
                </CardHeader>
                <CardContent>{card.date}</CardContent>
                <CardContent>{card.transcript_summary}</CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
