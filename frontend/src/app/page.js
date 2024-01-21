"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import VideoUploader from "@/components/VideoUploader";

import exampleImage from "../../public/calvin.png";

import PublishingComponent from "@/components/live";
import Navbar from "@/components/Navbar";
import ArrowDown from "@/components/ArrowDown";
import TitleLogo from "../../public/png/logo-no-background.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PreviewCard from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";

import { Icon } from "@iconify/react";
import VideoPreview from "@/components/VideoPreview";

export default function Home() {
  const [isLiveVisible, setLiveVisible] = useState(false);

  const handleToggleLive = () => {
    setLiveVisible(!isLiveVisible);
  };
  // auth
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  console.log(user, token);

  // video preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [sourceKey, setSourceKey] = useState(0);
  const [progress, setProgress] = useState(0);

  // friends
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello_world`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

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
      console.log(json);
      const friends = json.friends;
      setCards(
        friends.map((friend) => {
          return {
            name: friend.name,
            description: friend.rec,
            image: friend.photo, // url
          };
        })
      );
    }
    if (token) {
      getAllFriends();
    }
  }, [token]);
  return (
    <>
      <Navbar className="sticky" setToken={setToken} setUser={setUser} setEmail={setEmail} />
      <main className="px-[10vw] pt-[5vh]">
        <div id="home" className="flex flex-col items-center min-h-[100vh]">
          <div className="w-3/5">
            <AspectRatio id="logo" ratio={1500 / 500} className="flex justify-center object-cover">
              <Image src={TitleLogo} fill={true} className="" alt="Title Logo" placeholder="blur" />
            </AspectRatio>
          </div>
          <div id="video-section" className="flex flex-col justify-center items-center">
            <div className="mt-24 flex flex-row gap-20">
              <VideoUploader
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setSourceKey={setSourceKey}
                disabled={isLiveVisible}
                progress={progress}
                setProgress={setProgress}
              />
              <Button
                disabled={selectedFile}
                onClick={handleToggleLive}
                className="bg-primary hover:bg-primary">
                {isLiveVisible ? "Turn off Live" : "Turn on Live"}
              </Button>
            </div>

            <div id="video" />
            {selectedFile && <VideoPreview sourceKey={sourceKey} selectedFile={selectedFile} />}
            {isLiveVisible && <PublishingComponent />}
          </div>
        </div>
        <ArrowDown />
        <div id="friends">
          <div className="py-6">
            <h2 className="text-2xl font-semibold">Your Friends</h2>
            <Separator className="bg-primary" />
          </div>
          <div className="grid justify-center grid-cols-2 gap-3">
            {cards.map((previewImages, idx) => {
              return (
                <PreviewCard
                  name={previewImages.name}
                  description={previewImages.description}
                  image={previewImages.image}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
