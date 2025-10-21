import { Button } from "@/components/ui";

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="w-full h-96 bg-wiz-white bg-opacity-10 text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">에러가 발생하였습니다!</h2>
      <div className="text-center">
        <p className="mb-4">{error.message}</p>
        <Button onClick={resetErrorBoundary} className="bg-wiz-white text-black hover:bg-wiz-white">
          다시 시도
        </Button>
      </div>
    </div>
  );
}
