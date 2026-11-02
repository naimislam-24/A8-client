import Image from "next/image";
import { MapPin, CalendarDays, UserRound, ArrowRight, Tag } from "lucide-react";

type TFormState = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
};

const EventCard = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities`,
    {
      cache: "no-store",
    },
  );
  const events: TFormState[] = await res.json();
  //   console.log(events);

  return (
    <div className="">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {events?.map((event) => (
          <div
            key={event._id}
            className="group mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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

              {/* Event Type */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur-md">
                <Tag size={13} />
                {event.eventType}
              </div>

              {/* Date */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/65 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                <CalendarDays size={15} className="text-emerald-400" />

                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 transition-colors group-hover:text-emerald-600">
                {event.title}
              </h2>

              {/* Location */}
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={17} className="shrink-0 text-emerald-600" />
                <span>{event.location}</span>
              </div>

              {/* Description */}
              <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                {event.description}
              </p>

              <div className="my-5 border-t border-gray-200" />

              {/* Organizer */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UserRound size={17} className="text-emerald-600" />

                <span className="truncate">
                  {event.organizerEmail || "Event Organizer"}
                </span>
              </div>

              {/* Button */}
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98]">
                View Event
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
