import Post from "@/components/Post";
import NestedLink from "@/components/nested-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPost } from "@/server/serverActions";
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
    <Card className=" bg-secondary w-full max-w-4xl mx-4">
      <CardHeader>
        <CardTitle>{postData.title}</CardTitle>
        <CardDescription className=" flex items-center gap-2">
          <NestedLink
            href={`/user/${postData.username}`}
            text={`u/${postData.username}`}
          />
          <NestedLink
            href={`/community/${postData.community.name}`}
            text={`c/${postData.community.name}`}
          />
        </CardDescription>
        <Separator className=" bg-primary" />
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
      </CardContent>
    </Card>
  );
}
