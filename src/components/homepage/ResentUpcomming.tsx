import { ArrowRight, CalendarDays, MapPin, Tag, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type TFormState = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
};

const ResentUpcomming = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilitiess/upcoming`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();
  const events: TFormState[] = Array.isArray(data) ? data : data.data || [];

  return (
    <section className="bg-slate-50/50 py-16 px-4 text-gray-900 transition-colors duration-300 dark:bg-[#11192c] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#022C22] dark:text-white sm:text-4xl lg:text-5xl">
            Recent Upcoming{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#2DD4BF] bg-clip-text text-transparent">
              Events
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
            Be a part of meaningful community events and make an impact today.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="group flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-teal-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-xl dark:border-gray-700 dark:bg-[#080d19] dark:hover:border-[#2DD4BF]/40"
            >
              <div>
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Category Badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-teal-200/60 bg-[#E6F4F1]/90 px-3 py-1.5 text-xs font-bold text-[#0F766E] shadow-sm backdrop-blur-md">
                    <Tag size={13} />
                    {event.eventType}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <CalendarDays size={14} className="text-[#2DD4BF]" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="line-clamp-1 text-lg font-bold text-[#022C22] transition-colors group-hover:text-[#0F766E] dark:text-white dark:group-hover:text-[#2DD4BF]">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                    />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 min-h-[2.75rem] text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>

                  <div className="my-4 border-t border-gray-100 dark:border-gray-700" />

                  {/* Organizer */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <UserRound
                      size={15}
                      className="shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                    />
                    <span className="truncate">
                      {event.organizerEmail || "Event Organizer"}
                    </span>
                  </div>
                </div>
              </div>

              {/* View Event Button */}
              <div className="p-5 pt-0">
                <Link href={`/facilities/${event._id}`}>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#0F766E]/20 transition-all duration-300 hover:bg-[#115E59] active:scale-[0.98]">
                    View Event
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResentUpcomming;
