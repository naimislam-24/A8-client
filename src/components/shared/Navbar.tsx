import { HeartHandshake, CalendarDays, Moon, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#081B32]/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
      <nav className="navbar mx-auto min-h-[76px] max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="navbar-start">
          <a href="/" className="group flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#70E443] text-[#081B32] shadow-lg shadow-[#70E443]/20 transition-transform duration-300 group-hover:scale-105">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div className="">
              <span className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
                Good<span className="text-green-400">Gather</span>
              </span>
              {/* <span className="text-[9px] font-bold uppercase tracking-[2px] text-white/50">
                Community Action
              </span> */}
            </div>
          </a>
        </div>

        {/* Center Navigation */}
        <div className="navbar-center hidden md:flex">
          <a
            href="/events"
            className="group flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:bg-[#70E443]/10 hover:text-[#70E443]"
          >
            <CalendarDays size={18} />
            Upcoming Events
          </a>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2 sm:gap-4">
          {/* Theme Icon */}
          <button
            className="btn btn-ghost btn-circle btn-sm text-white/70 transition-all hover:bg-[#70E443]/10 hover:text-[#70E443] sm:btn-md"
            aria-label="Theme"
          >
            <Moon size={21} />
          </button>

          {/* Login Button */}
          <a
            href="/login"
            className="btn min-h-10 rounded-xl border-0 bg-[#70E443] px-4 text-sm font-bold text-[#081B32] shadow-md shadow-[#70E443]/20 transition-all duration-300 hover:-translate-y-0.5  hover:bg-[#83F257] hover:shadow-lg sm:min-h-11 sm:px-6 sm:text-base"
          >
            <LogIn size={17} />
            Login
          </a>
        </div>
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
