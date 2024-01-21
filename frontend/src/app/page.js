"use client";
import Image from "next/image";
import { useState } from "react";
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

import VideoPreview from "@/components/VideoPreview";

export default function Home() {
  const [isLiveVisible, setLiveVisible] = useState(false);

  const handleToggleLive = () => {
    setLiveVisible(!isLiveVisible);
  };
  // auth
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");

  console.log(user, token);

  // video preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [sourceKey, setSourceKey] = useState(0);

  const previewImages = [
    {
      name: "Kelvin Wong",
      description: "I am happy!",
      image: exampleImage,
    },
    {
      name: "Kelvin Wong",
      description: "I am happy!",
      image: exampleImage,
    },
    {
      name: "Kelvin Wong",
      description: "I am happy!",
      image: exampleImage,
    },
  ];
  return (
    <>
      <Navbar className="sticky" setToken={setToken} setUser={setUser} />
      <main className="px-[10vw] pt-[5vh]">
        <div id="home" className="flex flex-col items-center min-h-[100vh]">
          <div className="w-3/5">
            <AspectRatio id="logo" ratio={1500 / 500} className="flex justify-center object-cover">
              <Image src={TitleLogo} fill={true} className="" alt="Title Logo" placeholder="blur" />
            </AspectRatio>
          </div>
          <div id="video-section" className="flex flex-col justify-center items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="my-5" variant="outline">
                  Upload Video
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4 space-y-2">
                  <VideoUploader
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    setSourceKey={setSourceKey}
                  />
                  <p>component2</p>
                  {/* put camera component here */}
                </div>
              </PopoverContent>
            </Popover>
            <div id="video" />
            {selectedFile && <VideoPreview sourceKey={sourceKey} selectedFile={selectedFile} />}
            <div>
              <button onClick={handleToggleLive}>
                {isLiveVisible ? "Turn Off Live" : "Turn On Live"}
              </button>

              {isLiveVisible && <PublishingComponent />}
            </div>
          </div>
        </div>
        <ArrowDown />
        <div id="friends">
          <div className="py-6">
            <h2 className="text-2xl font-semibold">Your Friends</h2>
            <Separator className="bg-primary" />
          </div>
          <div className="grid justify-center grid-cols-2 gap-3">
            {previewImages.map((previewImages, idx) => {
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
