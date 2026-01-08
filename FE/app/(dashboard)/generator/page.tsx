"use client";

import styles from "@/app/(dashboard)/generator/page.module.scss";
import { useState } from "react";
import { Text } from "@/components/composites/text";
import { GeneratorForm } from "./_components/generator-form";
import { StorageView } from "./_components/storage-view";
import { ViewToggle } from "./_components/view-toggle";
import { cn } from "@/lib/utils";

export default function Page() {
  const [view, setView] = useState<"generator" | "storage">("generator");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full flex-col justify-start px-8 pb-10 md:px-16">
      <div className="sticky top-[0px] z-30 mb-12 bg-white/60 [mask-image:linear-gradient(to_bottom,black_75%,transparent)] pt-16 pb-12 text-center backdrop-blur-md">
        <ViewToggle currentView={view} onViewChange={setView} />
        <div className={styles.textStack}>
          <Text variant="h1" className={cn(styles.textItem, view === "generator" ? styles.visible : styles.hidden)}>
            Generator
          </Text>
          <Text variant="h1" className={cn(styles.textItem, view === "storage" ? styles.visible : styles.hidden)}>
            Storage
          </Text>
        </div>

        <div className={styles.mutedStack}>
          <Text variant="muted" className={cn(styles.textItem, view === "generator" ? styles.visible : styles.hidden)}>
            Manage your security with precision.
          </Text>
          <Text variant="muted" className={cn(styles.textItem, view === "storage" ? styles.visible : styles.hidden)}>
            Access and organize your saved credentials.
          </Text>
        </div>
      </div>

      <div className={styles.viewContainer}>
        <div className={cn(styles.viewContent, view === "generator" ? styles.visible : styles.hidden)}>
          <GeneratorForm />
        </div>
        <div className={cn(styles.viewContent, view === "storage" ? styles.visible : styles.hidden)}>
          <StorageView />
        </div>
      </div>
    </div>
  );
}
