import { Config } from "@/features/player";
import { useState } from "react";

export function useChartConfig(initialConfig: Config) {
  const [chartConfig, setChartConfig] = useState<Config>(initialConfig);
  const [activeKey, setActiveKey] = useState<keyof Config>(Object.keys(initialConfig)[0]);

  const toggleConfig = (dataKey: keyof Config) => {
    if (activeKey === dataKey) {
      return;
    }

    setActiveKey(dataKey);
    setChartConfig((prev) => {
      // 모든 항목을 비활성화한 뒤 클릭한 버튼만 활성화
      const newConfig = Object.keys(prev).reduce((acc, key) => {
        acc[key] = { ...prev[key], isActive: false }; // 모든 항목 비활성화
        return acc;
      }, {} as Config);

      // 클릭한 버튼만 활성화
      newConfig[dataKey] = {
        ...prev[dataKey],
        isActive: !prev[dataKey].isActive,
      };
      return newConfig;
    });
  };

  return { chartConfig, setChartConfig, activeKey, setActiveKey, toggleConfig };
}
