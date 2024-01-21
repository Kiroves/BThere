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
export default function Home() {
  const hangleGoogle = async (e) =>  {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth,provider)
  }
  return (
    <>
      <Navbar className="sticky" />
      <main id="home" className="px-[10vw] pt-[5vh]">
        <Image src="/logo-no-background.svg" width="100" height="100" />
        <div id="video" class="flex justify-center items-center min-h-[100vh]">
          <VideoUploader />
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
