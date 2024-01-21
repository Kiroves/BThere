"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import VideoUploader from "@/components/VideoUploader";
import YSkel from "@/components/Yskel";
import PublishingComponent from "@/components/live";
import Navbar from "@/components/Navbar";
import ArrowDown from "@/components/ArrowDown";
import TitleLogo from "../../public/png/logo-no-background.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import VideoPreview from "@/components/VideoPreview";
import Cards from "@/components/Cards";
import AddFriend from "@/components/AddFriend";

export default function Home() {
  const [isLiveVisible, setLiveVisible] = useState(false);

  const handleToggleLive = () => {
    setLiveVisible(!isLiveVisible);
  };

  // auth
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    window.localStorage.setItem("email", email);
  }, [email]);
  // video preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [sourceKey, setSourceKey] = useState(0);
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Navbar className="sticky" setToken={setToken} setUser={setUser} setEmail={setEmail} toke = {token}/>
      <main className="px-[10vw] pt-[5vh]">
        {token? (
          <>
        <div id="home" className="flex flex-col items-center min-h-[100vh]">
          <div className="w-3/5">
            <AspectRatio id="logo" ratio={1500 / 500} className="flex justify-center object-cover">
              <Image
                src={TitleLogo}
                fill={true}
                className=""
                alt="Title Logo"
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
          </div>
          <div id="video-section" className="flex flex-col justify-center items-center">
            <div className="mt-24 flex flex-row gap-20 mb-4">
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
                onClick={() => {
                  handleToggleLive();
                }}
                className="bg-primary hover:bg-primary text-black">
                {isLiveVisible ? "Turn off Live" : "Turn on Live"}
              </Button>
            </div>

            <div id="video" />
            {selectedFile && <VideoPreview sourceKey={sourceKey} selectedFile={selectedFile} />}
            {isLiveVisible && <PublishingComponent />}
            <AddFriend/>
          </div>
        </div>
        <ArrowDown />
        <div id="friends">
          <div className="py-6">
            <h2 className="text-2xl font-semibold">Your Friends</h2>
            <Separator className="bg-primary" />
          </div>
          <div className="grid justify-center grid-cols-2 gap-3">
            <Cards token={token} email={email} />
          </div>
            </div>
            </>):(<>
                        <div class = "mb-3">
            <p>Please sign in to access this content.</p>
          </div>
            <div class="space-y-12">
              <YSkel />
              <YSkel />
              <YSkel />
              <YSkel />
              <YSkel />

            </div>
          </>)}
      </main>
    </>
  );
}