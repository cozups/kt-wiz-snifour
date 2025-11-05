export const authRoutes = [
  {
    path: "/login",
    lazy: async () => {
      const { default: LoginPage } = await import("@/pages/auth/LoginPage");
      return { Component: LoginPage };
    },
  },
  {
    path: "/join",
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: SignupPage } = await import("@/pages/auth/SignupPage");
          return { Component: SignupPage };
        },
      },
      {
        path: "step",
        lazy: async () => {
          const { SignupForm } = await import("@/features/auth");
          return { Component: SignupForm };
        },
      },
    ],
  },
];
