"use client";

import { Text } from "@/components/composites/text";

import useSWR from "swr";
import { getReq } from "@/lib/fetcher";

export const StorageView = () => {
  const hasBonds = true;
  const { data: bonds, error, isLoading } = useSWR("/bonds", getReq);
  console.log("data", bonds);

  return (
    <div className="w-full">
      {!hasBonds ? (
        <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
          <Text variant="muted">There are no `Bonds` saved.</Text>
        </div>
      ) : (
        <div className="grid gap-4">
          <Text>{bonds ? Object.keys(bonds?.[0]).map((k) => `${bonds[0][k]}\n`) : "none"}</Text>
        </div>
      )}
    </div>
  );
};
