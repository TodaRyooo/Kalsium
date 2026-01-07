import { Label as BaseLabel } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Label = ({ className, ...props }: React.ComponentProps<typeof BaseLabel>) => (
  <BaseLabel
    className={cn(
      "text-sm leading-none font-medium text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);
