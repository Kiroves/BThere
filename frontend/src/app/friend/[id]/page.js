"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmail, setStateEmail } from "@/app/page"; // email is user's email
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import ProfilePlaceholder from "../../../../public/png/profile_placeholder.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import YSkel from "@/components/YSkel";

export default function Friends({ params }) {
  const [cards, setCards] = useState([]);
  const [friend, setFriend] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imgURL, setImgURL] = useState(""); // Declare imgURL state
  console.log(params.id);
  const id = params.id;
  const email = window.localStorage.getItem("email") || "";
  const token = window.localStorage.getItem("token") || "";
  console.log(cards);

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
        if (!friendInfo.photo) {
          setImgURL(ProfilePlaceholder.src); // Set imgURL state
        } else {
          const storage = getStorage();
          const fbRef = ref(storage, friendInfo.photo);
          const imageURL = await getDownloadURL(fbRef);
          setImgURL(imageURL); // Set imgURL state
        }

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

  console.log(cards);

  return (
    <>
      {dataLoaded ? (
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl">{friend.name}</div>
            <img src={imgURL} width="100" height="100" alt="Friend's Photo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            {cards.map((card, idx) => {
              const date = new Date(card.date * 1000);
              const dateString = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${idx + 1}`}>
                    <AccordionTrigger>
                      <div>{dateString}</div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="">
                        <span className="font-bold">Overall Mood: </span>
                        {card.overall_mood}
                      </div>
                      <div className="text-left">
                        <span className="font-bold">Summary: </span>
                        {card.transcript_summary}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        </div>
      ) : (
        <YSkel />
      )}
    </>
  );
}
