export const gameRoutes = [
  {
    path: "/game",
    children: [
      {
        path: "regular/*",
        lazy: async () => {
          const { default: RegularGamePage } = await import("@/pages/game/regular/RegularGamePage");
          return { Component: RegularGamePage };
        },
      },
      {
        path: "regular/boxscore/:gameDate/:gameKey",
        lazy: async () => {
          const { default: RegularGamePage } = await import("@/pages/game/regular/RegularGamePage");
          return { Component: RegularGamePage };
        },
      },
    ],
  },
];
