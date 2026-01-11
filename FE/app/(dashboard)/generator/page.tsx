"use client";

import styles from "@/app/(dashboard)/generator/page.module.scss";
import { useState } from "react";
import { Text } from "@/components/composites/text";
import { GeneratorForm } from "./_components/generator-form";
import { StorageView } from "./_components/storage-view";
import { ViewToggle } from "./_components/view-toggle";
import { cn } from "@/lib/utils";

import { LogOut } from "lucide-react";
import { useAtom } from "jotai";
import { tokenAtom, currentUserAtom } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/composites/button";

export default function Page() {
  const [view, setView] = useState<"generator" | "storage">("generator");
  const router = useRouter();
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-24px)] w-full flex-col justify-start pb-10">
      <div className="sticky top-0 z-30 mx-4 flex flex-col items-center gap-4 bg-white/75 [mask-image:linear-gradient(to_bottom,black_90%,transparent)] py-6 backdrop-blur-md sm:mx-8">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-2">
          <div />

          <div className="flex justify-center">
            <ViewToggle currentView={view} onViewChange={setView} />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleLogout}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] transition-all duration-200 ease-in-out",
                "text-white hover:bg-red-50 hover:text-red-500 hover:shadow-sm active:scale-95",
              )}
              title="Logout"
            >
              <LogOut size={12} strokeWidth={2.5} />
            </Button>
          </div>
        </div>

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
            Access and organize your saved Bonds.
          </Text>
        </div>
      </div>

      <div className={cn(styles.viewContainer, "px-12")}>
        <div className={cn(styles.viewContent, styles.visible)}>
          {view === "generator" ? <GeneratorForm /> : <StorageView />}
        </div>
      </div>
    </div>
  );
}
