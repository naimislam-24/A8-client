import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, ArrowLeft, Tag, Heart } from "lucide-react";
import BookCard from "@/components/booking/BookCard";

type TEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
};

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch data from backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  console.log("Backend Data:", data);

  // Backend response থেকে event data নেওয়া
  const event: TEvent = data?.data ?? data;

  if (!event?._id) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-16 pt-24 dark:bg-[#080d19]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/facilities"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Hero Image */}
        <section className="relative h-75 w-full overflow-hidden rounded-2xl shadow-lg sm:h-100 lg:h-120">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
            <span className="mb-4 w-fit rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
              {event.eventType}
            </span>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-white/90">
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {event.location}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/70 sm:block" />

              <span className="flex items-center gap-2">
                <CalendarDays size={18} />
                {formattedDate}
              </span>
            </div>
          </div>
        </section>

        {/* Details Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-7 lg:col-span-2">
            {/* About Event */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#11192c] sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Heart size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                    About This Event
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                    Learn more about this event
                  </p>
                </div>
              </div>

              <p className="text-base leading-8 text-slate-600 dark:text-gray-300">
                {event.description}
              </p>
            </section>

            {/* Event Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#11192c] sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                Event Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-[#0b1120]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <CalendarDays size={21} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                      Event Date
                    </p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-gray-200">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-[#0b1120]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-gray-200">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-[#0b1120]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <Tag size={21} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                      Category
                    </p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-gray-200">
                      {event.eventType}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <BookCard event={event} />
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
