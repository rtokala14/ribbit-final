import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extensionList = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "my-6 ml-6 list-disc [&>li]:mt-2",
      },
    },
    heading: {
      HTMLAttributes: {
        class: "text-xl font-bold",
        levels: [2],
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "leading-7 [&:not(:first-child)]:mt-6 ",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "my-6 ml-6 list-decimal [&>li]:mt-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "[&>code]:relative [&>code]:rounded [&>code]:bg-background [&>code]:px-[0.3rem] [&>code]:py-[0.2rem] [&>code]:font-mono [&>code]:text-sm [&>code]:font-semibold",
      },
      exitOnArrowDown: true,
    },
  }),
  CharacterCount.configure({
    limit: 350,
  }),
];
