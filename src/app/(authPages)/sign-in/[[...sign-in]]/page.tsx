"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <main className="flex w-full h-screen items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
        signUpUrl="/sign-up"
        routing="path"
        path="/sign-in"
      />
    </main>
  );
}
