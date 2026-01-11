import { cn } from "@/lib/utils";

type TextVariant = "h1" | "h2" | "p" | "muted" | "small" | "a";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "scroll-m-20 text-4xl tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6", // デフォルトでJetBrains Mono
  muted: "text-sm text-muted-foreground",
  small: "text-sm font-medium leading-none",
  a: "text-xs font-medium leading-none underline cursor-pointer",
};

export const Text = ({ variant = "p", as, className, ...props }: TextProps) => {
  const tagMap: Record<TextVariant, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    p: "p",
    muted: "p",
    small: "span",
    a: "a",
  };

  const Component = as || tagMap[variant];

  return <Component className={cn(variantStyles[variant], className)} {...props} />;
};
