import React, { Suspense } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { ChevronDown, Github, Plus } from "lucide-react";
import ThemeChanger from "./themeSwitch";
import Link from "next/link";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "./ui/skeleton";

const Navbar = async () => {
  const currUser = await currentUser();
  return (
    <div className=" sticky shadow-lg top-0 w-screen h-12 justify-between flex items-center border-b-border border-b p-2 bg-secondary">
      <div className=" justify-start flex items-center">
        <Button
          variant={"ghost"}
          asChild
          className=" text-2xl font-extrabold tracking-tight lg:text-3xl"
        >
          <Link href="/">Ribbit</Link>
        </Button>
      </div>
      <div className=" flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant={"outline"} size={"icon"}>
                <a
                  href="https://github.com/rtokala14/ribbit-next13"
                  target="_blank"
                  rel=" noreferrer"
                >
                  <Github size={20} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Source Code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Suspense fallback={<Skeleton className=" h-6 w-6" />}>
                <ThemeChanger />
              </Suspense>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant={"outline"} size={"icon"}>
                <Link href="/create-post">
                  <Plus size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create Post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {currUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currUser.imageUrl} />
                  <AvatarFallback>{`${currUser.firstName?.charAt(
                    0
                  )}${currUser.lastName?.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <h1 className="ml-2 hidden md:block">{currUser.username}</h1>
                <ChevronDown size={20} className="ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Stuff</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className=" hover:cursor-pointer" asChild>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className=" hover:cursor-pointer" asChild>
                  <Link href={"/settings"}>User Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href={"/create-community"}>Create Community</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href={"/create-post"}>Create Post</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer">
                <Button asChild className="w-full" variant={"destructive"}>
                  <SignOutButton />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild variant={"default"}>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            {/* <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
