import { ListArticle } from "@/features/media";
import { ListViewType } from "@/features/media/types";
import { useLocation } from "react-router";

type NewsListProps = {
  news: ListViewType[];
};

const NewsList = ({ news }: NewsListProps) => {
  const location = useLocation();

  return (
    <>
      {/* 뉴스 컨텐츠 */}
      {news.map(({ artcSeq, imgFilePath, title, content, createdAt, viewCount }) => (
        <ListArticle key={artcSeq} link={`${location?.pathname}/${artcSeq}`}>
          {imgFilePath && <ListArticle.Thumbnail imgFilePath={imgFilePath} title={title} />}
          <ListArticle.Content>
            <ListArticle.Title title={title} />
            <ListArticle.Description content={content} />
            <ListArticle.Footer createdAt={createdAt} viewCount={viewCount} className="mt-4" />
          </ListArticle.Content>
        </ListArticle>
      ))}
    </>
  );
};

export { NewsList };
