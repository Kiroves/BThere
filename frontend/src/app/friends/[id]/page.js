"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// email is user's email
export default function Friends({ params }) {
  console.log(params.id);
  //id, email, name, description, image
  let name = "kelvin";
  let description = "hi";
  let image =
    "https://firebasestorage.googleapis.com/v0/b/vidshare-2d9f0.appspot.com/o/IMG_20210905_155751.jpg?alt=media&token=8b7b9b9a-9b9a-4b9b-8b9b-9b9b9b9b9b9b";
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={image} width="100" height="100" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
