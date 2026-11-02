"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  UserRound,
  ArrowRight,
  Tag,
  Search,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

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

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const EventCard = ({ events }: { events: TFormState[] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Category Filter
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "All" ||
      event.eventType?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#f8fafb] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-7 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CalendarDays size={14} />
              Future Community Drives
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Upcoming Events
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover verified volunteer initiatives scheduled for upcoming
              dates. Past events are automatically excluded so you can focus on
              active drives that need support.
            </p>
          </div>

          {/* Create Event Button */}
          <Link href={"/add-facilities"}>
            <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700">
              <PlusCircle size={18} />
              Create Event
            </button>
          </Link>
        </div>

        {/* Filter and Search Section */}
        <div className="my-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  activeCategory === category
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border-gray-200 bg-white text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full xl:max-w-xs">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search events or areas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
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
                    <UserRound
                      size={16}
                      className="shrink-0 text-emerald-600"
                    />

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
        ) : (
          /* Empty State */
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 text-center">
            <Search size={35} className="text-gray-400" />

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              No Events Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No events found in this category. Try another category or search
              something else.
            </p>

            <button
              onClick={() => {
                setActiveCategory("All");
                setSearch("");
              }}
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventCard;
