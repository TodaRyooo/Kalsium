import { toast } from "sonner";
import { Text } from "@/components/composites/text";
import { Card, CardContent } from "@/components/composites/card";
import { EditBondDialog } from "@/app/(dashboard)/generator/_components/edit-bond-dialog";
import { DeleteBondDialog } from "./delete-bond-dialog";

export const BondCard = ({ bond }: { bond: Bond }) => {
  const handleCopyToClip = async () => {
    try {
      await navigator.clipboard.writeText(bond.pass);
      toast.success("Copied", { position: "top-center", duration: 2000 });
    } catch (e) {
      toast.error("Faild to copy.", { position: "top-center", duration: 2000 });
    }
  };

  return (
    <Card
      key={bond.id}
      className="group relative w-full max-w-none overflow-hidden transition-all hover:border-slate-300"
    >
      <div className="absolute top-2 right-2 opacity-100 transition-opacity group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
        <EditBondDialog bond={bond} />
        <DeleteBondDialog bond={bond} />
      </div>

      <CardContent onClick={handleCopyToClip}>
        <div className="flex flex-col gap-2">
          <Text className="pr-8 font-medium text-slate-900">{bond.identity}</Text>

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
