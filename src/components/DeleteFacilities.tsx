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
import { redirect } from "next/navigation";

const DeleteFacilities = ({ id }) => {
  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    // console.log(data);
    redirect("/my-facilities");
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <button
              //   onClick={() => handleDelete(facility._id)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-2 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              <Trash2 size={15} />
              Delete
            </button>
          }
        >
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteFacilities;
