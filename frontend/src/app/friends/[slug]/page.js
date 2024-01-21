"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Friends({ slug, name, description, image }) {
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
