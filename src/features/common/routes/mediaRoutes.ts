export const mediaRoutes = [
  {
    path: "/media",
    children: [
      {
        path: "wiznews",
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: NewsPage } = await import("@/pages/media/NewsPage");
              return { Component: NewsPage };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: NewsDetailPage } = await import("@/pages/media/id/NewsDetailPage");
              return { Component: NewsDetailPage };
            },
          },
        ],
      },
      {
        path: "wizpress",
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: NewsPage } = await import("@/pages/media/NewsPage");
              return { Component: NewsPage };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: PressDetailPage } = await import("@/pages/media/id/PressDetailPage");
              return { Component: PressDetailPage };
            },
          },
        ],
      },
      {
        path: "wizstory",
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: StoryPage } = await import("@/pages/media/StoryPage");
              return { Component: StoryPage };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: StoryDetailPage } = await import("@/pages/media/id/StoryDetailPage");
              return { Component: StoryDetailPage };
            },
          },
        ],
      },
      {
        path: "firstpitch",
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: FirstPitchPage } = await import("@/pages/media/FirstPitchPage");
              return { Component: FirstPitchPage };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: FirstPitchDetailPage } = await import("@/pages/media/id/FirstPitchDetailPage");
              return { Component: FirstPitchDetailPage };
            },
          },
        ],
      },
      {
        path: "highlight",
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: HighlightPage } = await import("@/pages/media/HighlightPage");
              return { Component: HighlightPage };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: HighlightDetailPage } = await import("@/pages/media/id/HighlightDetailPage");
              return { Component: HighlightDetailPage };
            },
          },
        ],
      },
      {
        path: "photos/:id",
        lazy: async () => {
          const { default: PhotoPage } = await import("@/pages/media/PhotoPage");
          return { Component: PhotoPage };
        },
      },
    ],
  },
];
