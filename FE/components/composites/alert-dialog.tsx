"use client";

import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface AlertDialogProps {
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  actionLabel?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export const AlertDialog = ({
  trigger,
  title,
  description,
  actionLabel = "Confirm",
  onConfirm,
  variant = "default",
}: AlertDialogProps) => {
  return (
    <BaseAlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription asChild>
              <div>{description}</div>
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
};
