"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Image from "next/image";

type TBooking = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
  eventId: string;
  bookingDate: string;
  userEmail: string;
};

const JoinFacilitiesPage = () => {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      // setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/bookings/${encodeURIComponent(email)}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Booking fetch error:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [email, isPending]);

  // Loading State
  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  // Empty State
  if (!bookings.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <div className="mb-4 rounded-full bg-teal-50 p-5">
          <CalendarDays className="h-10 w-10 text-teal-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          No Joined Facilities Yet!
        </h2>

        <p className="mt-2 max-w-md text-gray-500">
          You havent joined any community events yet. Explore facilities and
          become a part of something meaningful.
        </p>

        <Link
          href="/facilities"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          Explore Facilities
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f8f7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            My Activities
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Joined Facilities
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your joined community events and make a difference.
          </p>
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[...bookings]
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            )
            .map((booking) => (
              <div
                key={booking._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    width={600}
                    height={600}
                    src={booking.thumbnail}
                    alt={booking.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Event Type */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm backdrop-blur-sm">
                    {booking.eventType}
                  </span>

                  {/* Event Date */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <CalendarDays size={15} className="text-teal-400" />
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Title */}
                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-teal-700">
                    {booking.title}
                  </h2>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={17} className="shrink-0 text-teal-600" />
                    <span>{booking.location}</span>
                  </div>

                  {/* Confirmation */}
                  <div className="mt-5 flex items-start gap-2 rounded-lg bg-teal-50 p-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-teal-600"
                    />

                    <p className="text-xs font-medium leading-relaxed text-teal-800">
                      {booking.description}
                    </p>
                  </div>

                  {/* Joined Date */}
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
                    <Clock size={16} className="text-teal-600" />

                    <span className="font-semibold text-teal-700">
                      Joined{" "}
                      {new Date(booking.bookingDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>

                  {/* View Event Button */}
                  <Link
                    href={`/facilities/${booking.eventId}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
                  >
                    View Event
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default JoinFacilitiesPage;

// **************************************************************

// "use client";

// import { useSession } from "@/lib/auth-client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   CalendarDays,
//   MapPin,
//   ArrowRight,
//   CheckCircle2,
//   Clock,
//   Trash2,
// } from "lucide-react";
// import Image from "next/image";

// type TBooking = {
//   _id: string;
//   title: string;
//   eventType: string;
//   date: string;
//   location: string;
//   thumbnail: string;
//   description: string;
//   organizerEmail: string;
//   eventId: string;
//   bookingDate: string;
//   userEmail: string;
// };

// const JoinFacilitiesPage = () => {
//   const [bookings, setBookings] = useState<TBooking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [cancellingId, setCancellingId] = useState<string | null>(null);

//   const { data: session, isPending } = useSession();
//   const email = session?.user?.email;

//   // Fetch Joined Facilities
//   useEffect(() => {
//     if (isPending) return;

//     if (!email) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setLoading(false);
//       return;
//     }

//     const fetchBookings = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/bookings/${encodeURIComponent(email)}`,
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch bookings");
//         }

//         const data = await res.json();
//         setBookings(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Booking fetch error:", error);
//         setBookings([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [email, isPending]);

//   // Cancel Booking Function
//   const handleCancelBooking = async (bookingId: string) => {
//     const confirmCancel = window.confirm(
//       "Are you sure you want to cancel this booking?",
//     );

//     if (!confirmCancel) return;

//     try {
//       setCancellingId(bookingId);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/bookings/${bookingId}`,
//         {
//           method: "DELETE",
//         },
//       );

//       if (!res.ok) {
//         throw new Error("Failed to cancel booking");
//       }

//       // Remove cancelled booking from UI
//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== bookingId),
//       );

//       alert("Booking cancelled successfully!");
//     } catch (error) {
//       console.error("Cancel booking error:", error);
//       alert("Failed to cancel booking. Please try again.");
//     } finally {
//       setCancellingId(null);
//     }
//   };

//   // Loading State
//   if (isPending || loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-teal-500"></span>
//       </div>
//     );
//   }

//   // Empty State
//   if (!bookings.length) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
//         <div className="mb-4 rounded-full bg-teal-50 p-5">
//           <CalendarDays className="h-10 w-10 text-teal-600" />
//         </div>

//         <h2 className="text-2xl font-bold text-gray-800">
//           No Joined Facilities Yet!
//         </h2>

//         <p className="mt-2 max-w-md text-gray-500">
//           You havent joined any community events yet. Explore facilities and
//           become a part of something meaningful.
//         </p>

//         <Link
//           href="/facilities"
//           className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
//         >
//           Explore Facilities
//           <ArrowRight size={18} />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-[#f5f8f7] px-4 py-12 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-10">
//           <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
//             My Activities
//           </span>

//           <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Joined Facilities
//           </h1>

//           <p className="mt-3 text-gray-500">
//             Manage your joined community events and make a difference.
//           </p>
//         </div>

//         {/* Booking Cards */}
//         <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//             >
//               {/* Image */}
//               <div className="relative h-60 overflow-hidden">
//                 <Image
//                   width={600}
//                   height={600}
//                   src={booking.thumbnail}
//                   alt={booking.title}
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />

//                 {/* Image Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

//                 {/* Event Type */}
//                 <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm backdrop-blur-sm">
//                   {booking.eventType}
//                 </span>

//                 {/* Event Date */}
//                 <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
//                   <CalendarDays size={15} className="text-teal-400" />

//                   {new Date(booking.date).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-5">
//                 {/* Title */}
//                 <h2 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-teal-700">
//                   {booking.title}
//                 </h2>

//                 {/* Location */}
//                 <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
//                   <MapPin size={17} className="shrink-0 text-teal-600" />
//                   <span>{booking.location}</span>
//                 </div>

//                 {/* Confirmation */}
//                 <div className="mt-5 flex items-start gap-2 rounded-lg bg-teal-50 p-3">
//                   <CheckCircle2
//                     size={18}
//                     className="mt-0.5 shrink-0 text-teal-600"
//                   />

//                   <p className="text-xs font-medium leading-relaxed text-teal-800">
//                     You have signed up as a confirmed volunteer for this
//                     initiative.
//                   </p>
//                 </div>

//                 {/* Joined Date */}
//                 <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
//                   <Clock size={16} className="text-teal-600" />

//                   <span className="font-semibold text-teal-700">
//                     Joined{" "}
//                     {new Date(booking.bookingDate).toLocaleDateString("en-US", {
//                       weekday: "short",
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-5 flex flex-col gap-3 sm:flex-row">
//                   {/* View Event */}
//                   <Link
//                     href={`/facilities/${booking.eventId}`}
//                     className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
//                   >
//                     View Event
//                     <ArrowRight size={18} />
//                   </Link>

//                   {/* Cancel Booking */}
//                   <button
//                     onClick={() => handleCancelBooking(booking._id)}
//                     disabled={cancellingId === booking._id}
//                     className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     {cancellingId === booking._id ? (
//                       <>
//                         <span className="loading loading-spinner loading-xs"></span>
//                         Cancelling...
//                       </>
//                     ) : (
//                       <>
//                         <Trash2 size={17} />
//                         Cancel
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JoinFacilitiesPage;
