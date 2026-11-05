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
        >
          <Pencil size={14} />
          Edit
        </button>
      </DialogTrigger>

      {/* Edit Modal */}

      <DialogContent className="max-h-[82vh] w-[calc(100%-16px)] max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:w-[94vw] sm:rounded-3xl sm:p-6">
        {/* <DialogContent className="!fixed !left-1/2 !top-1/2 !w-[80vw] !max-w-[1100px] !translate-x-[-50%] !translate-y-[-50%] max-h-[82vh] overflow-y-auto overscroll-contain rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:rounded-3xl sm:p-7"> */}
        <DialogHeader className="mb-4 space-y-1.5 border-b border-gray-100 pb-4">
          <DialogTitle className="text-xl font-extrabold tracking-tight text-[#022C22] sm:text-2xl">
            Edit Event
          </DialogTitle>

          <DialogDescription className="text-xs leading-relaxed text-gray-500 sm:text-sm">
            Update your community event information below.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Event Title */}
            <div>
              {label("Event Title", "title")}

              <div className="relative">
                {fieldIcon(<TypeIcon />)}

                <input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  className={`${inputClass("title")} rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm transition-all duration-200 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>

              {errors.title && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Event Type + Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Event Type */}
              <div>
                {label("Event Type", "eventType")}

                <div className="relative">
                  {fieldIcon(<Tag />)}

                  <select
                    id="eventType"
                    className={`${inputClass("eventType")} appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm transition-all duration-200 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
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
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.eventType}
                  </p>
                )}
              </div>

              {/* Event Date */}
              <div>
                {label("Event Date", "date")}

                <div className="relative">
                  {fieldIcon(<Calendar />)}

                  <input
                    id="date"
                    type="date"
                    min={today}
                    className={`${inputClass("date")} rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm transition-all duration-200 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>

                {errors.date && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.date}
                  </p>
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
                  className={`${inputClass("location")} rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm transition-all duration-200 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>

              {errors.location && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.location}
                </p>
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
                  className={`${inputClass("thumbnail")} rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm transition-all duration-200 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
                  value={form.thumbnail}
                  onChange={(e) => set("thumbnail", e.target.value)}
                />
              </div>

              {errors.thumbnail && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.thumbnail}
                </p>
              )}

              {/* Quick Photo Presets */}
              <div className="mt-3 rounded-xl border border-dashed border-teal-200 bg-teal-50/50 p-3 sm:p-3.5">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-600 sm:text-sm">
                  <ImageIcon size={15} className="text-teal-600" />
                  Quick Photo Presets
                </p>

                <div className="flex flex-wrap gap-2">
                  {PHOTO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => set("thumbnail", preset.url)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                        form.thumbnail === preset.url
                          ? "border-teal-600 bg-teal-600 text-white shadow-sm"
                          : "border-teal-100 bg-white text-teal-700 hover:border-teal-400 hover:bg-teal-50"
                      }`}
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
                rows={4}
                placeholder="Describe the event, what volunteers will do, and what to bring..."
                className={`w-full resize-y rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 ${
                  errors.description ? "border-red-400" : "border-gray-200"
                }`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />

              {errors.description && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Status */}
            {status && (
              <div
                role="alert"
                className={`rounded-xl border p-3 text-sm font-medium ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit */}
            <div className="border-t border-gray-100 pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-base"
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CircleDot size={18} />
                    Update Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFacilities;
