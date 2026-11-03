import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import bannerImage from "@/app/images/istockphoto-1870467143-612x612.jpg";

const Banner = () => {
  return (
    <section className="relative isolate flex min-h-[580px] w-full items-center overflow-hidden bg-[#081B32] sm:min-h-[650px] lg:min-h-[700px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImage.src})`,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061525]/95 via-[#081B32]/75 to-[#081B32]/20" />

      {/* Extra Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#081B32]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#70E443]/30 bg-[#70E443]/10 px-4 py-2 text-sm font-semibold text-[#70E443] backdrop-blur-md">
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
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Join community service events, make an impact, and build a better
            society together. Every small action creates a meaningful change.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/events"
              className="btn min-h-13 rounded-xl border-0 bg-[#70E443] px-7 text-base font-bold text-[#081B32] shadow-lg shadow-[#70E443]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#83F257] hover:shadow-xl"
            >
              Browse Events
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/about"
              className="btn min-h-13 rounded-xl border border-white/30 bg-white/5 px-7 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#70E443] hover:bg-[#70E443]/10 hover:text-[#70E443]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#70E443]/70 to-transparent" />
    </section>
  );
};

export default Banner;
