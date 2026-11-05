// "use client";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { use, useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Calendar,
//   CircleDot,
//   Image as ImageIcon,
//   MapPin,
//   Sparkles,
//   Tag,
//   Type as TypeIcon,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/auth-client";

// const EVENT_TYPES = [
//   "Donation",
//   "Cleanup",
//   "Plantation",
//   "Winter Relief",
//   "Food Drive",
//   "Health Camp",
//   "Education",
// ];

// const PHOTO_PRESETS = [
//   {
//     label: "Winter Clothes",
//     url: "https://picsum.photos/seed/winter-clothes/800/500",
//   },
//   {
//     label: "Blanket Relief",
//     url: "https://picsum.photos/seed/blanket-relief/800/500",
//   },
//   {
//     label: "Cleanup",
//     url: "https://picsum.photos/seed/community-cleanup/800/500",
//   },
//   {
//     label: "Tree Plantation",
//     url: "https://picsum.photos/seed/tree-plantation/800/500",
//   },
// ];

// type FormState = {
//   title: string;
//   eventType: string;
//   date: string;
//   location: string;
//   thumbnail: string;
//   description: string;
// };

// const initialForm: FormState = {
//   title: "",
//   eventType: "",
//   date: "",
//   location: "",
//   thumbnail: "",
//   description: "",
// };

// export default function AddFacilitiesPage() {
//   const { data: session, isPending } = useSession();
//   if (isPending) {
//     <div className="">Loading....</div>;
//   }
//   const user = session?.user;
//   // console.log(user);

//   const router = useRouter();
//   const [form, setForm] = useState<FormState>(initialForm);
//   const [errors, setErrors] = useState<
//     Partial<Record<keyof FormState, string>>
//   >({});
//   const [organizerEmail, setOrganizerEmail] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [status, setStatus] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const today = new Date().toISOString().split("T")[0];

//   // Organizer email comes attached from login (?email=... on the URL)
//   useEffect(() => {
//     const email = new URLSearchParams(window.location.search).get("email");
//     if (email) setOrganizerEmail(email);
//   }, []);

//   const set = (field: keyof FormState, value: string) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: undefined }));
//   };

//   const validate = (): boolean => {
//     const next: Partial<Record<keyof FormState, string>> = {};

//     if (!form.title.trim()) next.title = "Event Title is required";
//     if (!form.eventType) next.eventType = "Event Type is required";
//     if (!form.date) next.date = "Event Date is required";
//     else if (form.date < today)
//       next.date = "Date must be in the future (today or later)";
//     if (!form.location.trim()) next.location = "Location / Venue is required";
//     if (!form.thumbnail.trim())
//       next.thumbnail = "Thumbnail Image URL is required";
//     else if (!/^https?:\/\/\S+/.test(form.thumbnail.trim()))
//       next.thumbnail = "Enter a valid URL (https://...)";
//     if (!form.description.trim())
//       next.description = "Event Description is required";

//     setErrors(next);
//     return Object.keys(next).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus(null);
//     if (!validate()) return;

//     setSubmitting(true);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...form,
//             organizerEmail,
//             creatorEmail: user?.email,
//           }),
//         },
//       );
//       if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//       // setStatus({ type: "success", message: "Event published successfully!" });
//       // setForm(initialForm);
//       toast.success("Event published successfully!");
//       setForm(initialForm);

//       router.push("/facilities");

//       // alert("Event Create Successfully!");
//     } catch (err) {
//       setStatus({
//         type: "error",
//         message: err instanceof Error ? err.message : "Failed to publish event",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const inputClass = (field: keyof FormState) =>
//     `input input-bordered w-full bg-gray-50 rounded-xl border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 pl-10 ${
//       errors[field] ? "border-red-400" : ""
//     }`;

//   const label = (text: string, field: keyof FormState) => (
//     <label className="label pb-1.5" htmlFor={field}>
//       <span className="font-bold text-gray-800 text-sm">
//         {text} <span className="text-red-500">*</span>
//       </span>
//     </label>
//   );

//   const fieldIcon = (icon: React.ReactNode) => (
//     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none [&_svg]:size-4">
//       {icon}
//     </span>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Toast Notification */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         theme="colored"
//       />
//       <div className="max-w-3xl mx-auto px-4 py-6">
//         <Link
//           href="/"
//           className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-sm mb-4"
//         >
//           <ArrowLeft className="size-4" /> Back to Upcoming Events
//         </Link>

//         <div className="bg-white rounded-3xl shadow-md p-6 md:p-10">
//           <span className="badge bg-emerald-50 text-teal-700 border-0 gap-1.5 py-3 px-3 font-semibold">
//             <Sparkles className="size-4" /> Social Service Drive
//           </span>

//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
//             Create a Community Event
//           </h2>
//           <p className="text-gray-500 mt-2">
//             Organize a local relief effort, environmental cleanup, or community
//             support drive.
//           </p>

//           <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
//             {/* Event Title */}
//             <div>
//               {label("Event Title", "title")}
//               <div className="relative">
//                 {fieldIcon(<TypeIcon />)}
//                 <input
//                   id="title"
//                   type="text"
//                   placeholder="Enter event title"
//                   className={inputClass("title")}
//                   value={form.title}
//                   onChange={(e) => set("title", e.target.value)}
//                 />
//               </div>
//               {errors.title && (
//                 <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//               )}
//             </div>

//             {/* Event Type + Event Date */}
//             <div className="grid md:grid-cols-2 gap-5">
//               <div>
//                 {label("Event Type", "eventType")}
//                 <div className="relative">
//                   {fieldIcon(<Tag />)}
//                   <select
//                     id="eventType"
//                     className={`${inputClass("eventType")} appearance-none ${
//                       form.eventType ? "text-gray-800" : "text-gray-400"
//                     }`}
//                     value={form.eventType}
//                     onChange={(e) => set("eventType", e.target.value)}
//                   >
//                     <option value="" disabled>
//                       Select event type
//                     </option>
//                     {EVENT_TYPES.map((t) => (
//                       <option key={t} value={t} className="text-gray-800">
//                         {t}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.eventType && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.eventType}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 {label("Event Date", "date")}
//                 <div className="relative">
//                   {fieldIcon(
//                     <Calendar className="[&_svg]:pointer-events-none" />,
//                   )}
//                   <input
//                     id="date"
//                     type="date"
//                     min={today}
//                     className={`${inputClass("date")} ${
//                       form.date ? "text-gray-800" : "text-gray-400"
//                     }`}
//                     value={form.date}
//                     onChange={(e) => set("date", e.target.value)}
//                   />
//                 </div>
//                 <p className="text-gray-500 text-sm mt-1.5 pl-1">
//                   Dates must be in the future (today or later)
//                 </p>
//                 {errors.date && (
//                   <p className="text-red-500 text-sm mt-1">{errors.date}</p>
//                 )}
//               </div>
//             </div>

//             {/* Location / Venue */}
//             <div>
//               {label("Location / Venue", "location")}
//               <div className="relative">
//                 {fieldIcon(<MapPin />)}
//                 <input
//                   id="location"
//                   type="text"
//                   placeholder="Enter location or venue"
//                   className={inputClass("location")}
//                   value={form.location}
//                   onChange={(e) => set("location", e.target.value)}
//                 />
//               </div>
//               {errors.location && (
//                 <p className="text-red-500 text-sm mt-1">{errors.location}</p>
//               )}
//             </div>

//             {/* Thumbnail Image URL */}
//             <div>
//               {label("Thumbnail Image URL", "thumbnail")}
//               <div className="relative">
//                 {fieldIcon(<ImageIcon />)}
//                 <input
//                   id="thumbnail"
//                   type="url"
//                   placeholder="https://example.com/image.jpg"
//                   className={inputClass("thumbnail")}
//                   value={form.thumbnail}
//                   onChange={(e) => set("thumbnail", e.target.value)}
//                 />
//               </div>
//               {errors.thumbnail && (
//                 <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
//               )}
//               <p className="text-sm mt-2 text-gray-500">
//                 Quick photo presets:{" "}
//                 {PHOTO_PRESETS.map((preset, i) => (
//                   <span key={preset.label}>
//                     <button
//                       type="button"
//                       onClick={() => set("thumbnail", preset.url)}
//                       className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
//                     >
//                       {preset.label}
//                     </button>
//                     {i < PHOTO_PRESETS.length - 1 && (
//                       <span className="mx-1.5">·</span>
//                     )}
//                   </span>
//                 ))}
//               </p>
//             </div>

//             {/* Event Description */}
//             <div>
//               {label("Event Description", "description")}
//               <textarea
//                 id="description"
//                 rows={5}
//                 placeholder="Describe the event, what volunteers will do, and what to bring..."
//                 className={`textarea textarea-bordered w-full bg-gray-50 rounded-xl border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
//                   errors.description ? "border-red-400" : ""
//                 }`}
//                 value={form.description}
//                 onChange={(e) => set("description", e.target.value)}
//               />
//               {errors.description && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.description}
//                 </p>
//               )}
//             </div>

//             {/* Organizer Email */}
//             {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
//               <span className="font-semibold text-gray-800 text-sm">
//                 Organizer Email attached:
//               </span>
//               <span className="font-bold text-gray-900 text-sm">
//                 {organizerEmail || "—"}
//               </span>
//             </div> */}

//             {status && (
//               <div
//                 role="alert"
//                 className={`alert rounded-xl ${
//                   status.type === "success"
//                     ? "bg-emerald-50 text-teal-800 border-emerald-200"
//                     : "bg-red-50 text-red-700 border-red-200"
//                 } border`}
//               >
//                 <span>{status.message}</span>
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="btn w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 text-base"
//             >
//               {submitting ? (
//                 <>
//                   <span className="loading loading-spinner loading-sm"></span>{" "}
//                   Publishing...
//                 </>
//               ) : (
//                 <>
//                   <CircleDot className="size-4" /> Publish Event
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

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
      <span className="text-sm font-semibold text-gray-800">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/50 px-3 sm:px-5">
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

      {/* Main Container */}
      <div className="mx-auto max-w-2xl py-5 sm:py-7 md:py-9">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
        >
          <ArrowLeft className="size-4" />
          Back to Upcoming Events
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-lg shadow-gray-200/50 sm:p-6 md:p-7">
          {/* Header */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
              <Sparkles className="size-4" />
              Social Service Drive
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Create a Community Event
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
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
                  className={inputClass("title")}
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
                    className={`${inputClass("date")} ${
                      form.date ? "text-gray-800" : "text-gray-400"
                    }`}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>

                <p className="mt-1.5 pl-1 text-xs text-gray-400">
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
                  className={inputClass("location")}
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
                  className={inputClass("thumbnail")}
                  value={form.thumbnail}
                  onChange={(e) => set("thumbnail", e.target.value)}
                />
              </div>

              {errors.thumbnail && (
                <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                <span className="font-semibold">Quick photo presets:</span>

                {PHOTO_PRESETS.map((preset, i) => (
                  <span key={preset.label}>
                    <button
                      type="button"
                      onClick={() => set("thumbnail", preset.url)}
                      className="font-medium text-teal-600 transition-colors hover:text-teal-800 hover:underline"
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
                className={`textarea textarea-bordered min-h-24 w-full rounded-lg border-gray-200 bg-gray-50 text-sm leading-relaxed transition-all duration-200 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
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
                    ? "border-emerald-200 bg-emerald-50 text-teal-800"
                    : "border-red-200 bg-red-50 text-red-700"
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

        <p className="mt-4 text-center text-xs text-gray-400">
          Make a difference in your community, one event at a time.
        </p>
      </div>
    </div>
  );
}
