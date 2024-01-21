import React, { useState } from "react";
import VideoUploader from "./VideoUploader";
import VideoPreview from "./VideoPreview";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddFriend = ({ selectedFile, setProgress, setRefresh }) => {
  const [friendName, setFriendName] = useState("");

  const handleNameChange = (e) => {
    setFriendName(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(selectedFile, "submitting");

    if (!selectedFile) {
      return;
    }
    const email = window.localStorage.getItem("email") || "";
    const token = window.localStorage.getItem("token") || "";

    // submit video to firebase storage
    const storage = getStorage();
    const arr = new Uint32Array(10);
    crypto.getRandomValues(arr);
    const storageRef = ref(storage, `videos/${email}/${friendName}${arr[0].toString()}`);
    const metadata = {
      contentType: "video/mp4",
    };

    const uploadTask = uploadBytesResumable(storageRef, selectedFile, metadata);
    console.log(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      async () => {
        // on success
        if (friendName === "") {
          const response = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/add_video?email=${email}&video=${uploadTask.snapshot.ref.fullPath}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).then(
            setTimeout(() => {
              setRefresh((refresh) => !refresh);
            }, 15000)
          );
        } else {
          const response = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/add_new_friend?email=${email}&name=${friendName}&video=${uploadTask.snapshot.ref.fullPath}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).then(
            setTimeout(() => {
              setRefresh((refresh) => !refresh);
            }, 15000)
          );
        }
      }
    );
  }

  return (
    <div>
      <div>
        First time meeting someone? Add their name to BThere and we'll remember their name and face!
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="John Smith"
            value={friendName}
            onChange={handleNameChange}
          />
        </div>
        <br />

        <button type="submit" className="bg-primary text-black py-2 px-4 rounded">
          Add Friend
        </button>
      </form>
    </div>
  );
};

export default AddFriend;
