import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { MainImageSlider, MatchInfo, WizGallery, WizVideo } from "@/features/home";
import { SectionWrapper } from "@/features/home/components/SectionWrapper";
import { ErrorBoundary } from "react-error-boundary";

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* 슬라이더 영역 */}
      <MainImageSlider />

      {/* 경기 일정, 비디오, 갤러리 */}
      <div className="w-full flex flex-col items-center gap-4 py-4">
        <SectionWrapper title="이 달의 경기">
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <MatchInfo />
          </ErrorBoundary>
        </SectionWrapper>
        <SectionWrapper title="Wiz Video">
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <WizVideo />
          </ErrorBoundary>
        </SectionWrapper>
        <SectionWrapper title="Wiz Gallery" description="좌우 스크롤을 통해 사진을 볼 수 있습니다.">
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <WizGallery />
          </ErrorBoundary>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default HomePage;
