import Image from "next/image";
import styles from "./page.module.css";
import VideoUploader from "@/components/Video";
export default function Home() {
  return (
    <main>
      <VideoUploader/>
      <div className="text-3xl ">hello</div>
    </main>
  );
}
