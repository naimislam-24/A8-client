// "use client";
// import { useSession } from "@/lib/auth-client";
// import { useEffect } from "react";
// // import { useEffect } from "react";

// const MyFacilitiesPage = () => {
//   const { data: session, isPending } = useSession();
//   if (isPending) {
//     <div className="">Loading...</div>;
//   }
//   const user = session?.user.email;
//   console.log(user);

//   useEffect(() => {
//     if (!user) {
//       return;
//     }
//     fetch(`${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/my-facilities/${user}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       });
//   }, [user]);

//   return (
//     <div>
//       <h1>my-facilities</h1>
//     </div>
//   );
// };

// export default MyFacilitiesPage;

"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  UserRound,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

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
      // setLoading(false);
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
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, isPending]);

  // Delete Facility
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this facility?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      setFacilities((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete facility!");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-500">
        Please login to see your facilities.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Manage Your Activities
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Facilities
          </h1>

          <p className="mt-3 text-gray-500">
            Manage all your created community activities in one place.
          </p>
        </div>

        {/* Empty State */}
        {facilities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-20 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              No Facilities Found!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              You havent created any facilities yet.
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Card Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={facility.thumbnail}
                    alt={facility.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                    {facility.eventType}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                    <CalendarDays size={15} />
                    {new Date(facility.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Title */}
                  <h2 className="mb-3 line-clamp-1 text-xl font-bold text-gray-900">
                    {facility.title}
                  </h2>

                  {/* Location */}
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={17} className="shrink-0 text-emerald-600" />
                    <span className="line-clamp-1">{facility.location}</span>
                  </div>

                  {/* Description */}
                  <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                    {facility.description}
                  </p>

                  <div className="mb-4 border-t border-gray-100" />

                  {/* Organizer Email */}
                  <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                    <UserRound
                      size={17}
                      className="shrink-0 text-emerald-600"
                    />
                    <span className="truncate">{facility.organizerEmail}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* View */}
                    <Link
                      href={`/facilities/${facility._id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-gray-100 px-2 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    {/* Edit */}
                    <Link
                      href={`/my-facilities/edit/${facility._id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 px-2 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(facility._id)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-2 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
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
