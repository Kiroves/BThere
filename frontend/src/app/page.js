import Image from "next/image";
import styles from "./page.module.css";
import VideoUploader from "@/components/Video";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Home() {



  return (
    <main className="px-[10vw]">
      <VideoUploader />
      <div className="text-3xl ">hello</div>
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
        </Card>{" "}
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
    </main>
  );
}
