import { GridArticle, NotFoundSearchResult, PlayButton } from "@/features/media";
import useHighlightListQuery from "@/features/media/hooks/highlight/useHighlightListQuery";
import { cn } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router";
import { GridArticleSkeleton, LoadingView } from "@/features/media/common/skeleton";

const HighlightGridView = () => {
  const navigate = useNavigate();
  const { highlightList, isLoading, isError, isSuccess, fetchNextPage, hasNextPage } = useHighlightListQuery();

  if (!isLoading && isSuccess && !highlightList?.pages?.[0]?.length) {
    return <NotFoundSearchResult />;
  }

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={handleLoadMore}>
      <div className={cn("media-grid")}>
        <LoadingView isLoading={isLoading} isError={isError} fallback={<GridArticleSkeleton />}>
          {highlightList?.pages?.map((page) =>
            page.map(({ artcSeq, imgFilePath, title, contentsDate, viewCount }) => (
              <GridArticle
                key={artcSeq}
                onClick={() => {
                  navigate(`/media/highlight/${artcSeq}`);
                }}
                className="cursor-pointer"
              >
                <GridArticle.Media>
                  <GridArticle.Thumbnail imgFilePath={imgFilePath} title={title} />
                  <GridArticle.Overlay elements={<PlayButton />} />
                </GridArticle.Media>
                <GridArticle.Title title={title} />
                <GridArticle.Footer date={contentsDate} viewCount={viewCount} />
              </GridArticle>
            ))
          )}
        </LoadingView>
      </div>
    </InfiniteScroll>
  );
};

export { HighlightGridView };
