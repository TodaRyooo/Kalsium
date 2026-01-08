"use client";

import { Text } from "@/components/composites/text";
import { Card, CardContent } from "@/components/composites/card";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { getReq } from "@/lib/fetcher";

interface Bond {
  id: string;
  identity: string;
  pass: string;
  note: string;
}

export const StorageView = () => {
  const { data: bonds, error, isLoading } = useSWR<Bond[]>("/bonds", getReq);

  // ローディング中
  if (isLoading) return <div className="animate-pulse py-10 text-center text-slate-400">Loading your vault...</div>;

  if (!bonds || bonds.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
        <Text variant="muted">There are no `Bonds` saved.</Text>
        <Text className="mt-2 text-xs text-slate-400">Generate a new one to get started!</Text>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4 px-1">
        <Text variant="h2" className="text-lg font-semibold">
          Saved Bonds
        </Text>
        <Badge variant="outline" className="font-mono">
          {bonds.length}
        </Badge>
      </div>

      <div className="grid gap-3">
        {bonds.map((bond) => (
          <Card key={bond.id} className="transition-hover overflow-hidden shadow-sm hover:border-slate-300">
            <CardContent className="px-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Text className="font-medium text-slate-900">{bond.identity}</Text>
                </div>

                <div className="rounded border border-slate-100 bg-slate-50 p-2">
                  <code className="block font-mono text-sm break-all text-slate-700">{bond.pass}</code>
                </div>

                {bond.note && (
                  <div className="pt-1">
                    <Text variant="muted" className="text-xs leading-relaxed italic">
                      {bond.note}
                    </Text>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
