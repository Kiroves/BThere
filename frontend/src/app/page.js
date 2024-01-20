import Image from "next/image";
import { Separator } from "@/components/ui/separator";
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
    </main>
  );
}
