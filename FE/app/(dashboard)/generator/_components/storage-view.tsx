"use client";

import { getReq } from "@/lib/fetcher";
import useSWR from "swr";
import { BondCard } from "@/app/(dashboard)/generator/_components/bond-card";

export const StorageView = () => {
  const { data: bonds, isLoading } = useSWR<Bond[]>("/bonds", getReq);

  if (isLoading) return <div>...</div>;
  if (!bonds) return <div>...</div>;

  return (
    <div className="grid gap-3">
      {bonds.map((bond) => (
        <BondCard key={bond.id} bond={bond} />
      ))}
    </div>
  );
};
