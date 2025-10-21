import { navMenus } from "@/constants/nav-menus";
import { EditProfileDialog } from "@/features/auth";
import useUserSession from "@/features/auth/hooks/useUserSession";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router";

function WebHeader({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const { nickname } = useUserSession();

  return (
    <div
      className={cn(
        "w-screen fixed top-0 z-10 text-white hidden lg:flex flex-col justify-between items-center transition-all duration-150 origin-top",
        isHovered ? "bg-white h-96" : "bg-black h-30",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[1200px] h-30">
        {/* 윗단 - 스폰서, 로그인, 회원가입, KT Sports */}
        <nav className="">
          <ul className={`flex items-center justify-end py-2 gap-4 text-sm ${isHovered && "text-black"}`}>
            {nickname ? (
              <EditProfileDialog isHovered={isHovered}>
                <li>{nickname}</li>
              </EditProfileDialog>
            ) : (
              <div className="h-10 flex items-center gap-2">
                <Link to="/login" className="border-b border-b-transparent hover:border-b-wiz-red">
                  <li>로그인</li>
                </Link>
                <Link to="/join" className="border-b border-b-transparent hover:border-b-wiz-red">
                  <li>회원가입</li>
                </Link>
              </div>
            )}
          </ul>
        </nav>

        {/* 아랫단 - KT Wiz, Wiz Park, Game, Player, Media, Shop, 티켓구매  */}
        {/* hover 안 했을 때 */}
        <nav className={isHovered ? "text-black" : "text-white"}>
          <ul className="grid grid-cols-8 text-xl font-semibold ">
            {/* 로고 */}
            <li className="">
              {isHovered ? (
                <Link to="/">
                  <img src="/assets/img-logo-black.svg" alt="" className="mt-2" />
                </Link>
              ) : (
                <Link to="/">
                  <img src="/assets/img-logo.svg" alt="" className="mt-2" />
                </Link>
              )}
            </li>
            {navMenus.map((menu) => (
              <li
                key={menu.title}
                className={cn(
                  "w-fit h-20 border-b-4 border-b-transparent cursor-pointer hover:border-b-wiz-red flex items-center justify-center",

                  menu.title === "티켓구매" ? "text-wiz-red" : ""
                )}
              >
                {menu.title === "Shop" ? <Link to="https://www.ktwizstore.co.kr/">{menu.title}</Link> : menu.title}
              </li>
            ))}
          </ul>
        </nav>
        {/* hover 했을 때 서브메뉴 렌더 */}
        <div className={isHovered ? "block" : "hidden"}>
          <div className="grid grid-cols-8 text-black">
            <div className="w-[184px]" />
            {navMenus.map((menu) => (
              <ul key={`for-${menu.title}`} className="w-36 py-4">
                {menu.sub.map((subMenu) => (
                  <li
                    key={`sub-${subMenu.title}`}
                    className={cn("py-1 hover:text-wiz-red", subMenu.disabled && "text-gray-400 hover:text-gray-400")}
                  >
                    {subMenu.disabled ? <p>{subMenu.title}</p> : <Link to={subMenu.link}>{subMenu.title}</Link>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { WebHeader };
