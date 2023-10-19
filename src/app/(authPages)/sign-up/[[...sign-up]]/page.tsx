"use client";
import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <main className="flex w-full h-screen items-center justify-center">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
        signInUrl="/sign-in"
        path="/sign-up"
      />
    </main>
  );
}
