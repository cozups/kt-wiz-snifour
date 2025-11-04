import { createListViewItem } from "@/features/media/services";
import { ListDataType, ListViewType, NewsDetailResponse, NewsResponse } from "@/features/media/types";
import { Parameter, UseQueryParams, isNotNullish } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { newsApi } from "./NewsApi";

import data from "@/assets/data/mockNews.json";

// 쿼리 키 정의
export const NEWS_API_QUERY_KEY = {
  /** 뉴스 목록 조회 쿼리 키 생성 */
  GET_LIST: (params?: Parameter<typeof newsApi.getNewsList>) => ["news-list", params].filter(isNotNullish),

  /** 특정 뉴스 상세 정보 조회 쿼리 키 생성 */
  GET_BY_SEQ: (artcSeq: Parameter<typeof newsApi.getNewsBySeq>) => ["news-by-seq", artcSeq].filter(isNotNullish),
};

/**
 * [GET] /api/article/newslistpage?searchWord=NC&itemCount=5&pageNum=2
 * @param params 뉴스 목록 조회에 필요한 파라미터
 * @returns 리스트 타입으로 변환된 뉴스 목록 데이터와 총 데이터 개수
 */
export function useGetNewsList(
  params?: UseQueryParams<
    typeof newsApi.getNewsList,
    AxiosError,
    NewsResponse, // 실제 응답
    ListDataType // 변환된 응답
  >
) {
  return useQuery({
    queryKey: NEWS_API_QUERY_KEY.GET_LIST(params?.variables),
    queryFn: async () => {
      // const response = await newsApi.getNewsList(params?.variables);
      // return response;
      return Promise.resolve({ data: { list: data, searchCount: 1 } });
    },
    select: (res: NewsResponse): ListDataType => ({
      list: res.data.list.filter((item) => item.useYn === "Y").map(createListViewItem),
      searchCount: res.data.searchCount,
    }),
    placeholderData: keepPreviousData, // 페이지 네이션이 있을 경우에는 추가해주세요. 이전 데이터를 유지해줍니다.
    ...params?.options,
  });
}

/**
 * [GET] /api/article/wizpressdetail?artcSeq=189033
 * @param params 뉴스 상세 조회에 필요한 파라미터
 * @returns 리스트 타입으로 변환된 뉴스 상세 데이터
 */
export function useGetNewsBySeq(
  params: UseQueryParams<
    typeof newsApi.getNewsBySeq,
    AxiosError,
    NewsDetailResponse, // 실제 응답
    ListViewType // 변환된 응답
  >
) {
  const queryKey = NEWS_API_QUERY_KEY.GET_BY_SEQ(params.variables);
  return useQuery({
    queryKey,
    queryFn: async () => {
      // const response = await newsApi.getNewsBySeq(params.variables);
      // return response;
      return Promise.resolve({ data: { article: data[0] } });
    },
    select: (res: NewsDetailResponse) => createListViewItem(res.data.article),
    ...params.options,
  });
}
