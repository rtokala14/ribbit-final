import Link from "next/link";

export const metadata = {
  title: "Ribbit - The NextJS Reddit",
  description: "Created by Rohit Tokala",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Link
          className="text-4xl select-none w-screen text-center font-extrabold"
          href="/"
        >
          Ribbit
        </Link>
      </div>
      {children}
    </>
  );
}
