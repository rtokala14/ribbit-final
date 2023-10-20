import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className=" pt-4 w-full max-w-3xl flex flex-col items-center">
        {children}
      </main>
    </>
  );
}
