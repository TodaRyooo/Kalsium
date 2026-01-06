import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Input = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseInput>) => {
  return (
    <BaseInput
      className={cn(
        "focus-visible:ring-primary/30 w-full font-mono transition-all",
        className,
      )}
      {...props}
    />
  );
};
