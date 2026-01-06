import { cn } from "@/lib/utils";

type TextVariant = "h1" | "h2" | "p" | "muted" | "small";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6 font-mono", // デフォルトでJetBrains Mono
  muted: "text-sm text-muted-foreground font-mono",
  small: "text-sm font-medium leading-none",
};

export const Text = ({ variant = "p", as, className, ...props }: TextProps) => {
  const tagMap: Record<TextVariant, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    p: "p",
    muted: "p",
    small: "span",
  };

  const Component = as || tagMap[variant];

  return <Component className={cn(variantStyles[variant], className)} {...props} />;
};
