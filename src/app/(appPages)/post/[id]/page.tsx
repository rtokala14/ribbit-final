import Post from "@/components/Post";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { extensionList } from "@/lib/utils";
import { getPost } from "@/server/serverActions";
import { generateHTML } from "@tiptap/react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const postDataRes = await getPost(Number(params.id));

  const postData = JSON.parse(postDataRes).content;

  return (
    <Card className=" w-full max-w-4xl mx-4">
      <CardHeader>
        <CardTitle>{postData.title}</CardTitle>
        <CardDescription>
          <Link
            href={`/user/${postData.username}`}
            className=" hover:underline"
          >
            {`u/${postData.username}`}
          </Link>
          <Link
            className=" hover:underline ml-2"
            href={`/community/${postData.community.name}`}
          >
            {`c/${postData.community.name}`}
          </Link>
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
      </CardContent>
    </Card>
  );
}
