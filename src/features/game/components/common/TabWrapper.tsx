import { Breadcrumb } from "@/features/common";

export function TabWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center mt-8 mb-20">
      <div className="w-full flex flex-col justify-center items-center">
        {/* 경로 */}
        <Breadcrumb />
        {children}
      </div>
    </div>
  );
}
