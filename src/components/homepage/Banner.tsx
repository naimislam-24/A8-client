import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import bannerImage from "@/app/images/istockphoto-1870467143-612x612.jpg";

const Banner = () => {
  return (
    <section className="relative isolate flex min-h-[580px] w-full items-center overflow-hidden bg-[#022C22] transition-colors duration-300 dark:bg-[#080d19] sm:min-h-[650px] lg:min-h-[700px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-25 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImage.src})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#022C22]/65 via-[#064E3B]/40 to-transparent dark:from-[#080d19]/80 dark:via-[#080d19]/55 dark:to-[#080d19]/15" />

      {/* Extra Subtle Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#022C22]/30 via-transparent to-transparent dark:from-[#080d19]/50 dark:via-transparent dark:to-[#080d19]/20" />

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/40 bg-[#0F766E]/40 px-4 py-2 text-xs font-semibold text-[#2DD4BF] shadow-sm backdrop-blur-md sm:text-sm">
            <HeartHandshake size={17} />
            Together We Make a Difference
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Together for
            <br />a Better{" "}
            <span className="bg-gradient-to-r from-[#70E443] to-[#B5FF83] bg-clip-text text-transparent">
              Community
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/95 sm:text-lg sm:leading-8">
            Join community service events, make an impact, and build a better
            society together. Every small action creates a meaningful change.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/facilities"
              className="btn min-h-13 w-full rounded-xl border-0 bg-[#0F766E] px-5 text-sm font-bold text-white shadow-lg shadow-[#0F766E]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#115E59] hover:shadow-xl sm:w-auto sm:px-7 sm:text-base"
            >
              Explore Upcoming Events
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/add-facilities"
              className="btn min-h-13 w-full rounded-xl border border-white/40 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2DD4BF] hover:bg-[#0F766E]/20 hover:text-[#2DD4BF] sm:w-auto sm:px-7 sm:text-base"
            >
              Create Events
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#2DD4BF]/70 to-transparent" />
    </section>
  );
};

export default Banner;
