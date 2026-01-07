import * as SelectBase from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Select = SelectBase.Select;
export const SelectGroup = SelectBase.SelectGroup;
export const SelectValue = SelectBase.SelectValue;

export const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectBase.SelectTrigger>) => (
  <SelectBase.SelectTrigger className={cn("w-full font-mono", className)} {...props}>
    {children}
  </SelectBase.SelectTrigger>
);

export const SelectContent = SelectBase.SelectContent;

export const SelectItem = ({ className, children, ...props }: React.ComponentProps<typeof SelectBase.SelectItem>) => (
  <SelectBase.SelectItem className={cn("font-mono", className)} {...props}>
    {children}
  </SelectBase.SelectItem>
);
