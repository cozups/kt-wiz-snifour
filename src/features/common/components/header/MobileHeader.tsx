import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "./Sidebar";

function MobileHeader() {
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSidebarClose = () => setSideBarOpen(false);

  return (
    <div className="w-screen h-12 lg:hidden flex items-center justify-center fixed top-0 z-10 bg-black">
      <Sidebar open={sideBarOpen} onClose={handleSidebarClose} />
      <AlignJustify className="text-white absolute top-3 left-4 w-4" onClick={() => setSideBarOpen((prev) => !prev)} />
      <img
        src="/assets/img-logo.svg"
        alt=""
        className="h-8 my-1 cursor-pointer"
        onClick={() => navigate("/")}
        onKeyUp={() => navigate("/")}
      />
    </div>
  );
}

export { MobileHeader };
