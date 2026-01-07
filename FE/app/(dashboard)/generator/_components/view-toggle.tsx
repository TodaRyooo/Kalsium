"use client";

import styles from "@/app/(dashboard)/generator/_components/view-toggle.module.scss";
import { KeyRound, Database } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = "generator" | "storage";

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="mb-6 flex justify-center">
      <div className={styles.toggleContainer}>
        {/* 背景の丸 */}
        <div className={cn(styles.pill, styles[currentView])} />

        <div
          onClick={() => onViewChange("generator")}
          className={cn(styles.toggleButton, currentView === "generator" && styles.active)}
        >
          <KeyRound size={20} />
        </div>

        <div
          onClick={() => onViewChange("storage")}
          className={cn(styles.toggleButton, currentView === "storage" && styles.active)}
        >
          <Database size={20} />
        </div>
      </div>
    </div>
  );
};
