export const ticketRoutes = [
  {
    path: "/ticket",
    children: [
      {
        path: "reservation",
        lazy: async () => {
          const { default: TicketPurchasePage } = await import("@/pages/ticketpurchase/TicketPurchasePage");
          return { Component: TicketPurchasePage };
        },
      },
      {
        path: "price",
        lazy: async () => {
          const { default: TicketPurchasePage } = await import("@/pages/ticketpurchase/TicketPurchasePage");
          return { Component: TicketPurchasePage };
        },
      },
    ],
  },
];
