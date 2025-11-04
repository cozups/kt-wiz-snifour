import { Breadcrumb } from "@/features/common";
import { ErrorFallback } from "@/features/common/components/ErrorFallback";

import { PlayerDashboard } from "@/features/player/components/detail/PlayerDashboard";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "react-error-boundary";

function PlayerDetailPage() {
  return (
    <div className={cn("w-full text-white", "md:my-10", "lg:my-20")}>
      <Breadcrumb />

      <ErrorBoundary fallbackRender={ErrorFallback}>
        <PlayerDashboard />
      </ErrorBoundary>
    </div>
  );
}

export default PlayerDetailPage;
