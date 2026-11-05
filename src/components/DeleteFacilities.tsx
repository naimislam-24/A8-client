// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Trash2 } from "lucide-react";
// import { redirect } from "next/navigation";

// const DeleteFacilities = ({ id }) => {
//   const handleDelete = async () => {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${id}`,
//       {
//         method: "DELETE",
//       },
//     );
//     const data = await res.json();
//     // console.log(data);
//     redirect("/my-facilities");
//   };

//   return (
//     <div>
//       <AlertDialog>
//         <AlertDialogTrigger
//           render={
//             <button
//               //   onClick={() => handleDelete(facility._id)}
//               className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
//             >
//               <Trash2 size={15} />
//               Delete
//             </button>
//           }
//         >
//           Show Dialog
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your
//               account from our servers.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete}>
//               Continue
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default DeleteFacilities;

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
            className="flex h-10 w-full min-w-0 items-center justify-center gap-1 rounded-xl bg-rose-50 px-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 sm:gap-1.5 sm:px-2"
          >
            <Trash2 size={14} />
            Delete
          </button>
        }
      />

      {/* Confirmation Dialog */}
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-5 sm:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-gray-900 sm:text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-gray-500">
            This action cannot be undone. This will permanently delete your
            event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel className="w-full rounded-xl sm:w-auto">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="w-full rounded-xl bg-rose-600 text-white hover:bg-rose-700 sm:w-auto"
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFacilities;
