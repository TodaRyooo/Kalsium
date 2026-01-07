import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Button = ({ className, ...props }: React.ComponentProps<typeof BaseButton>) => {
  return (
    <BaseButton
      className={cn(
        // Kalsium標準のスタイルをここに集約
        "w-full py-6 font-semibold transition-all duration-200",
        "bg-slate-800 text-white hover:bg-slate-700", // ここをパステル調に変えれば一括反映される
        className,
      )}
      {...props}
    />
  );
};
