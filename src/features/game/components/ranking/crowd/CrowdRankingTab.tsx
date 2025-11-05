import { seasons } from "@/constants/seasons";
import { Breadcrumb, SubTitle } from "@/features/common";
import { useSearchParams } from "react-router";
import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { CrowdRankingView } from "./CrowdRankingView";
import { ErrorBoundary } from "react-error-boundary";
import { CustomSelect } from "@/features/common/components/CustomSelect";

function CrowdRankingTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const season = searchParams.get("gyear") || seasons[0];

  return (
    <div>
      <Breadcrumb
        leftComponent={
          <CustomSelect
            type="year"
            data={seasons.filter((year) => Number(year) > 2018)}
            value={season}
            onChange={(value) =>
              setSearchParams({
                gyear: value,
              })
            }
          />
        }
      />

      <SubTitle title={`${season} 시즌 누적 관중`} className="my-6" />

      <ErrorBoundary fallbackRender={ErrorFallback}>
        <CrowdRankingView />
      </ErrorBoundary>
    </div>
  );
}

export { CrowdRankingTab };
