"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";

const DeleteFacilities = ({ id }: { id: string }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete facility");
      }

      router.refresh();
      router.push("/my-facilities");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* Delete Button */}
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="flex h-10 w-full min-w-0 items-center justify-center gap-1 rounded-xl bg-rose-50 px-1.5 text-xs font-semibold text-rose-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-100 hover:shadow-md dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 sm:gap-1.5 sm:px-2"
          >
            <Trash2 size={14} />
            Delete
          </button>
        }
      />

      {/* Confirmation Dialog */}
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#11192c] sm:rounded-3xl sm:p-6">
        <AlertDialogHeader className="space-y-3">
          {/* Delete Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
            <Trash2 size={23} />
          </div>

          <AlertDialogTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            This action cannot be undone. This will permanently delete your
            event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex-col gap-2 sm:flex-row sm:justify-end">
          <AlertDialogCancel className="w-full rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-[#0b1120] dark:text-gray-300 dark:hover:bg-gray-800 sm:w-auto">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="w-full rounded-xl bg-rose-600 text-sm font-bold text-white shadow-md shadow-rose-600/20 transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFacilities;
