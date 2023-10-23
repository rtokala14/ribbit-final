"use client";

import { useRouter } from "next/navigation";

export default function NestedLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const router = useRouter();
  return (
    <button
      className=" hover:underline"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(href);
      }}
    >
      {text}
    </button>
  );
}
