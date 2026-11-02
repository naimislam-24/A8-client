"use client";

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
          body: JSON.stringify({ ...form, organizerEmail }),
        },
      );
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setStatus({ type: "success", message: "Event published successfully!" });
      setForm(initialForm);
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
            <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
              <span className="font-semibold text-gray-800 text-sm">
                Organizer Email attached:
              </span>
              <span className="font-bold text-gray-900 text-sm">
                {organizerEmail || "—"}
              </span>
            </div>

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

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Send, Trash2 } from "lucide-react";
// // import { CalendarDays, ImagePlus, MapPin, Send, Trash2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// // import { getTokenFromClient } from "@/lib/getTokenFromClient";

// const eventTypes = [
//   "Donation",
//   "Cleanup",
//   "Plantation",
//   "Winter Relief",
//   "Food Drive",
//   "Health Camp",
//   "Education",
// ];

// const initialForm = {
//   eventTitle: "",
//   eventType: "",
//   eventDate: "",
//   location: "",
//   thumbnailUrl: "",
//   description: "",
// };

// export default function AddEventPage() {
//   const router = useRouter();

//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const update = (field: keyof typeof form, value: string) =>
//     setForm((current) => ({
//       ...current,
//       [field]: value,
//     }));

//   // Get today's local date
//   const today = new Date();
//   const minDate = [
//     today.getFullYear(),
//     String(today.getMonth() + 1).padStart(2, "0"),
//     String(today.getDate()).padStart(2, "0"),
//   ].join("-");

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       // const token = await getTokenFromClient();

//       const res = await fetch("http://localhost:5000/add-event", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message || "Failed to publish event");
//       }

//       console.log(result);

//       setForm(initialForm);
//       router.push("/upcoming-events");
//       router.refresh();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#f8fafc] px-4 py-10 md:px-6 md:py-16">
//       <div className="mx-auto max-w-3xl">
//         {/* Back Button */}
//         <Button
//           type="button"
//           variant="ghost"
//           onClick={() => router.push("/upcoming-events")}
//           className="mb-6 -ml-3 text-sm text-muted-foreground"
//         >
//           ← Back to Upcoming Events
//         </Button>

//         {/* Form Card */}
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
//           {/* Header */}
//           <div className="mb-9">
//             <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
//               <span>✦</span>
//               Social Service Drive
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
//               Create a Community Event
//             </h1>

//             <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
//               Organize a local relief effort, environmental cleanup, or
//               community support drive.
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div className="grid gap-6">
//               {/* Event Title */}
//               <div className="grid gap-2">
//                 <Label htmlFor="eventTitle">
//                   Event Title <span className="text-red-500">*</span>
//                 </Label>

//                 <Input
//                   id="eventTitle"
//                   placeholder="e.g. Winter Clothes Distribution"
//                   value={form.eventTitle}
//                   onChange={(event) => update("eventTitle", event.target.value)}
//                   required
//                   className="h-12"
//                 />
//               </div>

//               {/* Event Type + Event Date */}
//               <div className="grid gap-6 sm:grid-cols-2">
//                 {/* Event Type */}
//                 <div className="grid gap-2">
//                   <Label>
//                     Event Type <span className="text-red-500">*</span>
//                   </Label>

//                   <Select
//                     value={form.eventType}
//                     onValueChange={(value) => update("eventType", value)}
//                   >
//                     <SelectTrigger className="h-12 w-full">
//                       <SelectValue placeholder="Select event type" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       {eventTypes.map((type) => (
//                         <SelectItem key={type} value={type}>
//                           {type}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Event Date */}
//                 <div className="grid gap-2">
//                   <Label htmlFor="eventDate">
//                     Event Date <span className="text-red-500">*</span>
//                   </Label>

//                   <div className="relative">
//                     <Input
//                       id="eventDate"
//                       type="date"
//                       min={minDate}
//                       value={form.eventDate}
//                       onChange={(event) =>
//                         update("eventDate", event.target.value)
//                       }
//                       required
//                       className="h-12 w-full"
//                     />
//                   </div>

//                   <p className="text-xs text-slate-400">
//                     Dates must be in the future (today or later).
//                   </p>
//                 </div>
//               </div>

//               {/* Location */}
//               <div className="grid gap-2">
//                 <Label htmlFor="location">
//                   Location / Venue <span className="text-red-500">*</span>
//                 </Label>

//                 <Input
//                   id="location"
//                   placeholder="e.g. Mirpur 10, Dhaka"
//                   value={form.location}
//                   onChange={(event) => update("location", event.target.value)}
//                   required
//                   className="h-12"
//                 />
//               </div>

//               {/* Thumbnail Image URL */}
//               <div className="grid gap-2">
//                 <Label htmlFor="thumbnailUrl">
//                   Thumbnail Image URL <span className="text-red-500">*</span>
//                 </Label>

//                 <Input
//                   id="thumbnailUrl"
//                   type="url"
//                   placeholder="https://example.com/image.jpg"
//                   value={form.thumbnailUrl}
//                   onChange={(event) =>
//                     update("thumbnailUrl", event.target.value)
//                   }
//                   required
//                   className="h-12"
//                 />

//                 {/* Quick Image Presets */}
//                 <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-slate-400">
//                   <span>Quick photo presets:</span>

//                   {[
//                     "Winter Clothes",
//                     "Blanket Relief",
//                     "Cleanup",
//                     "Tree Plantation",
//                   ].map((preset, index) => (
//                     <span key={preset} className="inline-flex items-center">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           update(
//                             "thumbnailUrl",
//                             [
//                               "https://images.unsplash.com/photo-1489493512598-d08130f49bea",
//                               "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
//                               "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
//                               "https://images.unsplash.com/photo-1448375240586-882707db888b",
//                             ][index],
//                           )
//                         }
//                         className="text-emerald-700 hover:underline"
//                       >
//                         {preset}
//                       </button>
//                       {index !== 3 && <span className="ml-2">•</span>}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Event Description */}
//               <div className="grid gap-2">
//                 <Label htmlFor="description">
//                   Event Description <span className="text-red-500">*</span>
//                 </Label>

//                 <Textarea
//                   id="description"
//                   placeholder="Describe your event, its purpose, activities, and how people can participate..."
//                   value={form.description}
//                   onChange={(event) =>
//                     update("description", event.target.value)
//                   }
//                   required
//                   className="min-h-32 resize-y"
//                 />
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
//                 {error}
//               </p>
//             )}

//             {/* Actions */}
//             <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => router.push("/upcoming-events")}
//                 className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
//               >
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Cancel
//               </Button>

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="h-12 bg-emerald-600 px-7 text-white hover:bg-emerald-700"
//               >
//                 <Send className="mr-2 h-4 w-4" />
//                 {loading ? "Publishing..." : "Publish Event"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }
