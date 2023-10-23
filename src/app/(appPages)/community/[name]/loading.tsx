import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <div className=" w-full flex flex-col items-center h-[calc(100vh-3rem)] ">
      <div className=" w-full gap-2 flex flex-col items-center">
        <Skeleton className="scroll-m-20 h-5 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" />
      </div>
      <div className=" w-full h-full flex flex-col gap-2">
        <Skeleton className=" w-full max-w-4xl mx-4 h-60" />
        <Skeleton className=" w-full max-w-4xl mx-4 h-60" />
        <Skeleton className=" w-full max-w-4xl mx-4 h-60" />
        <Skeleton className=" w-full max-w-4xl mx-4 h-60" />
      </div>
    </div>
  );
}
