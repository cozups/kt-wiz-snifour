import { cn } from "@/lib/utils";

export function SectionWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <h3 className={cn("text-white font-bold text-base my-2", "md:text-xl md:my-3", "lg:text-2xl lg:my-4")}>
        {title}
      </h3>
      {description && <p className="text-neutral-400 mb-1 text-sm md:text-base">{description}</p>}
      {children}
    </div>
  );
}
