import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import {
  recentBatterRecordColumns,
  recentPitcherRecordColumns,
  yearBatterRecordColumns,
  yearPitcherRecordColumns,
} from "@/constants/columns/record-columns";
import { DataTable } from "@/features/common/components/table/DataTable";
import { RecentRecord, YearRecord } from "@/features/player/types/detail";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";

interface RecordTableAccordionProps {
  data: RecentRecord[] | YearRecord[];
}

function RecordTableAccordion({ data }: RecordTableAccordionProps) {
  const { position } = useParams();
  const isRecentRecord = (data: RecentRecord[] | YearRecord[]): data is RecentRecord[] => {
    return !!(data?.[0] as RecentRecord)?.displayDate; // displayDate가 있으면 RecentRecord
  };

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="record-table">
        <AccordionTrigger className={cn("text-neutral-400 hover:text-white text-sm", "lg:text-base")}>
          기록표 보기
        </AccordionTrigger>
        <AccordionContent>
          {isRecentRecord(data) ? (
            <DataTable
              data={data}
              columns={position === "pitcher" ? recentPitcherRecordColumns : recentBatterRecordColumns}
            />
          ) : (
            <DataTable
              data={data}
              columns={position === "pitcher" ? yearPitcherRecordColumns : yearBatterRecordColumns}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export { RecordTableAccordion };
