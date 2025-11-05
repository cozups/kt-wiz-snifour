import Skeleton from "react-loading-skeleton";

import { SubTitle } from "@/features/common";
import { KeyRecordsCard, MatchBoard, MatchScoreTable } from "@/features/game";
import { useGetBoxscoreQuery } from "./apis/boxscore/boxscoreApi.query";
import { battingRecordColumns } from "@/constants/columns/batting-record-columns";
import { pitchingRecordColumns } from "@/constants/columns/pitching-record-columns";
import React from "react";
import { DataTable } from "../common/components/table/DataTable";

function RecordSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full my-10">
      <div className="flex flex-col gap-2">
        <SubTitle title={title} />
        {children}
      </div>
    </div>
  );
}

const BoxscoreTab = () => {
  const { data: matchData, isLoading, isError, error } = useGetBoxscoreQuery();

  if (isError) {
    throw new Error(error?.message);
  }

  const homeTeam = matchData?.schedule.current.home || "홈 팀";
  const visitTeam = matchData?.schedule.current.visit || "원정 팀";

  return (
    <>
      {/* 경기 스코어 테이블 */}
      {isLoading || !matchData ? (
        <div className="bg-gray-200 animate-pulse rounded-lg w-full">
          <Skeleton height={340} className="w-full mb-10" />
        </div>
      ) : (
        <MatchBoard
          match={matchData.schedule.current}
          prevMatch={matchData.schedule.prev}
          nextMatch={matchData.schedule.next}
        >
          <MatchScoreTable data={matchData.scoreboard} />
        </MatchBoard>
      )}

      {/* 주요 기록 */}
      <div className="flex flex-col gap-2 w-full my-10">
        <SubTitle title="주요 기록" />
        {isLoading || !matchData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 8 }).map(() => (
              <div
                key={Math.random()}
                className="h-[180px] md:h-[200px] lg:h-[220px] bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="w-full items-center mt-4">
            <KeyRecordsCard data={matchData} />
          </div>
        )}
      </div>
      {/* team1 타자 기록 */}
      <RecordSection title={`${homeTeam} 타자 기록`}>
        <DataTable data={matchData?.hbatters || []} columns={battingRecordColumns} />
      </RecordSection>

      {/* team2 타자 기록 */}
      <RecordSection title={`${visitTeam} 타자 기록`}>
        <DataTable data={matchData?.vbatters || []} columns={battingRecordColumns} />
      </RecordSection>

      {/* team1 투수 기록 */}
      <RecordSection title={`${homeTeam} 투수 기록`}>
        <DataTable data={matchData?.hpitchers || []} columns={pitchingRecordColumns} />
      </RecordSection>

      {/* team2 투수 기록 */}
      <RecordSection title={`${visitTeam} 투수 기록`}>
        <DataTable data={matchData?.vpitchers || []} columns={pitchingRecordColumns} />
      </RecordSection>
    </>
  );
};

export { BoxscoreTab };
