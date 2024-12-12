"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ShopSkeleton() {
  return (
    <Skeleton className="grid grid-rows-[auto_1fr_auto] bg-card shadow-[3px_5px_20px_0px_#0000000a] p-6 gap-4">
      <Skeleton className="bg-primary-foreground h-8"></Skeleton>
      <div className="flex flex-col gap-4">
        <Skeleton className="bg-primary-foreground h-40"></Skeleton>
        <Skeleton className="bg-primary-foreground h-8"></Skeleton>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <Skeleton className="bg-primary-foreground h-8 flex-1" />
        <Skeleton className="bg-primary-foreground h-8 flex-1" />
      </div>
    </Skeleton>
  );
}
