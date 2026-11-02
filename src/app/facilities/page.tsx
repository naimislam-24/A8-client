import EventCard from "./EvenCard";

export type TFormState = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
};

const EventPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BESE_URL}/facilities`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();

  // Backend থেকে Array আসছে কিনা check
  console.log("Backend Data:", data);

  const events: TFormState[] = Array.isArray(data) ? data : data.data || [];

  return <EventCard events={events} />;
};

export default EventPage;
