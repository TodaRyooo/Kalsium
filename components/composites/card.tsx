import * as CardBase from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Card = ({
  className,
  ...props
}: React.ComponentProps<typeof CardBase.Card>) => (
  <CardBase.Card
    className={cn("w-full max-w-sm border-none shadow-lg", className)}
    {...props}
  />
);

export const CardHeader = CardBase.CardHeader;
export const CardContent = CardBase.CardContent;
export const CardTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof CardBase.CardTitle>) => (
  <CardBase.CardTitle
    className={cn(
      "text-2xl font-bold tracking-tight text-slate-700",
      className,
    )}
    {...props}
  />
);
