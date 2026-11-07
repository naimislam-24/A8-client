"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CircleDot,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Tag,
  Type as TypeIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const EVENT_TYPES = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const PHOTO_PRESETS = [
  {
    label: "Green Drive",
    url: "https://static.vecteezy.com/system/resources/thumbnails/082/974/013/small/people-hand-holding-trees-in-pot-before-planting-for-environmental-conservation-and-sustainable-future-community-service-reforestation-nature-care-and-teamwork-concept-photo.jpg",
  },
  {
    label: "Earth Care",
    url: "https://media.istockphoto.com/id/2168104632/photo/two-diverse-activists-working-together-to-plant-more-trees-and-greenery.jpg?s=612x612&w=0&k=20&c=Xy_96RWOUUX5tRrxJMWBdA8s1O9cBAM8A44GhAnqFO4=",
  },
  {
    label: "Sapling Aid",
    url: "https://static.vecteezy.com/system/resources/thumbnails/075/214/424/small/young-adults-volunteer-planting-trees-in-the-park-for-environmental-conservation-and-sustainable-future-community-service-reforestation-nature-care-and-teamwork-concept-photo.jpg",
  },
  {
    label: "Tree Relief",
    url: "https://media.istockphoto.com/id/554392773/photo/smiling-environmentalist-volunteers-planting-new-tree.jpg?s=612x612&w=0&k=20&c=NUpec2BXFtVo6t7vZ7jzgmwSfwbrWMgHbq0nLByRLuE=",
  },
];

type FormState = {
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

const initialForm: FormState = {
  title: "",
  eventType: "",
  date: "",
  location: "",
  thumbnail: "",
  description: "",
};

export default function AddFacilitiesPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    <div className="">Loading....</div>;
  }

  const user = session?.user;
  // console.log(user);

  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [organizerEmail, setOrganizerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const today = new Date().toISOString().split("T")[0];

  // Organizer email comes attached from login
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) setOrganizerEmail(email);
  }, []);

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) next.title = "Event Title is required";
    if (!form.eventType) next.eventType = "Event Type is required";
    if (!form.date) next.date = "Event Date is required";
    else if (form.date < today)
      next.date = "Date must be in the future (today or later)";

    if (!form.location.trim()) next.location = "Location / Venue is required";

    if (!form.thumbnail.trim())
      next.thumbnail = "Thumbnail Image URL is required";
    else if (!/^https?:\/\/\S+/.test(form.thumbnail.trim()))
      next.thumbnail = "Enter a valid URL (https://...)";

    if (!form.description.trim())
      next.description = "Event Description is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await getTokenFromClient();

    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            organizerEmail,
            creatorEmail: user?.email,
          }),
        },
      );

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      toast.success("Event published successfully!");
      setForm(initialForm);

      router.push("/facilities");
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to publish event",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Compact Input Styling
  const inputClass = (field: keyof FormState) =>
    `input input-bordered min-h-10 w-full rounded-lg border-gray-200 bg-gray-50 pl-10 text-sm transition-all duration-200 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
      errors[field] ? "border-red-400" : ""
    }`;

  const label = (text: string, field: keyof FormState) => (
    <label className="label pb-1" htmlFor={field}>
      <span className="text-sm font-semibold text-gray-800 dark:text-white">
        {text} <span className="text-red-500">*</span>
      </span>
    </label>
  );

  const fieldIcon = (icon: React.ReactNode) => (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 [&_svg]:size-4">
      {icon}
    </span>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/50 px-3 sm:px-5 dark:from-[#080d19] dark:via-[#0b1120] dark:to-[#0f2028]">
      {/* Main Container */}
      <div className="mx-auto max-w-2xl py-5 sm:py-7 md:py-9">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
        >
          <ArrowLeft className="size-4" />
          Back to Upcoming Events
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-lg shadow-gray-200/50 sm:p-6 md:p-7 dark:border-gray-700 dark:bg-[#11192c] dark:shadow-black/20">
          {/* Header */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
              <Sparkles className="size-4" />
              Social Service Drive
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Create a Community Event
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Organize a local relief effort, environmental cleanup, or
              community support drive.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 sm:space-y-4"
            noValidate
          >
            {/* Event Title */}
            <div>
              {label("Event Title", "title")}

              <div className="relative">
                {fieldIcon(<TypeIcon />)}

                <input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  className={`${inputClass("title")} dark:border-gray-700 dark:bg-[#0b1120] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-500 dark:focus:bg-[#0b1120]`}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>

              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Event Type + Event Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                {label("Event Type", "eventType")}

                <div className="relative">
                  {fieldIcon(<Tag />)}

                  <select
                    id="eventType"
                    className={`${inputClass("eventType")} appearance-none dark:border-gray-700 dark:bg-[#0b1120] dark:focus:border-teal-500 ${
                      form.eventType
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    value={form.eventType}
                    onChange={(e) => set("eventType", e.target.value)}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>

                    {EVENT_TYPES.map((t) => (
                      <option
                        key={t}
                        value={t}
                        className="bg-white text-gray-800 dark:bg-[#11192c] dark:text-white"
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.eventType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.eventType}
                  </p>
                )}
              </div>

              <div>
                {label("Event Date", "date")}

                <div className="relative">
                  {fieldIcon(<Calendar />)}

                  <input
                    id="date"
                    type="date"
                    min={today}
                    className={`${inputClass("date")} dark:border-gray-700 dark:bg-[#0b1120] dark:focus:border-teal-500 ${
                      form.date
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>

                <p className="mt-1.5 pl-1 text-xs text-gray-400 dark:text-gray-500">
                  Dates must be in the future (today or later)
                </p>

                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                )}
              </div>
            </div>

            {/* Location / Venue */}
            <div>
              {label("Location / Venue", "location")}

              <div className="relative">
                {fieldIcon(<MapPin />)}

                <input
                  id="location"
                  type="text"
                  placeholder="Enter location or venue"
                  className={`${inputClass("location")} dark:border-gray-700 dark:bg-[#0b1120] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-500`}
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>

              {errors.location && (
                <p className="mt-1 text-xs text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Thumbnail Image URL */}
            <div>
              {label("Thumbnail Image URL", "thumbnail")}

              <div className="relative">
                {fieldIcon(<ImageIcon />)}

                <input
                  id="thumbnail"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={`${inputClass("thumbnail")} dark:border-gray-700 dark:bg-[#0b1120] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-500`}
                  value={form.thumbnail}
                  onChange={(e) => set("thumbnail", e.target.value)}
                />
              </div>

              {errors.thumbnail && (
                <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Quick photo presets:</span>

                {PHOTO_PRESETS.map((preset, i) => (
                  <span key={preset.label}>
                    <button
                      type="button"
                      onClick={() => set("thumbnail", preset.url)}
                      className="font-medium text-teal-600 transition-colors hover:text-teal-800 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      {preset.label}
                    </button>

                    {i < PHOTO_PRESETS.length - 1 && (
                      <span className="ml-2">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Event Description */}
            <div>
              {label("Event Description", "description")}

              <textarea
                id="description"
                rows={4}
                placeholder="Describe the event, what volunteers will do, and what to bring..."
                className={`textarea textarea-bordered min-h-24 w-full rounded-lg border-gray-200 bg-gray-50 text-sm leading-relaxed transition-all duration-200 placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-[#0b1120] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-500 dark:focus:bg-[#0b1120] ${
                  errors.description ? "border-red-400" : ""
                }`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Status */}
            {status && (
              <div
                role="alert"
                className={`alert rounded-xl border text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-teal-800 dark:border-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-500/10 dark:text-red-300"
                }`}
              >
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn min-h-10 w-full rounded-lg border-0 bg-teal-600 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-11"
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Publishing...
                </>
              ) : (
                <>
                  <CircleDot className="size-4" />
                  Publish Event
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          Make a difference in your community, one event at a time.
        </p>
      </div>
    </div>
  );
}
