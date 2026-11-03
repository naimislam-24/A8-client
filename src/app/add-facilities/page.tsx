"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { use, useEffect, useState } from "react";
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
    label: "Winter Clothes",
    url: "https://picsum.photos/seed/winter-clothes/800/500",
  },
  {
    label: "Blanket Relief",
    url: "https://picsum.photos/seed/blanket-relief/800/500",
  },
  {
    label: "Cleanup",
    url: "https://picsum.photos/seed/community-cleanup/800/500",
  },
  {
    label: "Tree Plantation",
    url: "https://picsum.photos/seed/tree-plantation/800/500",
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

  // Organizer email comes attached from login (?email=... on the URL)
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
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            organizerEmail,
            creatorEmail: user?.email,
          }),
        },
      );
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      // setStatus({ type: "success", message: "Event published successfully!" });
      // setForm(initialForm);
      toast.success("Event published successfully!");
      setForm(initialForm);

      router.push("/facilities");

      // alert("Event Create Successfully!");
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to publish event",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `input input-bordered w-full bg-gray-50 rounded-xl border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 pl-10 ${
      errors[field] ? "border-red-400" : ""
    }`;

  const label = (text: string, field: keyof FormState) => (
    <label className="label pb-1.5" htmlFor={field}>
      <span className="font-bold text-gray-800 text-sm">
        {text} <span className="text-red-500">*</span>
      </span>
    </label>
  );

  const fieldIcon = (icon: React.ReactNode) => (
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none [&_svg]:size-4">
      {icon}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-sm mb-4"
        >
          <ArrowLeft className="size-4" /> Back to Upcoming Events
        </Link>

        <div className="bg-white rounded-3xl shadow-md p-6 md:p-10">
          <span className="badge bg-emerald-50 text-teal-700 border-0 gap-1.5 py-3 px-3 font-semibold">
            <Sparkles className="size-4" /> Social Service Drive
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
            Create a Community Event
          </h2>
          <p className="text-gray-500 mt-2">
            Organize a local relief effort, environmental cleanup, or community
            support drive.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            {/* Event Title */}
            <div>
              {label("Event Title", "title")}
              <div className="relative">
                {fieldIcon(<TypeIcon />)}
                <input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  className={inputClass("title")}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Event Type + Event Date */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                {label("Event Type", "eventType")}
                <div className="relative">
                  {fieldIcon(<Tag />)}
                  <select
                    id="eventType"
                    className={`${inputClass("eventType")} appearance-none ${
                      form.eventType ? "text-gray-800" : "text-gray-400"
                    }`}
                    value={form.eventType}
                    onChange={(e) => set("eventType", e.target.value)}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t} className="text-gray-800">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.eventType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventType}
                  </p>
                )}
              </div>

              <div>
                {label("Event Date", "date")}
                <div className="relative">
                  {fieldIcon(
                    <Calendar className="[&_svg]:pointer-events-none" />,
                  )}
                  <input
                    id="date"
                    type="date"
                    min={today}
                    className={`${inputClass("date")} ${
                      form.date ? "text-gray-800" : "text-gray-400"
                    }`}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>
                <p className="text-gray-500 text-sm mt-1.5 pl-1">
                  Dates must be in the future (today or later)
                </p>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
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
                  className={inputClass("location")}
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
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
                  className={inputClass("thumbnail")}
                  value={form.thumbnail}
                  onChange={(e) => set("thumbnail", e.target.value)}
                />
              </div>
              {errors.thumbnail && (
                <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
              )}
              <p className="text-sm mt-2 text-gray-500">
                Quick photo presets:{" "}
                {PHOTO_PRESETS.map((preset, i) => (
                  <span key={preset.label}>
                    <button
                      type="button"
                      onClick={() => set("thumbnail", preset.url)}
                      className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
                    >
                      {preset.label}
                    </button>
                    {i < PHOTO_PRESETS.length - 1 && (
                      <span className="mx-1.5">·</span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            {/* Event Description */}
            <div>
              {label("Event Description", "description")}
              <textarea
                id="description"
                rows={5}
                placeholder="Describe the event, what volunteers will do, and what to bring..."
                className={`textarea textarea-bordered w-full bg-gray-50 rounded-xl border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.description ? "border-red-400" : ""
                }`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Organizer Email */}
            {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
              <span className="font-semibold text-gray-800 text-sm">
                Organizer Email attached:
              </span>
              <span className="font-bold text-gray-900 text-sm">
                {organizerEmail || "—"}
              </span>
            </div> */}

            {status && (
              <div
                role="alert"
                className={`alert rounded-xl ${
                  status.type === "success"
                    ? "bg-emerald-50 text-teal-800 border-emerald-200"
                    : "bg-red-50 text-red-700 border-red-200"
                } border`}
              >
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 text-base"
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Publishing...
                </>
              ) : (
                <>
                  <CircleDot className="size-4" /> Publish Event
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
