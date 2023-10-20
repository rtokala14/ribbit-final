"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsDownUp } from "lucide-react";
import { cn, extensionList } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { filterCommunity } from "@/server/serverActions";
import Tiptap from "./Tiptap";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import { useRouter } from "next/navigation";

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Post title must be between 1 and 256 characters",
    })
    .trim()
    .max(256, {
      message: "Post title must be between 1 and 256 characters",
    }),
  content: z.string(),
  communityId: z.number(),
});

async function refetchValues(inputValue: string) {
  let communities = await filterCommunity(inputValue).then((res) => {
    return res.map((community) => {
      return { label: community.label as string, value: community.value };
    });
  });

  return communities;
}

export default function PostForm() {
  const { user } = useUser();

  const router = useRouter();

  const [communities, setCommunities] = useState<
    { label: string; value: number }[]
  >([{ label: "Development", value: 3 }]);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      communityId: 0,
    },
    reValidateMode: "onChange",
  });

  const editor = useEditor({
    extensions: extensionList,
    content: form.getValues("content"),
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-background px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    // onUpdate({ editor }) {
    //   form.("content").(editor.getHTML());
    //   //   console.log(editor.getHTML());
    // },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    if (!user) {
      return;
    }

    const contentData = editor?.getHTML();

    const res = await fetch("/api/createGetPost/", {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        communityId: values.communityId,
        content: contentData,
        userId: user.id,
        username: user.username,
      }),
    });

    const data = await res.json();

    if (!data) {
      return;
    }

    router.push(`/post/${data.postId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Blah Blah" />
              </FormControl>
              <FormDescription>Enter a title for your post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="communityId"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select Community</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? communities.find(
                            (community) => community.value === field.value
                          )?.label
                        : "Select community"}
                      <ChevronsDownUp className="w-4 h-4 ml-2 shrink-0 opacity-50 " />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search community..."
                      className="h-9"
                      onValueChange={async (value) => {
                        const vals = await refetchValues(value);
                        setCommunities(vals);
                      }}
                    />
                    <CommandEmpty>No matching community found.</CommandEmpty>
                    <CommandGroup>
                      {communities.map((community) => (
                        <CommandItem
                          value={community.label}
                          key={community.value}
                          onSelect={() => {
                            form.setValue("communityId", community.value);
                          }}
                        >
                          {community.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              community.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the community for the post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Tiptap
                  editor={editor!}
                  description={field.value}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
