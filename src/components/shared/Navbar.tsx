"use client";
import { signOut, useSession } from "@/lib/auth-client";
import {
  HeartHandshake,
  CalendarDays,
  LogIn,
  LogOut,
  Settings,
  CircleCheck,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="dark:bg-[#11192c] dark:text-white  sticky top-0 z-50 w-full border-b border-white/10 bg-[#022C22]/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
      <nav className="navbar mx-auto min-h-19 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <nav className="navbar mx-auto min-h-19 max-w-7xl"> */}
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F766E]/30 text-[#2DD4BF] shadow-lg shadow-[#0F766E]/20 transition-transform duration-300 group-hover:scale-105">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div>
              <span className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
                Good<span className="text-[#70E443]">Gather</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="navbar-center hidden md:flex">
          <Link href={"/facilities"}>
            <p className="group flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-[#0F766E]/20 hover:text-[#2DD4BF]">
              <CalendarDays size={18} />
              Upcoming Events
            </p>
          </Link>
        </div>

        {session?.user ? (
          <div className="navbar-end gap-2 sm:gap-4">
            {/* <button
              className="btn btn-ghost btn-circle btn-sm text-white/80 transition-all hover:bg-[#0F766E]/20 hover:text-[#2DD4BF] sm:btn-md"
              aria-label="Theme"
            >
              <Moon size={21} />
            </button> */}
            <ThemeToggle />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    className="cursor-pointer rounded-full outline-none"
                  >
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#2DD4BF]/40 transition-all hover:border-[#2DD4BF]">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#0F766E] font-bold text-white">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <PopoverContent
                align="end"
                sideOffset={12}
                className="w-64 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 text-gray-800 shadow-xl dark:border-gray-700 dark:bg-[#11192c] dark:text-white"
              >
                {/* Profile Info */}
                <div className="flex items-center gap-3 p-4">
                  <Avatar className="h-11 w-11">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback className="bg-[#0F766E] font-bold text-white">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white!">
                      {user?.name}
                    </h3>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-300!">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700" />

                {/* Menu Items */}
                <div className="space-y-1 p-2">
                  <Link
                    href="/add-facilities"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#0F766E]/10 hover:text-[#0F766E] dark:text-white! dark:hover:bg-[#0F766E]/20 dark:hover:text-[#2DD4BF]!"
                  >
                    <PlusCircle size={18} className="text-[#0F766E]" />
                    Create Event
                  </Link>

                  <Link
                    href="/my-facilities"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600 dark:text-white! dark:hover:bg-purple-500/15 dark:hover:text-purple-400!"
                  >
                    <Settings size={18} className="text-purple-500" />
                    Manage Events
                  </Link>

                  <Link
                    href="/joined-facilities"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#0F766E]/10 hover:text-[#0F766E] dark:text-white! dark:hover:bg-[#0F766E]/20 dark:hover:text-[#2DD4BF]!"
                  >
                    <CircleCheck size={18} className="text-[#0F766E]" />
                    Joined Events
                  </Link>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700" />

                {/* Logout */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-50 hover:text-red-600 dark:text-red-400! dark:hover:bg-red-500/15 dark:hover:text-red-300!"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            <button
              onClick={() => signOut()}
              className="btn min-h-8 rounded-lg border-0 bg-[#0F766E] px-2.5 text-xs font-bold text-white shadow-md shadow-[#0F766E]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#115E59] hover:shadow-lg sm:min-h-11 sm:rounded-xl sm:px-6 sm:text-base"
            >
              <LogOut size={17} />
              Log Out
            </button>
          </div>
        ) : (
          <div className="navbar-end gap-2 sm:gap-4">
            {/* <button
              className="btn btn-ghost btn-circle btn-sm text-white/80 transition-all hover:bg-[#0F766E]/20 hover:text-[#2DD4BF] sm:btn-md"
              aria-label="Theme"
            >
              <Moon size={21} />
            </button> */}
            <ThemeToggle />
            <Link href={"/sign-in"}>
              <button className="btn min-h-8 rounded-lg border-0 bg-[#0F766E] px-2.5 text-xs font-bold text-white shadow-md shadow-[#0F766E]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#115E59] hover:shadow-lg sm:min-h-11 sm:rounded-xl sm:px-6 sm:text-base">
                <LogIn size={17} />
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="border-t border-white/10 px-4 py-2 md:hidden">
        <a
          href="/events"
          className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white/80 transition hover:bg-[#0F766E]/20 hover:text-[#2DD4BF]"
        >
          <CalendarDays size={17} />
          Upcoming Events
        </a>
      </div>
    </header>

    // <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#022C22]/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl dark:bg-[#11192c]">
    //   <nav className="navbar mx-auto min-h-16 max-w-7xl px-3 sm:min-h-19 sm:px-5 lg:px-8">
    //     {/* Logo */}
    //     <div className="navbar-start min-w-0 flex-1">
    //       <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
    //         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/30 text-[#2DD4BF] shadow-lg shadow-[#0F766E]/20 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
    //           <HeartHandshake size={24} strokeWidth={2.5} />
    //         </div>

    //         <div>
    //           <span className="text-lg font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
    //             Good<span className="text-[#70E443]">Gather</span>
    //           </span>
    //         </div>
    //       </Link>
    //     </div>

    //     {/* Center Navigation */}
    //     <div className="navbar-center hidden md:flex">
    //       <Link href={"/facilities"}>
    //         <p className="group flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-[#0F766E]/20 hover:text-[#2DD4BF] lg:px-5">
    //           <CalendarDays size={18} />
    //           Upcoming Events
    //         </p>
    //       </Link>
    //     </div>

    //     {session?.user ? (
    //       <div className="navbar-end flex flex-1 items-center justify-end gap-1.5 sm:gap-3 lg:gap-4">
    //         <ThemeToggle />

    //         <Popover open={open} onOpenChange={setOpen}>
    //           <PopoverTrigger
    //             render={
    //               <button
    //                 type="button"
    //                 aria-label="Open profile menu"
    //                 className="cursor-pointer rounded-full outline-none"
    //               >
    //                 <Avatar className="h-9 w-9 cursor-pointer border-2 border-[#2DD4BF]/40 transition-all hover:border-[#2DD4BF] sm:h-10 sm:w-10">
    //                   <AvatarImage
    //                     referrerPolicy="no-referrer"
    //                     src={user?.image as string}
    //                     className="object-cover"
    //                   />
    //                   <AvatarFallback className="bg-[#0F766E] font-bold text-white">
    //                     {user?.name?.charAt(0)}
    //                   </AvatarFallback>
    //                 </Avatar>
    //               </button>
    //             }
    //           />
    //           <PopoverContent
    //             align="end"
    //             sideOffset={12}
    //             className="w-64 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 text-gray-800 shadow-xl dark:border-gray-700 dark:bg-[#11192c] dark:text-white"
    //           >
    //             {/* Profile Info */}
    //             <div className="flex items-center gap-3 p-4">
    //               <Avatar className="h-11 w-11">
    //                 <AvatarImage
    //                   referrerPolicy="no-referrer"
    //                   src={user?.image as string}
    //                 />
    //                 <AvatarFallback className="bg-[#0F766E] font-bold text-white">
    //                   {user?.name?.charAt(0)}
    //                 </AvatarFallback>
    //               </Avatar>

    //               <div className="min-w-0 flex-1">
    //                 <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white!">
    //                   {user?.name}
    //                 </h3>
    //                 <p className="truncate text-xs text-gray-500 dark:text-gray-300!">
    //                   {user?.email}
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="border-t border-gray-100 dark:border-gray-700" />

    //             {/* Menu Items */}
    //             <div className="space-y-1 p-2">
    //               <Link
    //                 href="/add-facilities"
    //                 onClick={() => setOpen(false)}
    //                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#0F766E]/10 hover:text-[#0F766E] dark:text-white! dark:hover:bg-[#0F766E]/20 dark:hover:text-[#2DD4BF]!"
    //               >
    //                 <PlusCircle size={18} className="text-[#0F766E]" />
    //                 Create Event
    //               </Link>

    //               <Link
    //                 href="/my-facilities"
    //                 onClick={() => setOpen(false)}
    //                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600 dark:text-white! dark:hover:bg-purple-500/15 dark:hover:text-purple-400!"
    //               >
    //                 <Settings size={18} className="text-purple-500" />
    //                 Manage Events
    //               </Link>

    //               <Link
    //                 href="/joined-facilities"
    //                 onClick={() => setOpen(false)}
    //                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#0F766E]/10 hover:text-[#0F766E] dark:text-white! dark:hover:bg-[#0F766E]/20 dark:hover:text-[#2DD4BF]!"
    //               >
    //                 <CircleCheck size={18} className="text-[#0F766E]" />
    //                 Joined Events
    //               </Link>
    //             </div>

    //             <div className="border-t border-gray-100 dark:border-gray-700" />

    //             {/* Logout */}
    //             <div className="p-2">
    //               <button
    //                 onClick={() => {
    //                   setOpen(false);
    //                   signOut();
    //                 }}
    //                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-50 hover:text-red-600 dark:text-red-400! dark:hover:bg-red-500/15 dark:hover:text-red-300!"
    //               >
    //                 <LogOut size={18} />
    //                 Logout
    //               </button>
    //             </div>
    //           </PopoverContent>
    //         </Popover>

    //         <button
    //           onClick={() => signOut()}
    //           className="btn min-h-8 rounded-lg border-0 bg-[#0F766E] px-2 text-xs font-bold text-white shadow-md shadow-[#0F766E]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#115E59] hover:shadow-lg sm:min-h-10 sm:rounded-xl sm:px-4 sm:text-sm lg:min-h-11 lg:px-6 lg:text-base"
    //         >
    //           <LogOut size={16} />
    //           <span className="hidden xs:inline">Log Out</span>
    //           <span className="xs:hidden">Out</span>
    //         </button>
    //       </div>
    //     ) : (
    //       <div className="navbar-end flex flex-1 items-center justify-end gap-2 sm:gap-4">
    //         <ThemeToggle />
    //         <Link href={"/sign-in"}>
    //           <button className="btn min-h-8 rounded-lg border-0 bg-[#0F766E] px-2.5 text-xs font-bold text-white shadow-md shadow-[#0F766E]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#115E59] hover:shadow-lg sm:min-h-11 sm:rounded-xl sm:px-6 sm:text-base">
    //             <LogIn size={17} />
    //             Login
    //           </button>
    //         </Link>
    //       </div>
    //     )}
    //   </nav>

    //   {/* Mobile Navigation */}
    //   <div className="border-t border-white/10 px-3 py-1.5 md:hidden">
    //     <Link
    //       href="/facilities"
    //       className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white/80 transition hover:bg-[#0F766E]/20 hover:text-[#2DD4BF]"
    //     >
    //       <CalendarDays size={17} />
    //       Upcoming Events
    //     </Link>
    //   </div>
    // </header>
  );
};

export default Navbar;
