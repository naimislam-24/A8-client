const EventSkeleton = () => {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
        >
          {/* Image Skeleton */}
          <div className="h-60 w-full animate-pulse bg-gray-200" />

          {/* Content Skeleton */}
          <div className="space-y-4 p-5">
            <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-200" />

            <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200" />

            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded-md bg-gray-200" />
              <div className="h-3 w-4/5 animate-pulse rounded-md bg-gray-200" />
            </div>

            <div className="border-t border-gray-200" />

            <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200" />

            <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventSkeleton;

// import { Suspense } from "react";
// import EventCard from "./EventCard";
// import EventSkeleton from "./EventSkeleton";

// const EventPage = () => {
//   return (
//     <section className="py-12">
//       <div className="mx-auto mb-10 max-w-7xl px-4 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//           Upcoming Events
//         </h1>

//         <p className="mt-3 text-gray-500">
//           Explore our latest events and join us to make a difference.
//         </p>
//       </div>

//       <Suspense fallback={<EventSkeleton />}>
//         <EventCard />
//       </Suspense>
//     </section>
//   );
// };

// export default EventPage;
