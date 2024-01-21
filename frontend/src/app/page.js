"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import VideoUploader from "@/components/Video";
import Landing from "@/components/landing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ArrowDown from "@/components/ArrowDown";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import TitleLogo from "../../public/png/logo-no-background.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function Home() {
  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return (
    <>
      <Navbar className="sticky" />
      <main className="px-[10vw] pt-[5vh]">
        <div id="home" className="flex flex-col justify-center items-center min-h-[100vh]">
          <AspectRatio id="logo" ratio={1500 / 500} className="flex justify-center object-cover">
            <Image src={TitleLogo} fill={true} alt="Title Logo" placeholder="blur" />
          </AspectRatio>
          <div id="video" className="flex justify-center items-center">
            <button onClick={handleGoogle}>Sign in With Google</button>
            <VideoUploader />
          </div>
        </div>
        <ArrowDown />
        <div id="friends">
          <div className="py-6">
            <h2 className="text-2xl font-semibold">Your Friends</h2>
            <Separator className="bg-primary" />
          </div>
          <div className="grid justify-center grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle>Kelvin Wong</CardTitle>
                <CardDescription>Feeling happy!</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="/calvin.png" width="100" height="100" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Kelvin Wong</CardTitle>
                <CardDescription>Feeling happy!</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="/calvin.png" width="100" height="100" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Kelvin Wong</CardTitle>
                <CardDescription>Feeling happy!</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="/calvin.png" width="100" height="100" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
