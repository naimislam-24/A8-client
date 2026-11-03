// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   CalendarDays,
//   Heart,
//   HeartHandshake,
//   Mail,
//   MapPin,
//   Share2,
//   ShieldCheck,
//   UserRound,
//   Users,
// } from "lucide-react";
// import type { Metadata } from "next";

// type TFormState = {
//   _id: string;
//   title: string;
//   eventType: string;
//   date: string;
//   location: string;
//   thumbnail: string;
//   description: string;
//   organizerEmail: string;
// };

// const guidelines = [
//   "Please arrive 15 minutes before the scheduled time at the designated location.",
//   "Wear comfortable clothing suitable for physical social work and distribution.",
//   "Bring any pre-coordinated relief packages or distribution items if requested.",
// ];

// const getDetails = async (id: string) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${id}`,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     notFound();
//   }

//   // Backend থেকে সরাসরি object বা { data: object } দুইভাবেই আসতে পারে
//   const data = await res.json();
//   const event: TFormState = data?.data ?? data;

//   if (!event?._id) {
//     notFound();
//   }

//   return event;
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const event = await getDetails(id);

//   return { title: event.title };
// }

// const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params;
//   const event = await getDetails(id);

//   const organizerName = (event.organizerEmail || "Event Organizer")
//     .split("@")[0]
//     .replace(/[._-]+/g, " ");

//   const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <div className="min-h-screen bg-[#f8fafb]">
//       {/* Hero Banner */}
//       <section className="relative h-[320px] w-full overflow-hidden sm:h-[380px]">
//         <Image
//           src={event.thumbnail}
//           alt={event.title}
//           fill
//           priority
//           unoptimized
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/25" />

//         {/* Category Badge */}
//         <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-md sm:left-6 sm:top-6 sm:text-sm">
//           <HeartHandshake size={16} className="text-emerald-600" />
//           {event.eventType}
//         </div>

//         {/* Title + Meta */}
//         <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-10">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
//               {event.title}
//             </h1>

//             <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-200 sm:text-base">
//               <span className="flex items-center gap-2">
//                 <MapPin size={17} className="text-emerald-400" />
//                 {event.location}
//               </span>

//               <span className="flex items-center gap-2">
//                 <CalendarDays size={17} className="text-emerald-400" />
//                 {formattedDate}
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//         {/* Volunteers / Join Card */}
//         <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-4">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
//               <Users size={22} />
//             </div>

//             <div>
//               <p className="text-base font-bold text-gray-900 sm:text-lg">
//                 0 Volunteers Joined
//               </p>

//               <p className="text-sm text-gray-500">
//                 Sign up to join hands for this drive
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               aria-label="Share event"
//               className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-600"
//             >
//               <Share2 size={18} />
//             </button>

//             <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98]">
//               <Heart size={17} />
//               Join Event
//             </button>
//           </div>
//         </div>

//         {/* About + Organizer */}
//         <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
//           {/* Left Column */}
//           <div className="lg:col-span-2">
//             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
//               <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
//                 About this Social Initiative
//               </h2>

//               <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
//                 {event.description}
//               </p>

//               <div className="my-7 border-t border-gray-200" />

//               <h3 className="text-xs font-bold uppercase tracking-[1.5px] text-gray-500">
//                 Volunteer Guidelines
//               </h3>

//               <ul className="mt-4 space-y-3">
//                 {guidelines.map((guideline) => (
//                   <li
//                     key={guideline}
//                     className="flex items-start gap-3 text-sm leading-6 text-gray-500 sm:text-base"
//                   >
//                     <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

//                     {guideline}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Organizer Sidebar */}
//           <aside>
//             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//               <h3 className="text-xs font-bold uppercase tracking-[1.5px] text-gray-500">
//                 Initiative Organizer
//               </h3>

//               <div className="mt-5 flex items-center gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
//                   <UserRound size={22} />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="truncate text-base font-bold text-gray-900 capitalize">
//                     {organizerName}
//                   </p>

//                   <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
//                     <Mail size={14} className="shrink-0 text-emerald-600" />

//                     <span className="truncate">{event.organizerEmail}</span>
//                   </p>
//                 </div>
//               </div>

//               <div className="my-5 border-t border-gray-200" />

//               <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
//                 <ShieldCheck size={16} className="text-emerald-600" />
//                 Verified Platform Member
//               </p>
//             </div>
//           </aside>
//         </div>

//         {/* Back Link */}
//         <div className="mt-8">
//           <Link
//             href="/facilities"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
//           >
//             <CalendarDays size={15} />
//             Back to Upcoming Events
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DetailsPage;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  CalendarDays,
  Users,
  ArrowLeft,
  Mail,
  Tag,
  Heart,
  Share2,
} from "lucide-react";
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
    <main className="min-h-screen bg-[#f8fafc] pb-16 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Hero Image */}
        <section className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-lg sm:h-[400px] lg:h-[480px]">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

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
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Heart size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    About This Event
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Learn more about this event
                  </p>
                </div>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {event.description}
              </p>
            </section>

            {/* Event Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-slate-900">
                Event Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CalendarDays size={21} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Event Date
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Location
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Tag size={21} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Category
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
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
