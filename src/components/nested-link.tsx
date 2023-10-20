"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function NestedLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      className=" hover:underline"
      href={href}
      onClick={(e) => e.stopPropagation()}
    >
      {text}
    </Link>
  );
}
