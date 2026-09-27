import * as React from "react";

import { cn } from "@/lib/utils";

// Cult UI Minimal Card, adapted for the library directory:
// https://github.com/nolly-studio/cult-ui/blob/main/apps/www/registry/default/ui/minimal-card.tsx
const MinimalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-neutral-50 p-1.5 text-neutral-900 no-underline transition-colors hover:bg-neutral-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-800/80",
      "border border-black/5 dark:border-white/10",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
MinimalCard.displayName = "MinimalCard";

const MinimalCardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    alt: string;
    fallback?: React.ReactNode;
    loading?: "eager" | "lazy";
  }
>(({ className, alt, src, fallback, loading = "lazy", ...props }, ref) => {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative mb-6 h-[144px] w-full rounded-xl",
        className
      )}
      {...props}
    >
      {failed ? (
        fallback
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={200}
          height={200}
          loading={loading}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
        />
      )}
    </div>
  );
});
MinimalCardImage.displayName = "MinimalCardImage";

const MinimalCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("mt-2 px-1 text-lg leading-tight font-semibold", className)}
    {...props}
  />
));
MinimalCardTitle.displayName = "MinimalCardTitle";

const MinimalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("px-1 pb-2 text-sm text-neutral-500", className)}
    {...props}
  />
));
MinimalCardDescription.displayName = "MinimalCardDescription";

export {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
};

export default MinimalCard;
