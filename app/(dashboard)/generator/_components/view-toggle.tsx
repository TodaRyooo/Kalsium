"use client";

import { KeyRound, Database } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = "generator" | "storage";

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  const baseStyle = "p-2 rounded-full transition-all duration-200 cursor-pointer";
  const activeStyle = "bg-slate-900 text-white shadow-sm";
  const inactiveStyle = "text-slate-400 hover:bg-slate-100";

  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
        <div
          onClick={() => onViewChange("generator")}
          className={cn(baseStyle, currentView === "generator" ? activeStyle : inactiveStyle)}
        >
          <KeyRound size={20} />
        </div>

        <div
          onClick={() => onViewChange("storage")}
          className={cn(baseStyle, currentView === "storage" ? activeStyle : inactiveStyle)}
        >
          <Database size={20} />
        </div>
      </div>
    </div>
  );
};
