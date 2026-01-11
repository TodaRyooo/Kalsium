import { Trash2 } from "lucide-react";

import { deleteReq } from "@/lib/fetcher";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { AlertDialog } from "@/components/composites/alert-dialog";

export const DeleteBondDialog = ({ bond }: { bond: Bond }) => {
  const { trigger } = useSWRMutation(`/bonds/${bond.id}`, deleteReq, { onSuccess: () => mutate("/bonds") });
  const handleDelete = async () => {
    try {
      await trigger();
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
              <code className="rounded bg-slate-200/50 px-1 font-mono break-all">{bond.pass}</code>
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
      onConfirm={handleDelete}
      trigger={
        <button className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500">
          <Trash2 size={16} />
        </button>
      }
    />
  );
};
