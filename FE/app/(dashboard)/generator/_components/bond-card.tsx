import { Trash2 } from "lucide-react";

import { deleteReq } from "@/lib/fetcher";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { toast } from "sonner";
import { Text } from "@/components/composites/text";
import { Card, CardContent } from "@/components/composites/card";
import { AlertDialog } from "@/components/composites/alert-dialog";
import { EditBondDialog } from "@/app/(dashboard)/generator/_components/edit-bond-dialog";

export const BondCard = ({ bond }: { bond: Bond }) => {
  const { trigger } = useSWRMutation(`/bonds/${bond.id}`, deleteReq, { onSuccess: () => mutate("/bonds") });

  const handleCopyToClip = async () => {
    try {
      await navigator.clipboard.writeText(bond.pass);
      toast.success("Copied", { position: "top-center", duration: 2000 });
    } catch (e) {
      toast.error("Faild to copy.", { position: "top-center", duration: 2000 });
    }
  };

  const handleDelete = async () => {
    try {
      await trigger();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      key={bond.id}
      className="group relative w-full max-w-none overflow-hidden transition-all hover:border-slate-300"
    >
      <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
        <EditBondDialog bond={bond} />
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
          onConfirm={handleDelete}
          trigger={
            <button className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          }
        />
      </div>

      <CardContent className="p-4" onClick={handleCopyToClip}>
        <div className="flex flex-col gap-2">
          <Text className="pr-8 font-medium text-slate-900">{bond.identity}</Text>

          <div className="rounded border border-slate-100 bg-slate-50 p-2">
            <code className="block font-mono text-sm break-all text-slate-700">{bond.pass}</code>
          </div>

          {bond.note && (
            <Text variant="muted" className="text-xs">
              {bond.note}
            </Text>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
