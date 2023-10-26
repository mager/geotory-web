import { cn } from "@/lib/utils";

export default function Text({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("mb-4 font-sansSerif", className)}>{children}</p>;
}
