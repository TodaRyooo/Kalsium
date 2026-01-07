"use client";

import { Text } from "@/components/composites/text";

export const StorageView = () => {
  const hasBonds = false;

  return (
    <div className="w-full">
      {!hasBonds ? (
        <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
          <Text variant="muted">There are no `Bonds` saved.</Text>
        </div>
      ) : (
        <div className="grid gap-4">
          <Text>Your Saved Bonds will appear here.</Text>
        </div>
      )}
    </div>
  );
};
