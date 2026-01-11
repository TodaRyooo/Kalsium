"use client";

import { getReq } from "@/lib/fetcher";
import useSWR from "swr";
import { BondCard } from "@/app/(dashboard)/generator/_components/bond-card";

export const StorageView = () => {
  const { data: bonds, isLoading } = useSWR<Bond[]>("/bonds", getReq);

  if (isLoading) return <div>Loading Bonds...</div>;
  if (!bonds) return <div>No Bonds found</div>;

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bonds.map((bond) => (
        <BondCard key={bond.id} bond={bond} />
      ))}
    </div>
  );
};
