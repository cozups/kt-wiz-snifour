import { PAGE_URLS } from "@/constants/urls";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import { ReactNode } from "react";
import { IconRight } from "react-day-picker";
import { useLocation } from "react-router";

type UrlStructure = {
  name: string;
  sub?: { [key: string]: UrlStructure };
};
interface BreadcrumbProps {
  leftComponent?: ReactNode;
}

const getLabels = (paths: string[]) => {
  if (!paths.length) return []; // 경로가 비어 있는 경우 빈 배열 반환

  const result: { key: string; label: string; isActive: boolean }[] = [];

  const findSubPageLabel = (
    path: string,
    structure:
      | {
          [key: string]: UrlStructure;
        }
      | undefined
  ): string | null => {
    // 하위 구조(sub)가 존재하는 경우 재귀적으로 탐색
    for (const key in structure) {
      // 현재 경로가 pathToFind와 일치하면 name 반환
      if (key === path) {
        return structure[key].name;
      }
      const found = findSubPageLabel(path, structure[key].sub);
      if (found) return found;
    }
    // 일치하는 경로가 없으면 null 반환
    return null;
  };

  let parent = "";
  paths.forEach((path, index) => {
    if (["catcher", "infielder", "outfielder"].includes(path)) {
      result.push({ key: "batter", label: "타자", isActive: false });
    }
    if (path in PAGE_URLS) {
      // 루트 페이지 breadcrumb
      parent = path;
      result.push({ key: path, label: PAGE_URLS[path].name, isActive: index === paths.length - 1 });
    } else {
      // 서브 페이지 breadcrumb
      const label = findSubPageLabel(path, PAGE_URLS[parent].sub);
      if (label) {
        result.push({ key: path, label, isActive: index === paths.length - 1 });
      }
    }
  });

  return result;
};

const Breadcrumb = ({ leftComponent = null }: BreadcrumbProps) => {
  // url 파싱
  const { pathname } = useLocation();
  let paths: string[] = pathname.split("?")[0].split("/").slice(1);

  // url 매핑
  const mappedPaths = [{ key: "home", label: "Home", isActive: false }, ...getLabels(paths)];

  // url label이 null인 것 필터링
  const filteredPaths = mappedPaths.filter((path) => path.label);
  filteredPaths[filteredPaths.length - 1].isActive = true;

  return (
    <div
      className={cn(
        "w-full mt-6 mb-4 pb-2 border-b-2 border-wiz-red flex flex-col md:flex-row md:items-end",
        leftComponent ? "md:justify-between" : "justify-end"
      )}
    >
      {/* md 이상에서 브래드크럼 좌측에 표시되는 leftComponent */}
      {leftComponent && <div className="hidden md:flex items-center gap-2">{leftComponent}</div>}

      {/* Breadcrumb */}
      <span className="flex items-center font-light text-wiz-white whitespace-wraps">
        <HomeIcon className={cn("mr-1 h-3", "lg:mr-2 lg:h-4")} />
        {filteredPaths.map((path, index) => (
          <span
            key={path.key}
            className={cn("flex items-center text-xs", "md:text-sm", path.isActive && "text-wiz-red")}
          >
            {path.label}
            {index < filteredPaths.length - 1 && <IconRight className={cn("h-2 mx-1", "lg:h-3 lg:mx-2")} />}
          </span>
        ))}
      </span>

      {/* sm 이하에서 브래드크럼 아래에 표시되는 leftComponent */}
      {leftComponent && <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4 md:hidden">{leftComponent}</div>}
    </div>
  );
};
export { Breadcrumb };
