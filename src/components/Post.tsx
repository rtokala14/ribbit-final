import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import NestedLink from "./nested-link";

export default function Post({
  postData,
}: {
  postData: {
    title: string | null;
    username: string | null;
    content: string | null;
    id: number;
    communityId: number | null;
    createdAt: Date | null;
    author: string | null;
    community: {
      id: number;
      name: string | null;
      description: string | null;
      createdAt: Date | null;
      author: string | null;
    } | null;
  };
}) {
  return (
    <Card className=" w-full shadow-sm bg-secondary mb-2">
      <CardHeader>
        <CardTitle>{postData.title}</CardTitle>
        <CardDescription className=" flex items-center gap-2">
          <NestedLink
            href={`/user/${postData.username}`}
            text={`u/${postData.username}`}
          />
          <NestedLink
            href={`/community/${postData.community?.name}`}
            text={`c/${postData.community?.name}`}
          />
        </CardDescription>
        <Separator className=" bg-primary" />
      </CardHeader>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{ __html: postData.content as string }}
        ></div>
      </CardContent>
    </Card>
  );
}
