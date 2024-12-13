import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-xl border px-2.5 py-0.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        user: "border-transparent bg-[#39CD6219] text-[#39CD62] hover:bg-[#39CD6225]",
        manager:
          "border-transparent bg-[#5718FF19] text-[#5718FF] hover:bg-[#5718FF25]",
        admin:
          "border-transparent bg-[#E4033B19] text-[#E4033B] hover:bg-[#E4033B25]",
      },
    },
    defaultVariants: {
      variant: "user",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
