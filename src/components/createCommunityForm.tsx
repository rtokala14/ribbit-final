"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "./ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Community Name should have at least 2 characters" })
    .max(50, {
      message: "Community Names can have a maximum of 50 characters",
    })
    .trim(),
  description: z
    .string()
    .max(150, {
      message: "Community descriptions cannot have more than 150 characters",
    })
    .optional(),
});

const nameValidate = async (value: string) => {
  const res = await fetch("/api/checkCommunityName/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkName: value,
    }),
  });

  const data = await res.json();

  if (!data.isValid) {
    return "Community name taken";
  }
  return undefined;
};

export function CommunityForm() {
  const { user } = useUser();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",

    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function validateName(value: string) {
    // Validate the "name" field using the async nameValidate function
    const error = await nameValidate(value);

    if (error) {
      form.setError("name", {
        type: "server",
        message: error,
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isNameInValid = await nameValidate(values.name);

    if (isNameInValid) {
      form.setError("name", {
        type: "server",
        message: "Community name taken",
      });
      return;
    }

    if (!user) {
      return;
    }

    const res = await fetch("/api/createCommunity/", {
      method: "PUT",
      body: JSON.stringify({
        commName: values.name,
        description: values.description,
        userId: user.id,
      }),
    });

    const data = await res.json();

    if (!data.isSuccess) {
      toast({
        variant: "destructive",
        title: "Uh oh! Could not create community.",
        description:
          "There was a problem with the request. Please try again later.",
      });
    }

    toast({
      title: `Created community \"${values.name}\" succesfully!`,
    });

    router.push(`/community/${values.name}`);

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="RickAndMorty"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    validateName(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription>Enter a unique community name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Wubba Lubba Dub Dub" {...field} />
              </FormControl>
              <FormDescription>Enter a community description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            form.formState.errors.name?.message
              ? true
              : form.formState.errors.description?.message
              ? true
              : false
          }
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
