"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// email is user's email
export default function Friends({ params }) {
  console.log(params.id);
  //id, email, name, description, image
  let name = "kelvin";
  let description = "hi";
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
