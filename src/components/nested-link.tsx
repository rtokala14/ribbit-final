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
        router.push(href);
        e.stopPropagation();
      }}
    >
      {text}
    </button>
  );
}
