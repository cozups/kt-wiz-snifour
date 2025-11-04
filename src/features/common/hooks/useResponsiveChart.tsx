import { useEffect, useState } from "react";

const RESPONSIVE_CONFIG = {
  mobile: {
    fontSize: "10px",
    maxBarSize: 18,
  },
  desktop: {
    fontSize: "16px",
    maxBarSize: 40,
  },
};

export function useResponsiveChart() {
  const [config, setConfig] = useState(RESPONSIVE_CONFIG.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 모바일 화면 크기 기준
        setConfig(RESPONSIVE_CONFIG.mobile);
      } else {
        setConfig(RESPONSIVE_CONFIG.desktop);
      }
    };

    // 초기 화면 크기 설정
    handleResize();
    // 화면 크기 변경 감지
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { config, setConfig };
}
