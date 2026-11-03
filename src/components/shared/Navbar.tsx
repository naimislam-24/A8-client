"use client";
import { signOut, useSession } from "@/lib/auth-client";
import {
  HeartHandshake,
  CalendarDays,
  Moon,
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
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@heroui/react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#081B32]/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
      <nav className="navbar mx-auto min-h-[76px] max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl text-emerald-600 text-[#081B32] shadow-lg shadow-[#70E443]/20 transition-transform duration-300 group-hover:scale-105">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div className="">
              <span className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
                Good<span className="text-emerald-600">Gather</span>
              </span>
              {/* <span className="text-[9px] font-bold uppercase tracking-[2px] text-white/50">
                Community Action
              </span> */}
            </div>
          </Link>
        </div>

        {/* Center Navigation */}

        <div className="navbar-center hidden md:flex">
          <Link href={"/facilities"}>
            <p className="group flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:bg-emerald-600/10 hover:text-emerald-600">
              <CalendarDays size={18} />
              Upcoming Events
            </p>
          </Link>
        </div>

        {session?.user ? (
          <>
            <div className="navbar-end gap-2 sm:gap-4">
              <button
                className="btn btn-ghost btn-circle btn-sm text-white/70 transition-all hover:bg-[#70E443]/10 hover:text-[#70E443] sm:btn-md"
                aria-label="Theme"
              >
                <Moon size={21} />
              </button>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                  render={
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#70E443]/30 transition-all hover:border-[#70E443]">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#70E443] font-bold text-[#081B32]">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  }
                />

                <PopoverContent
                  align="end"
                  sideOffset={12}
                  className="w-64 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 text-gray-800 shadow-xl"
                >
                  {/* Profile Info */}
                  <div className="flex items-center gap-3 p-4">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                      />
                      <AvatarFallback className="bg-[#70E443] font-bold text-[#081B32]">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-gray-900">
                        {user?.name}
                      </h3>
                      <p className="truncate text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Menu Items */}
                  <div className="space-y-1 p-2">
                    <Link
                      href="/add-facilities"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#70E443]/10 hover:text-[#359B20]"
                    >
                      <PlusCircle size={18} className="text-[#38BFA7]" />
                      Create Event
                    </Link>

                    <Link
                      href="/my-facilities"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-600"
                    >
                      <Settings size={18} className="text-purple-500" />
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#70E443]/10 hover:text-[#359B20]"
                    >
                      <CircleCheck size={18} className="text-[#38BFA7]" />
                      Joined Events
                    </Link>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Logout */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setOpen(false);
                        signOut();
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <button
                onClick={() => signOut()}
                className="btn min-h-10 rounded-xl border-0 bg-[#70E443] px-4 text-sm font-bold text-[#081B32] shadow-md shadow-[#70E443]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#83F257] hover:shadow-lg sm:min-h-11 sm:px-6 sm:text-base"
              >
                <LogOut size={17} />
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end gap-2 sm:gap-4">
              <button
                className="btn btn-ghost btn-circle btn-sm text-white/70 transition-all hover:bg-[#70E443]/10 hover:text-[#70E443] sm:btn-md"
                aria-label="Theme"
              >
                <Moon size={21} />
              </button>
              <Link href={"/sign-in"}>
                <button className="btn min-h-10 rounded-xl border-0 bg-[#70E443] px-4 text-sm font-bold text-[#081B32] shadow-md shadow-[#70E443]/20 transition-all duration-300 hover:-translate-y-0.5  hover:bg-[#83F257] hover:shadow-lg sm:min-h-11 sm:px-6 sm:text-base">
                  <LogIn size={17} />
                  Login
                </button>
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="border-t border-white/10 px-4 py-2 md:hidden">
        <a
          href="/events"
          className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white/70 transition hover:bg-[#70E443]/10 hover:text-[#70E443]"
        >
          <CalendarDays size={17} />
          Upcoming Events
        </a>
      </div>
    </header>
  );
};

export default Navbar;
