import { Switch as BaseSwitch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Switch = ({ className, ...props }: React.ComponentProps<typeof BaseSwitch>) => (
  <BaseSwitch className={cn("data-[state=checked]:bg-slate-800", className)} {...props} />
);
