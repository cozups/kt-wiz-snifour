export const playerRoutes = [
  {
    path: "/player/:position",
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: PlayerListPage } = await import("@/pages/player/PlayerListPage");
          return { Component: PlayerListPage };
        },
      },
      {
        path: "detail",
        lazy: async () => {
          const { default: TeamMemberDetailPage } = await import("@/pages/player/detail/TeamMemberDetailPage");
          return { Component: TeamMemberDetailPage };
        },
      },
    ],
  },
];
