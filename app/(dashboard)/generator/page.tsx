// app/(dashboard)/generator/page.tsx
"use client";

import { useState } from "react";
import { Text } from "@/components/composites/text";
import { GeneratorForm } from "./_components/generator-form";
import { StorageView } from "./_components/storage-view"; // 追加
import { ViewToggle } from "./_components/view-toggle";

export default function Page() {
  const [view, setView] = useState<"generator" | "storage">("generator");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full flex-col justify-start px-8 py-10 md:px-16">
      <div className="mb-12 space-y-2 text-center">
        <ViewToggle currentView={view} onViewChange={setView} />
        <Text variant="h1">{view === "generator" ? "Generator" : "Storage"}</Text>
        <Text variant="muted">
          {view === "generator"
            ? "Manage your security with precision."
            : "Access and organize your saved credentials."}
        </Text>
      </div>

      {view === "generator" ? <GeneratorForm /> : <StorageView />}
    </div>
  );
}
