export const infoRoutes = [
  {
    path: "/ktwiz",
    children: [
      {
        path: "wallpaper",
        lazy: async () => {
          const { default: WallpaperPage } = await import("@/pages/ktwiz/WallpaperPage");
          return { Component: WallpaperPage };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const { default: KtHistoryPage } = await import("@/pages/ktwiz/KtHistoryPage");
          return { Component: KtHistoryPage };
        },
      },
      {
        path: "history",
        lazy: async () => {
          const { default: KtHistoryPage } = await import("@/pages/ktwiz/KtHistoryPage");
          return { Component: KtHistoryPage };
        },
      },
      {
        path: "policy",
        children: [
          {
            path: "regular",
            lazy: async () => {
              const { default: MembershipPolicyPage } = await import("@/pages/ktwiz/MembershipPolicyPage");
              return { Component: MembershipPolicyPage };
            },
          },
          {
            path: "donation",
            lazy: async () => {
              const { default: MembershipPolicyPage } = await import("@/pages/ktwiz/MembershipPolicyPage");
              return { Component: MembershipPolicyPage };
            },
          },
        ],
      },
    ],
  },
];
