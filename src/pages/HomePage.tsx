import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { MainImageSlider, MatchInfo, WizGallery, WizVideo } from "@/features/home";
import { SectionWrapper } from "@/features/home/components/SectionWrapper";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

function HomePage() {
  useEffect(() => {
    toast.info(
      <div>
        <b>현재 KT 서버와 연결이 끊겨 오류가 발생하고 있습니다.</b>
        <p>임시 데이터로 대체 중이니 양해 부탁드립니다.</p>
      </div>
    );
  }, []);

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
