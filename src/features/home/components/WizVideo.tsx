import { Link, useNavigate } from "react-router";

import { useGetMainWizVideo } from "@/features/home/apis/mainApi.query";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { WizVideoAnimation } from "./WizVideoAnimation";

function WizVideo() {
  const navigate = useNavigate();
  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useGetMainWizVideo({
    variables: { count: 5 },
  });

  if (isError) {
    throw new Error(error?.toString());
  }

  if (isLoading) {
    return (
      <div>
        <div className="w-full h-fit bg-gray-200 rounded-3xl overflow-hidden">
          <Skeleton className="w-full aspect-video" baseColor="#d1d5db" />
        </div>
        <div className={cn("w-full grid grid-cols-2 gap-4 py-4", "lg:grid-cols-4")}>
          {Array.from({ length: 4 }).map(() => (
            <Skeleton className="h-52 md:h-64 lg:h-72 rounded-xl" baseColor="#d1d5db" />
          ))}
        </div>
      </div>
    );
  }

  if (!videos || !videos.length) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div>
        <div className="w-full h-fit bg-gray-200 rounded-3xl overflow-hidden">
          <iframe
            title={videos[0].artcTitle}
            src={`https://www.ktwiz.co.kr/${videos[0].videoLink}`}
            className="w-full aspect-video"
          />
        </div>
        <div className={cn("w-full grid grid-cols-2 gap-4 py-4", "lg:grid-cols-4")}>
          {videos.slice(1).map((vid, index) => (
            <WizVideoAnimation key={vid.artcSeq} vid={vid} index={index} navigate={navigate} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        <Link
          to="/media/highlight"
          className={cn(
            "rounded bg-white bg-opacity-10 text-white text-xs px-2 py-1 hover:bg-opacity-100 hover:text-black transition-colors duration-300",
            "lg:text-base lg:px-4 lg:py-2"
          )}
        >
          더 많은 영상보기
        </Link>
      </div>
    </>
  );
}

export { WizVideo };
