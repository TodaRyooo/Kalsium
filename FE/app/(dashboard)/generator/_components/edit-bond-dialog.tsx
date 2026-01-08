import { useState } from "react";
import { AlertDialog } from "@/components/composites/alert-dialog";
import { Pencil } from "lucide-react";

import useSWRMutation from "swr/mutation";
import { putReq } from "@/lib/fetcher";
import { mutate } from "swr";

interface Bond {
  id: string;
  identity: string;
  pass: string;
  note: string;
}

export const EditBondDialog = ({ bond }: { bond: Bond }) => {
  const [identity, setIdentity] = useState(bond.identity);
  const [note, setNote] = useState(bond.note);

  const { trigger, isMutating } = useSWRMutation(`/bonds/${bond.id}`, putReq, { onSuccess: () => mutate("/bonds") });

  const handleUpdate = async () => {
    try {
      await trigger({ identity, note });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AlertDialog
      title="Edit Bond"
      description={
        <div className="space-y-4 pt-4">
          <div className="grid gap-2 text-left">
            <label className="text-xs font-bold text-slate-500">IDENTITY</label>
            <input
              className="w-full rounded border p-2 text-sm"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
            />
          </div>
          <div className="grid gap-2 text-left">
            <label className="text-xs font-bold text-slate-500">NOTE</label>
            <textarea
              className="w-full rounded border p-2 text-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      }
      actionLabel={isMutating ? "Saving..." : "Save Changes"}
      onConfirm={() => handleUpdate()}
      trigger={
        <button className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
          <Pencil size={16} />
        </button>
      }
    />
  );
};
