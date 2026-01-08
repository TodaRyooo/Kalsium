"use client";

import { Trash2 } from "lucide-react";
import { mutate } from "swr";
import { getReq } from "@/lib/fetcher";
import useSWR from "swr";

import { Text } from "@/components/composites/text";
import { Card, CardContent } from "@/components/composites/card";
import { AlertDialog } from "@/components/composites/alert-dialog";

interface Bond {
  id: string;
  identity: string;
  pass: string;
  note: string;
}

export const StorageView = () => {
  const { data: bonds, isLoading } = useSWR<Bond[]>("/bonds", getReq);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/bonds/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      // SWRのキャッシュを更新して再取得
      await mutate("/bonds");
    } catch (e) {
      console.error(e);
      alert("Failed to delete the bond.");
    }
  };

  if (isLoading) return <div className="animate-pulse p-10 text-center text-slate-400">Scanning vault...</div>;

  if (!bonds || bonds.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
        <Text variant="muted">No bonds found.</Text>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <Text variant="h2" className="px-1 text-lg font-semibold">
        Saved Bonds
      </Text>

      <div className="grid gap-3">
        {bonds.map((bond) => (
          <Card key={bond.id} className="group relative overflow-hidden transition-all hover:border-slate-300">
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <AlertDialog
                title="Delete this bond?"
                description={
                  <div className="mt-4 space-y-2 text-left">
                    <p className="text-sm text-slate-500">Are you sure you want to delete the following entry?</p>
                    <div className="space-y-1 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs">
                      <div className="flex gap-2">
                        <span className="w-16 font-semibold text-slate-700">Identity:</span>
                        <span className="text-slate-600">{bond.identity}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-16 font-semibold text-slate-700">Password:</span>
                        <code className="rounded bg-slate-200/50 px-1 font-mono">{bond.pass}</code>
                      </div>
                      {bond.note && (
                        <div className="flex gap-2">
                          <span className="w-16 font-semibold text-slate-700">Note:</span>
                          <span className="truncate text-slate-600">{bond.note}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] font-medium text-red-500">※ This action will move the record to trash.</p>
                  </div>
                }
                actionLabel="Delete"
                variant="destructive"
                onConfirm={() => handleDelete(bond.id)}
                trigger={
                  <button className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                }
              />
            </div>

            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <Text className="pr-8 font-medium text-slate-900">{bond.identity}</Text>

                <div className="rounded border border-slate-100 bg-slate-50 p-2">
                  <code className="block font-mono text-sm break-all text-slate-700">{bond.pass}</code>
                </div>

                {bond.note && (
                  <Text variant="muted" className="text-xs italic">
                    {bond.note}
                  </Text>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
