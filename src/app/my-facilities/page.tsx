// "use client";

// import { useSession } from "@/lib/auth-client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { MapPin, CalendarDays, UserRound, Eye, Tag } from "lucide-react";
// import EditFacilities from "@/components/EditFacilities";
// import DeleteFacilities from "@/components/DeleteFacilities";

// type TFacility = {
//   _id: string;
//   title: string;
//   eventType: string;
//   date: string;
//   location: string;
//   thumbnail: string;
//   description: string;
//   organizerEmail: string;
// };

// const MyFacilitiesPage = () => {
//   const { data: session, isPending } = useSession();

//   const user = session?.user?.email;

//   const [facilities, setFacilities] = useState<TFacility[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isPending) return;

//     if (!user) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setLoading(false);
//       return;
//     }

//     fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/my-facilities/${encodeURIComponent(user)}`,
//     )
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch facilities");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setFacilities(Array.isArray(data) ? data : []);
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [user, isPending]);

//   if (isPending || loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-[#0F766E]"></span>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="py-20 text-center text-gray-500">
//         Please login to see your facilities.
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-10">
//           <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0F766E]">
//             Manage Your Activities
//           </p>

//           <h1 className="text-3xl font-bold text-[#022C22] sm:text-4xl">
//             My Facilities
//           </h1>

//           <p className="mt-3 text-gray-600">
//             Manage all your created community activities in one place.
//           </p>
//         </div>

//         {/* Empty State */}
//         {facilities.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-teal-200 bg-white px-5 py-20 text-center shadow-sm">
//             <h2 className="text-xl font-bold text-[#022C22]">
//               No Facilities Found!
//             </h2>
//             <p className="mt-2 text-sm text-gray-500">
//               You havent created any facilities yet.
//             </p>
//           </div>
//         ) : (
//           /* Cards Grid */
//           <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
//             {[...facilities]
//               .sort(
//                 (a, b) =>
//                   new Date(a.date).getTime() - new Date(b.date).getTime(),
//               )
//               .map((facility) => (
//                 <div
//                   key={facility._id}
//                   className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-teal-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-xl"
//                 >
//                   <div>
//                     {/* Card Image */}
//                     <div className="relative h-60 w-full overflow-hidden">
//                       <Image
//                         src={facility.thumbnail}
//                         alt={facility.title}
//                         fill
//                         unoptimized
//                         className="object-cover transition-transform duration-500 group-hover:scale-105"
//                       />

//                       {/* Image Gradient */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

//                       {/* Category Badge */}
//                       <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-teal-200/60 bg-[#E6F4F1]/90 px-3 py-1.5 text-xs font-bold text-[#0F766E] shadow-sm backdrop-blur-md">
//                         <Tag size={13} />
//                         {facility.eventType}
//                       </div>

//                       {/* Date Badge */}
//                       <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
//                         <CalendarDays size={14} className="text-[#2DD4BF]" />
//                         {new Date(facility.date).toLocaleDateString("en-US", {
//                           weekday: "short",
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                         })}
//                       </div>
//                     </div>

//                     {/* Card Content */}
//                     <div className="p-5">
//                       {/* Title */}
//                       <h2 className="mb-3 line-clamp-1 text-xl font-bold text-[#022C22] transition-colors group-hover:text-[#0F766E]">
//                         {facility.title}
//                       </h2>

//                       {/* Location */}
//                       <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
//                         <MapPin size={17} className="shrink-0 text-[#0F766E]" />
//                         <span className="line-clamp-1">
//                           {facility.location}
//                         </span>
//                       </div>

//                       {/* Description */}
//                       <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
//                         {facility.description}
//                       </p>

//                       <div className="mb-4 border-t border-gray-100" />

//                       {/* Organizer Email */}
//                       <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
//                         <UserRound
//                           size={15}
//                           className="shrink-0 text-[#0F766E]"
//                         />
//                         <span className="truncate">
//                           {facility.organizerEmail}
//                         </span>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="grid grid-cols-3 gap-2">
//                         {/* View */}
//                         <Link
//                           href={`/facilities/${facility._id}`}
//                           className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-[#0F766E]/10 hover:text-[#0F766E]"
//                         >
//                           <Eye size={15} />
//                           View
//                         </Link>
//                         {/* <Link
//                           href={`/facilities/${facility._id}`}
//                           className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0F766E] px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#115E59] active:scale-95"
//                         >
//                           <Eye size={15} />
//                           View
//                         </Link> */}

//                         <EditFacilities facility={facility} />
//                         <DeleteFacilities id={facility._id} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyFacilitiesPage;

"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, UserRound, Eye, Tag } from "lucide-react";
import EditFacilities from "@/components/EditFacilities";
import DeleteFacilities from "@/components/DeleteFacilities";

type TFacility = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
};

const MyFacilitiesPage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user?.email;

  const [facilities, setFacilities] = useState<TFacility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/my-facilities/${encodeURIComponent(user)}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch facilities");
        }
        return res.json();
      })
      .then((data) => {
        setFacilities(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [user, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center dark:bg-[#080d19]">
        <span className="loading loading-spinner loading-lg text-[#0F766E]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-transparent px-4 text-center text-gray-500 dark:text-gray-400">
        Please login to see your facilities.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50/50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-[#080d19]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0F766E] sm:text-sm dark:text-teal-400">
            Manage Your Activities
          </p>

          <h1 className="text-2xl font-bold text-[#022C22] sm:text-3xl md:text-4xl dark:text-white">
            My Facilities
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base dark:text-gray-400">
            Manage all your created community activities in one place.
          </p>
        </div>

        {/* Empty State */}
        {facilities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-teal-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20 dark:border-teal-800 dark:bg-[#11192c]">
            <h2 className="text-lg font-bold text-[#022C22] sm:text-xl dark:text-white">
              No Facilities Found!
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You havent created any facilities yet.
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {[...facilities]
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((facility) => (
                <div
                  key={facility._id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-teal-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-xl dark:border-gray-700 dark:bg-[#11192c] dark:hover:border-teal-700 dark:hover:shadow-black/30"
                >
                  {/* Card Image */}
                  <div className="relative h-52 w-full overflow-hidden sm:h-56 lg:h-60">
                    <Image
                      src={facility.thumbnail}
                      alt={facility.title}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Category */}
                    <div className="absolute left-3 top-3 flex max-w-[85%] items-center gap-1.5 truncate rounded-full border border-teal-200/60 bg-[#E6F4F1]/90 px-3 py-1.5 text-xs font-bold text-[#0F766E] shadow-sm backdrop-blur-md sm:left-4 sm:top-4">
                      <Tag size={13} />
                      <span className="truncate">{facility.eventType}</span>
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:bottom-4 sm:left-4">
                      <CalendarDays
                        size={14}
                        className="shrink-0 text-[#2DD4BF]"
                      />
                      <span>
                        {new Date(facility.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h2 className="mb-3 line-clamp-1 text-lg font-bold text-[#022C22] transition-colors group-hover:text-[#0F766E] sm:text-xl dark:text-white dark:group-hover:text-teal-400">
                      {facility.title}
                    </h2>

                    {/* Location */}
                    <div className="mb-3 flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin
                        size={17}
                        className="shrink-0 text-[#0F766E] dark:text-teal-400"
                      />
                      <span className="truncate">{facility.location}</span>
                    </div>

                    {/* Description */}
                    <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {facility.description}
                    </p>

                    <div className="mb-4 border-t border-gray-100 dark:border-gray-700" />

                    {/* Organizer */}
                    <div className="mb-5 flex min-w-0 items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <UserRound
                        size={15}
                        className="shrink-0 text-[#0F766E] dark:text-teal-400"
                      />
                      <span className="truncate">
                        {facility.organizerEmail || "Event Organizer"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-3 items-center gap-2">
                      {/* View */}
                      <Link
                        href={`/facilities/${facility._id}`}
                        className="flex h-10 min-w-0 items-center justify-center gap-1 rounded-xl bg-slate-100 px-1.5 text-xs font-bold text-gray-700 transition hover:bg-[#0F766E]/10 hover:text-[#0F766E] sm:gap-1.5 sm:px-2 dark:bg-[#1c2940] dark:text-gray-200 dark:hover:bg-teal-500/15 dark:hover:text-teal-400"
                      >
                        <Eye size={15} />
                        View
                      </Link>

                      {/* Edit */}
                      <div className="relative left-6 w-full">
                        <EditFacilities facility={facility} />
                      </div>

                      {/* Delete */}
                      <div className="min-w-0">
                        <DeleteFacilities id={facility._id} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyFacilitiesPage;
