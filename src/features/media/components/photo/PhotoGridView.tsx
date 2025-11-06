import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

import { GridArticle, NotFoundSearchResult } from "@/features/media";
import { LoadingView, GridArticleSkeleton } from "@/features/media/common/skeleton";
import usePhotoListQuery from "@/features/media/hooks/photo/usePhotoListQuery";
import InfiniteScroll from "react-infinite-scroller";

const PhotoGridView = () => {
  // API 연동
  const { photoList, isLoading, isSuccess, isError, hasNextPage, fetchNextPage } = usePhotoListQuery();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedPhoto = photoList?.pages.flatMap((page) => page).find((item) => item.artcSeq === selectedId);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={handleLoadMore}>
      {/* 포토 컨텐츠 */}
      {!isLoading && isSuccess && !photoList?.pages?.[0]?.length ? (
        <NotFoundSearchResult />
      ) : (
        <div className={cn("media-grid")}>
          <LoadingView isLoading={isLoading} isError={isError} fallback={<GridArticleSkeleton />}>
            {photoList?.pages?.map((page) =>
              page.map((item) => (
                <GridArticle
                  key={item.artcSeq}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedId(item.artcSeq);
                  }}
                >
                  <GridArticle.Media>
                    <GridArticle.Thumbnail imgFilePath={item.imgFilePath} title={item.title} />
                  </GridArticle.Media>
                  <GridArticle.Title title={item.title} />
                  <GridArticle.SubTitle title={item.subTitle} />
                  <GridArticle.Footer date={item.contentsDate} />
                </GridArticle>
              ))
            )}
          </LoadingView>
        </div>
      )}

      {/* 팝업 */}
      <Dialog open={selectedId !== null} onOpenChange={() => setSelectedId(null)}>
        <DialogContent className="w-screen h-screen max-w-none p-0 bg-black/95">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-8 w-8 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {selectedPhoto && (
            <div className="h-full flex items-center justify-center relative">
              <div className="relative max-w-5xl w-full mx-8">
                <GridArticle.Media className="mb-0">
                  <GridArticle.Thumbnail
                    imgFilePath={selectedPhoto.imgFilePath}
                    title={selectedPhoto.title}
                    className="!object-contain"
                  />
                </GridArticle.Media>

                <div className="bg-gradient-to-t from-black/90 to-transparent">
                  <DialogHeader className="gap-2">
                    <DialogTitle className="text-2xl font-bold text-white">
                      <p>{selectedPhoto.title}</p>
                      <p className="text-xl text-gray-400">{selectedPhoto.subTitle}</p>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-4 text-[#6b7280]">
                      {selectedPhoto.contentsDate}
                    </DialogDescription>
                  </DialogHeader>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </InfiniteScroll>
  );
};

export { PhotoGridView };
