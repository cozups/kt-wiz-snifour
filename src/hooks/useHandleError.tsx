import { useCallback } from "react";

import { FieldErrors } from "react-hook-form";

const DEFAULT_ERROR_MESSAGE = "서버 오류가 발생했습니다.";

const useHandleError = () => {
  const handleFormError = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (err: FieldErrors<any>) => {
      const targetError = Object.values(err);
      if (!targetError.length) {
        return;
      }

      // MEMO: 에러 처리 방식 각 환경 및 라이브러리에 맞게 수정.
      const message = (targetError[0]?.message as string) ?? DEFAULT_ERROR_MESSAGE;

      console.log({ message });
    },
    []
  );

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleApiError = (error: any, data?: any) => {
    // 커스텀 메시지가 있는 경우
    if (data?.message) {
      console.log({ message: data.message });
      return;
    }

    // 서버 에러 응답을 처리
    const serverError = Object.values(error?.response?.data)[0] as string | Array<string>;
    const detail = typeof serverError === "string" ? serverError : (serverError as Array<string>).at(0);
    const notDefinedServerError = detail === "<" || !detail;

    const message = notDefinedServerError ? DEFAULT_ERROR_MESSAGE : detail;
    console.log({ message });

    /** 에러인 경우 모달 표시 예시
      if (error?.response?.status?.toString()) {
        b({
          message,
          // 모달에서 확인/취소 등의 액션에 따른 라우팅 처리
        });
        return;
      }
    */
  };

  return { handleFormError, handleApiError };
};

export default useHandleError;
