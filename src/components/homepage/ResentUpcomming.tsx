// export type TFormState = {
//   _id: string;
//   title: string;
//   eventType: string;
//   date: string;
//   location: string;
//   thumbnail: string;
//   description: string;
//   organizerEmail: string;
// };

import { ArrowRight, CalendarDays, MapPin, Tag, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// const ResentUpcomming = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilitiess/upcoming`,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch events");
//   }

//   const data = await res.json();

//   // Backend থেকে Array আসছে কিনা check
//   console.log("Backend Data:", data);

//   const events: TFormState[] = Array.isArray(data) ? data : data.data || [];
//   console.log(events);

//   return (
//     <div>

//     </div>
//   );
// };

// export default ResentUpcomming;
// ***************************************************
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

  // Backend থেকে Array আসছে কিনা check
  //   console.log("Backend Data:", data);

  const events: TFormState[] = Array.isArray(data) ? data : data.data || [];
  console.log(events);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image Section */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

              {/* Category Badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur-md">
                <Tag size={13} />
                {event.eventType}
              </div>

              {/* Date Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                <CalendarDays size={15} className="text-emerald-400" />

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
              <h2 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                {event.title}
              </h2>

              {/* Location */}
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="shrink-0 text-emerald-600" />
                <span className="truncate">{event.location}</span>
              </div>

              {/* Description */}
              <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                {event.description}
              </p>

              <div className="my-5 border-t border-gray-200" />

              {/* Organizer */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UserRound size={16} className="shrink-0 text-emerald-600" />

                <span className="truncate">
                  {event.organizerEmail || "Event Organizer"}
                </span>
              </div>

              {/* View Event Button */}
              <Link href={`/facilities/${event._id}`}>
                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98]">
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
  );
};

export default ResentUpcomming;
