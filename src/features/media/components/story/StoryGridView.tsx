import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

import { GridArticle, NotFoundSearchResult, PlayButton } from "@/features/media";
import { GridArticleSkeleton, LoadingView } from "@/features/media/common/skeleton";
import useStoryListQuery from "@/features/media/hooks/story/useStoryListQuery";
import InfiniteScroll from "react-infinite-scroller";

const StoryGridView = () => {
  const navigate = useNavigate();
  const { storyList, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } = useStoryListQuery();

  if (!isLoading && isSuccess && !storyList?.pages?.[0]?.length) {
    return <NotFoundSearchResult />;
  }
  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={handleLoadMore}>
      <div className={cn("media-grid")}>
        <LoadingView isLoading={isLoading} isError={isError} fallback={<GridArticleSkeleton />}>
          {storyList?.pages?.map((page) =>
            page.map(({ artcSeq, imgFilePath, title, contentsDate }) => (
              <GridArticle
                key={artcSeq}
                className="cursor-pointer"
                onClick={() => navigate(`/media/wizstory/${artcSeq}`)}
              >
                <GridArticle.Media>
                  <GridArticle.Thumbnail imgFilePath={imgFilePath} title={title} />
                  <GridArticle.Overlay elements={<PlayButton />} />
                </GridArticle.Media>
                <GridArticle.Title title={title} />
                <GridArticle.Footer date={contentsDate} />
              </GridArticle>
            ))
          )}
        </LoadingView>
      </div>
    </InfiniteScroll>
  );
};

export { StoryGridView };
