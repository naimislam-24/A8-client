"use client";

import { useSession } from "@/lib/auth-client";
import { MapPin, CalendarDays, Users, Mail, Tag, Share2 } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

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

const BookCard = ({ event }: { event: TEvent }) => {
  const { data: session, isPending } = useSession();

  const email = session?.user?.email;
  console.log(email);

  const [loading, setLoading] = useState(false);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    const bookingData = {
      ...event,
      eventId: event._id,
      bookingDate: new Date().toISOString(),
      userEmail: email,
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      const bookingRes = await res.json();

      if (!res.ok) {
        throw new Error(bookingRes.message || "Booking failed");
      }
      // toast.success("Booking successful!");
      toast.success("Booking successful!", {
        style: {
          background: "#0F766E",
          color: "#FFFFFF",
          border: "1px solid #115E59",
          fontWeight: "600",
        },
      });

      // console.log("Booking Response:", bookingRes);

      // alert("Booking successful!");
    } catch (error) {
      console.error("Booking error:", error);
      // alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    <div className="">Loading...</div>;
  }

  return (
    // <div>
    //   <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    //   <aside className="lg:col-span-1">
    //     <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
    //       <div className="mb-5 flex items-center justify-between">
    //         <h2 className="text-xl font-bold text-slate-900">
    //           Join This Event
    //         </h2>

    //         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
    //           <Users size={20} />
    //         </div>
    //       </div>

    //       <p className="mb-6 text-sm leading-6 text-slate-500">
    //         Be a part of this event and make a positive difference in the
    //         community.
    //       </p>

    //       <div className="mb-6 space-y-4 border-y border-slate-100 py-5">
    //         <div className="flex items-center gap-3 text-sm text-slate-600">
    //           <CalendarDays size={18} className="text-emerald-600" />
    //           <span>{formattedDate}</span>
    //         </div>

    //         <div className="flex items-center gap-3 text-sm text-slate-600">
    //           <MapPin size={18} className="text-emerald-600" />
    //           <span>{event.location}</span>
    //         </div>

    //         <div className="flex items-center gap-3 text-sm text-slate-600">
    //           <Tag size={18} className="text-emerald-600" />
    //           <span>{event.eventType}</span>
    //         </div>
    //       </div>

    //       <form onSubmit={handleBooking}>
    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
    //         >
    //           <Users size={19} />
    //           {loading ? "Booking..." : "Join Event"}
    //         </button>
    //       </form>

    //       <button
    //         type="button"
    //         className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
    //       >
    //         <Share2 size={18} />
    //         Share Event
    //       </button>

    //       {event.organizerEmail && (
    //         <div className="mt-6 border-t border-slate-100 pt-5">
    //           <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
    //             Contact Organizer
    //           </p>

    //           <a
    //             href={`mailto:${event.organizerEmail}`}
    //             className="flex items-center gap-2 break-all text-sm font-medium text-emerald-600 hover:underline"
    //           >
    //             <Mail size={17} />
    //             {event.organizerEmail}
    //           </a>
    //         </div>
    //       )}
    //     </div>
    //   </aside>
    // </div>

    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <aside className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#11192c] sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Join This Event
            </h2>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Users size={20} />
            </div>
          </div>

          <p className="mb-6 text-sm leading-6 text-slate-500 dark:text-gray-400">
            Be a part of this event and make a positive difference in the
            community.
          </p>

          <div className="mb-6 space-y-4 border-y border-slate-100 py-5 dark:border-gray-700">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
              <CalendarDays
                size={18}
                className="text-emerald-600 dark:text-emerald-400"
              />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
              <MapPin
                size={18}
                className="text-emerald-600 dark:text-emerald-400"
              />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
              <Tag
                size={18}
                className="text-emerald-600 dark:text-emerald-400"
              />
              <span>{event.eventType}</span>
            </div>
          </div>

          <form onSubmit={handleBooking}>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Users size={19} />
              {loading ? "Booking..." : "Join Event"}
            </button>
          </form>

          <button
            type="button"
            // className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-[#115E59] hover:bg-emerald-50 hover:text-emerald-700 dark:border-gray-700 dark:bg-[#0b1120] dark:text-gray-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#0F766E] bg-white px-5 py-3 font-semibold text-[#0F766E] transition hover:bg-[#115E59] hover:bg-[#0F766E] hover:text-white dark:border-[#0F766E] dark:bg-[#0b1120] dark:text-[#0F766E] dark:hover:border-[#0F766E] dark:hover:bg-[#0F766E]/10 dark:hover:text-[#0F766E]"
          >
            <Share2 size={18} />
            Share Event
          </button>

          {event.organizerEmail && (
            <div className="mt-6 border-t border-slate-100 pt-5 dark:border-gray-700">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500">
                Contact Organizer
              </p>

              <a
                href={`mailto:${event.organizerEmail}`}
                className="flex items-center gap-2 break-all text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                <Mail size={17} />
                {event.organizerEmail}
              </a>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default BookCard;
