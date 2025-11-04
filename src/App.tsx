import { Button } from "@/components/ui";
import { useEffect, useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignupForm } from "./features/auth";
import { ActionProvider, MessageParser } from "./features/chatbot";
import "./features/chatbot/chatbot.css";
import config from "./features/chatbot/config";
import { Footer, Header, ScrollToTop } from "./features/common";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { LoginPage, SignupPage } from "./pages/auth";
import RegularGamePage from "./pages/game/regular/RegularGamePage";
import KtHistoryPage from "./pages/ktwiz/KtHistoryPage";
import MembershipPolicyPage from "./pages/ktwiz/MembershipPolicyPage";
import WallpaperPage from "./pages/ktwiz/WallpaperPage";
import FirstPitchPage from "./pages/media/FirstPitchPage";
import HighlightPage from "./pages/media/HighlightPage";
import NewsPage from "./pages/media/NewsPage";
import PhotoPage from "./pages/media/PhotoPage";
import StoryPage from "./pages/media/StoryPage";
import FirstPitchDetailPage from "./pages/media/id/FirstPitchDetailPage";
import HighlightDetailPage from "./pages/media/id/HighlightDetailPage";
import NewsDetailPage from "./pages/media/id/NewsDetailPage";
import PressDetailPage from "./pages/media/id/PressDetailPage";
import StoryDetailPage from "./pages/media/id/StoryDetailPage";
import PlayerListPage from "./pages/player/PlayerListPage";
import TeamMemberDetailPage from "./pages/player/detail/TeamMemberDetailPage";
import TicketPurchasePage from "./pages/ticketpurchase/TicketPurchasePage";
import IksanStadiumPage from "./pages/wizPark/IksanStadiumPage";
import ParkIntroPage from "./pages/wizPark/ParkIntroPage";
import ParkLocationPage from "./pages/wizPark/ParkLocationPage";
import ParkingPage from "./pages/wizPark/ParkingPage";
import { Toaster } from "sonner";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const handleCloseChatbot = () => {
      setShowChatbot(false);
    };
    window.addEventListener("closeChatbot", handleCloseChatbot);

    return () => {
      window.removeEventListener("closeChatbot", handleCloseChatbot);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="w-full bg-wiz-black flex flex-col items-center relative">
        <Header />
        {/*
          데스크탑 -> 1240px (padding 포함, 실제컨텐츠 1200px),
          모바일 -> 100%
        */}
        <div className="w-full mt-12 lg:mt-28 px-5 lg:max-w-[1240px]">
          <Routes>
            {/* 메인 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<SignupPage />} />
            <Route path="/join/step" element={<SignupForm />} />

            {/* KT Wiz */}
            <Route path="/ktwiz/wallpaper" element={<WallpaperPage />} />
            <Route path="/ktwiz/about" element={<KtHistoryPage />} />
            <Route path="/ktwiz/history" element={<KtHistoryPage />} />
            <Route path="/ktwiz/policy/regular" element={<MembershipPolicyPage />} />
            <Route path="/ktwiz/policy/donation" element={<MembershipPolicyPage />} />

            {/* Wiz Park */}
            <Route path="/wizpark/intro" element={<ParkIntroPage />} />
            <Route path="/wizpark/location" element={<ParkLocationPage />} />
            <Route path="/wizpark/parking" element={<ParkingPage />} />
            <Route path="/wizpark/iksan" element={<IksanStadiumPage />} />

            {/* Game */}
            <Route path="/game/regular/*" element={<RegularGamePage />} />
            <Route path="/game/regular/boxscore/:gameDate/:gameKey" element={<RegularGamePage />} />

            {/* Player */}
            <Route path="/player/:position" element={<PlayerListPage />} />

            {/* Player 상세 페이지 경로 */}
            <Route path="/player/:position/detail" element={<TeamMemberDetailPage />} />

            {/* Media */}
            <Route path="/media/wiznews" element={<NewsPage />} />
            <Route path="/media/wizpress" element={<NewsPage />} />
            <Route path="/media/wizstory" element={<StoryPage />} />
            <Route path="/media/firstpitch" element={<FirstPitchPage />} />
            <Route path="/media/highlight" element={<HighlightPage />} />

            {/* Media 상세 */}
            <Route path="/media/wiznews/:id" element={<NewsDetailPage />} />
            <Route path="/media/wizpress/:id" element={<PressDetailPage />} />
            <Route path="/media/wizstory/:id" element={<StoryDetailPage />} />
            <Route path="/media/photos/:id" element={<PhotoPage />} />
            <Route path="/media/highlight/:id" element={<HighlightDetailPage />} />
            <Route path="/media/firstpitch/:id" element={<FirstPitchDetailPage />} />

            {/* Ticketpurchase */}
            <Route path="/ticket/reservation" element={<TicketPurchasePage />} />
            <Route path="/ticket/price" element={<TicketPurchasePage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          onClick={() => window.scrollTo(0, 0)}
          className="w-12 h-12 rounded-full bg-white border fixed bottom-2 left-2 flex items-center justify-center text-center cursor-pointer text-sm font-semibold"
        >
          TOP▲
        </div>
        {!showChatbot && (
          <Button
            onClick={() => setShowChatbot(true)}
            className="w-12 h-12 rounded-full bg-white border fixed bottom-20 right-2 hover:bg-wiz-red hover:text-wiz-white"
          >
            챗봇
          </Button>
        )}
        {showChatbot && <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />}
      </div>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
