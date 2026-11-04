import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

const JoinFacilitiesPage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    <div className="">Loading...</div>;
  }
  const email = session?.user.email;
  console.log(email);

  useEffect(() => {
    if (!email) {
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities/bookings/${encodeURIComponent(email)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [email]);

  return (
    <div>
      <h2>Hello</h2>
    </div>
  );
};

export default JoinFacilitiesPage;
