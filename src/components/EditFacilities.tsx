// "use client";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Pencil } from "lucide-react";

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
//   _id: string;
//   title: string;
//   eventType: string;
//   date: string;
//   location: string;
//   thumbnail: string;
//   description: string;
// };

// // const initialForm: FormState = {
// //   title: "",
// //   eventType: "",
// //   date: "",
// //   location: "",
// //   thumbnail: "",
// //   description: "",
// // };

// const EditFacilities = ({ facility }) => {
//   console.log("FormData", facility);

//   const { data: session, isPending } = useSession();
//   if (isPending) {
//     <div className="">Loading....</div>;
//   }
//   const user = session?.user;
//   // console.log(user);

//   const router = useRouter();
//   const [form, setForm] = useState<FormState>(facility);
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
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { _id, ...updatedData } = form;

//     setStatus(null);
//     if (!validate()) return;

//     setSubmitting(true);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${facility._id}`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...updatedData,
//             organizerEmail,
//             creatorEmail: user?.email,
//           }),
//         },
//       );
//       if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//       // setStatus({ type: "success", message: "Event published successfully!" });
//       // setForm(initialForm);
//       toast.success("Event published successfully!");
//       // setForm(initialForm);

//       router.push("/my-facilities");

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
//   // console.log(facilities);

//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger>
//           <div
//             // href={`/my-facilities/edit/`}
//             className="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-8 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
//             // className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
//             // className="relative left-3 sm:left-4 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
//             // className="relative left-5 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
//           >
//             <Pencil size={15} />
//             Edit
//           </div>
//         </DialogTrigger>
//         <DialogContent className="min-w-xl">
//           <DialogHeader>
//             <DialogTitle>Edit From</DialogTitle>
//             <DialogDescription>
//               <div className="bg-white rounded-3xl shadow-md p-6 md:p-10">
//                 <form
//                   onSubmit={handleSubmit}
//                   className="mt-8 space-y-5"
//                   noValidate
//                 >
//                   {/* Event Title */}
//                   <div>
//                     {label("Event Title", "title")}
//                     <div className="relative">
//                       {fieldIcon(<TypeIcon />)}
//                       <input
//                         id="title"
//                         type="text"
//                         placeholder="Enter event title"
//                         className={inputClass("title")}
//                         value={form.title}
//                         onChange={(e) => set("title", e.target.value)}
//                       />
//                     </div>
//                     {errors.title && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.title}
//                       </p>
//                     )}
//                   </div>

//                   {/* Event Type + Event Date */}
//                   <div className="grid md:grid-cols-2 gap-5">
//                     <div>
//                       {label("Event Type", "eventType")}
//                       <div className="relative">
//                         {fieldIcon(<Tag />)}
//                         <select
//                           id="eventType"
//                           className={`${inputClass("eventType")} appearance-none ${
//                             form.eventType ? "text-gray-800" : "text-gray-400"
//                           }`}
//                           value={form.eventType}
//                           onChange={(e) => set("eventType", e.target.value)}
//                         >
//                           <option value="" disabled>
//                             Select event type
//                           </option>
//                           {EVENT_TYPES.map((t) => (
//                             <option key={t} value={t} className="text-gray-800">
//                               {t}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       {errors.eventType && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.eventType}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       {label("Event Date", "date")}
//                       <div className="relative">
//                         {fieldIcon(
//                           <Calendar className="[&_svg]:pointer-events-none" />,
//                         )}
//                         <input
//                           id="date"
//                           type="date"
//                           min={today}
//                           className={`${inputClass("date")} ${
//                             form.date ? "text-gray-800" : "text-gray-400"
//                           }`}
//                           value={form.date}
//                           onChange={(e) => set("date", e.target.value)}
//                         />
//                       </div>
//                       <p className="text-gray-500 text-sm mt-1.5 pl-1">
//                         Dates must be in the future (today or later)
//                       </p>
//                       {errors.date && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.date}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Location / Venue */}
//                   <div>
//                     {label("Location / Venue", "location")}
//                     <div className="relative">
//                       {fieldIcon(<MapPin />)}
//                       <input
//                         id="location"
//                         type="text"
//                         placeholder="Enter location or venue"
//                         className={inputClass("location")}
//                         value={form.location}
//                         onChange={(e) => set("location", e.target.value)}
//                       />
//                     </div>
//                     {errors.location && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.location}
//                       </p>
//                     )}
//                   </div>

//                   {/* Thumbnail Image URL */}
//                   <div>
//                     {label("Thumbnail Image URL", "thumbnail")}
//                     <div className="relative">
//                       {fieldIcon(<ImageIcon />)}
//                       <input
//                         id="thumbnail"
//                         type="url"
//                         placeholder="https://example.com/image.jpg"
//                         className={inputClass("thumbnail")}
//                         value={form.thumbnail}
//                         onChange={(e) => set("thumbnail", e.target.value)}
//                       />
//                     </div>
//                     {errors.thumbnail && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.thumbnail}
//                       </p>
//                     )}
//                     <p className="text-sm mt-2 text-gray-500">
//                       Quick photo presets:{" "}
//                       {PHOTO_PRESETS.map((preset, i) => (
//                         <span key={preset.label}>
//                           <button
//                             type="button"
//                             onClick={() => set("thumbnail", preset.url)}
//                             className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
//                           >
//                             {preset.label}
//                           </button>
//                           {i < PHOTO_PRESETS.length - 1 && (
//                             <span className="mx-1.5">·</span>
//                           )}
//                         </span>
//                       ))}
//                     </p>
//                   </div>

//                   {/* Event Description */}
//                   <div>
//                     {label("Event Description", "description")}
//                     <textarea
//                       id="description"
//                       rows={5}
//                       placeholder="Describe the event, what volunteers will do, and what to bring..."
//                       className={`textarea textarea-bordered w-full bg-gray-50 rounded-xl border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
//                         errors.description ? "border-red-400" : ""
//                       }`}
//                       value={form.description}
//                       onChange={(e) => set("description", e.target.value)}
//                     />
//                     {errors.description && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* Organizer Email */}
//                   {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
//                         <span className="font-semibold text-gray-800 text-sm">
//                           Organizer Email attached:
//                         </span>
//                         <span className="font-bold text-gray-900 text-sm">
//                           {organizerEmail || "—"}
//                         </span>
//                       </div> */}

//                   {status && (
//                     <div
//                       role="alert"
//                       className={`alert rounded-xl ${
//                         status.type === "success"
//                           ? "bg-emerald-50 text-teal-800 border-emerald-200"
//                           : "bg-red-50 text-red-700 border-red-200"
//                       } border`}
//                     >
//                       <span>{status.message}</span>
//                     </div>
//                   )}

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="btn w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 text-base"
//                   >
//                     {submitting ? (
//                       <>
//                         <span className="loading loading-spinner loading-sm"></span>{" "}
//                         Publishing...
//                       </>
//                     ) : (
//                       <>
//                         <CircleDot className="size-4" /> Publish Event
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default EditFacilities;

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pencil,
  Calendar,
  CircleDot,
  Image as ImageIcon,
  MapPin,
  Tag,
  Type as TypeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormState = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

type TFacility = FormState & {
  organizerEmail: string;
};

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

const EditFacilities = ({ facility }: { facility: TFacility }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    ...facility,
    date: facility.date?.split("T")[0] || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [organizerEmail, setOrganizerEmail] = useState(
    facility.organizerEmail || "",
  );

  const [submitting, setSubmitting] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) setOrganizerEmail(email);
  }, []);

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) next.title = "Event Title is required";
    if (!form.eventType) next.eventType = "Event Type is required";

    if (!form.date) {
      next.date = "Event Date is required";
    } else if (form.date < today) {
      next.date = "Date must be in the future (today or later)";
    }

    if (!form.location.trim()) {
      next.location = "Location / Venue is required";
    }

    if (!form.thumbnail.trim()) {
      next.thumbnail = "Thumbnail Image URL is required";
    } else if (!/^https?:\/\/\S+/.test(form.thumbnail.trim())) {
      next.thumbnail = "Enter a valid URL (https://...)";
    }

    if (!form.description.trim()) {
      next.description = "Event Description is required";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(null);

    if (!validate()) return;

    const { _id, ...updatedData } = form;

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${facility._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedData,
            organizerEmail,
            creatorEmail: user?.email,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      toast.success("Event updated successfully!");

      router.push("/my-facilities");
      router.refresh();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to update event",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `input input-bordered w-full min-w-0 rounded-xl border-gray-200 bg-gray-50 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
      errors[field] ? "border-red-400" : ""
    }`;

  const label = (text: string, field: keyof FormState) => (
    <label className="label pb-1.5" htmlFor={field}>
      <span className="text-sm font-bold text-gray-800">
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
    <Dialog>
      {/* Edit Button */}
      <DialogTrigger>
        <button
          type="button"
          className="flex h-10 w-full min-w-0 items-center justify-center gap-1 rounded-xl bg-indigo-50 px-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 sm:gap-1.5 sm:px-2"
          // className="flex h-10 w-full items-center justify-center gap-1 rounded-xl bg-indigo-50 px-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
        >
          <Pencil size={14} />
          Edit
        </button>
      </DialogTrigger>

      {/* Edit Modal */}
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#022C22] sm:text-2xl">
            Edit Event
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500">
            Update your community event information below.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full rounded-2xl bg-white py-2 sm:p-2">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Event Type + Date */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                {label("Event Type", "eventType")}

                <div className="relative">
                  {fieldIcon(<Tag />)}

                  <select
                    id="eventType"
                    className={`${inputClass("eventType")} appearance-none`}
                    value={form.eventType}
                    onChange={(e) => set("eventType", e.target.value)}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>

                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.eventType && (
                  <p className="mt-1 text-sm text-red-500">
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
                    className={inputClass("date")}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>

                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>
            </div>

            {/* Location */}
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
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Thumbnail */}
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
                <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
              )}

              <div className="mt-3">
                <p className="mb-2 text-xs font-semibold text-gray-500">
                  Quick photo presets:
                </p>

                <div className="flex flex-wrap gap-2">
                  {PHOTO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => set("thumbnail", preset.url)}
                      className="rounded-lg bg-teal-50 px-2.5 py-1.5 text-xs font-medium text-teal-700 transition hover:bg-teal-100"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              {label("Event Description", "description")}

              <textarea
                id="description"
                rows={5}
                placeholder="Describe the event, what volunteers will do, and what to bring..."
                className={`textarea textarea-bordered w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.description ? "border-red-400" : ""
                }`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Status */}
            {status && (
              <div
                role="alert"
                className={`rounded-xl border p-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-teal-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Updating...
                </>
              ) : (
                <>
                  <CircleDot size={17} />
                  Update Event
                </>
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFacilities;
