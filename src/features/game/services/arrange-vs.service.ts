export interface TeamVSResult {
  win: number;
  lose: number;
  drawn: number;
}
export interface ArrangedTeamVS {
  teamName: string;
  teamCode: string;
  [vsTeamCode: string]: TeamVSResult | string | undefined;
}

// 팀(key)이 상대팀(vsTeam)을 상대로 어떤 성적을 얻었는지 객체화 하는 함수
export const arrangeVS = (data: ArrangedTeamVS[]) => {
  const graph: { [key: string]: { [key: string]: TeamVSResult } } = {};

  data.forEach((team: ArrangedTeamVS) => {
    const node = team.teamCode;
    graph[node] = {};

    Object.keys(team).forEach((key) => {
      if (["teamCode", "teamName"].includes(key)) return;
      graph[node][key] = team[key] as TeamVSResult;
    });
  });

  return graph;
};
