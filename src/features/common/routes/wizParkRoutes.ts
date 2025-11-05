export const wizParkRoutes = [
  {
    path: "/wizpark",
    children: [
      {
        path: "intro",
        lazy: async () => {
          const { default: ParkIntroPage } = await import("@/pages/wizPark/ParkIntroPage");
          return { Component: ParkIntroPage };
        },
      },
      {
        path: "location",
        lazy: async () => {
          const { default: ParkLocationPage } = await import("@/pages/wizPark/ParkLocationPage");
          return { Component: ParkLocationPage };
        },
      },
      {
        path: "parking",
        lazy: async () => {
          const { default: ParkingPage } = await import("@/pages/wizPark/ParkingPage");
          return { Component: ParkingPage };
        },
      },
      {
        path: "iksan",
        lazy: async () => {
          const { default: IksanStadiumPage } = await import("@/pages/wizPark/IksanStadiumPage");
          return { Component: IksanStadiumPage };
        },
      },
    ],
  },
];
