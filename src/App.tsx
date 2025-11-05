import "react-chatbot-kit/build/main.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import "./features/chatbot/chatbot.css";
import { Footer, ScrollToTop } from "./features/common";
import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";
import { ChatbotButton } from "./components/ChatbotButton";
import {
  authRoutes,
  infoRoutes,
  wizParkRoutes,
  gameRoutes,
  playerRoutes,
  mediaRoutes,
  ticketRoutes,
} from "./features/common/routes";
import { Header } from "./features/common/components/header";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <div className="w-full bg-wiz-black flex flex-col items-center relative">
          <Header />
          <div className="w-full mt-12 lg:mt-28 px-5 lg:max-w-[1240px]">
            <Outlet />
          </div>
          <Footer />
          <div
            onClick={() => window.scrollTo(0, 0)}
            className="w-12 h-12 rounded-full bg-white border fixed bottom-2 left-2 flex items-center justify-center text-center cursor-pointer text-sm font-semibold"
          >
            TOP▲
          </div>
          <ChatbotButton />
        </div>
        <Toaster position="top-center" richColors />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      ...authRoutes,
      ...infoRoutes,
      ...wizParkRoutes,
      ...gameRoutes,
      ...playerRoutes,
      ...mediaRoutes,
      ...ticketRoutes,
      {
        path: "*",
        lazy: async () => {
          const { default: NotFoundPage } = await import("./pages/NotFoundPage");
          return { Component: NotFoundPage };
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
