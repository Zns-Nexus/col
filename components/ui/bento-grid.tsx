import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  status?: string;
}

// Magic UI Bento Grid: https://magicui.design/docs/components/bento-grid
function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div className={cn("grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)} {...props}>
      {children}
    </div>
  );
}

function BentoCard({ name, className, background, Icon, description, href, cta, status, ...props }: BentoCardProps) {
  const newTab = href?.startsWith("https://") || href?.startsWith("/libraries/");

  return (
    <div
      className={cn("magic-bento-card group relative col-span-1 flex min-w-0 flex-col overflow-hidden rounded-xl", className)}
      {...props}
    >
      <div aria-hidden="true" className="min-w-0 p-4 pb-6">{background}</div>
      <div className="relative z-10 mt-auto p-4 pt-0">
        <div className="flex flex-col gap-1">
          <Icon className="bento-card-icon h-9 w-9" />
          <h3 className="bento-card-title text-xl font-semibold">{name}</h3>
          <p className="bento-card-description max-w-lg">{description}</p>
          {status && <span className="bento-card-cta mt-2 text-sm font-medium">{status}</span>}
        </div>
        {href && cta && <div className="mt-3 flex items-center">
          <Button variant="link" asChild size="sm" className="bento-card-cta h-auto p-0">
            <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>{cta}<ArrowRightIcon className="ms-2 size-4" aria-hidden /></a>
          </Button>
        </div>}
      </div>
      <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-cyan-300/5" />
    </div>
  );
}

export { BentoCard, BentoGrid };
