import {
  CalendarPlus,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Create Events",
    description:
      "Organize community events and bring people together for meaningful causes.",
    icon: CalendarPlus,
    color: "text-blue-600",
    bg: "bg-blue-100",
    glow: "group-hover:bg-blue-500",
  },
  {
    id: 2,
    title: "Join Events",
    description:
      "Be a part of positive change by joining community activities.",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    glow: "group-hover:bg-emerald-500",
  },
  {
    id: 3,
    title: "Track Progress",
    description: "See your contributions and track your community impact.",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
    glow: "group-hover:bg-green-500",
  },
  {
    id: 4,
    title: "Safe & Secure",
    description: "Your personal information and activities are protected.",
    icon: ShieldCheck,
    color: "text-sky-600",
    bg: "bg-sky-100",
    glow: "group-hover:bg-sky-500",
  },
];

const KeyFeatures = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7fbff] to-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        {/* <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl lg:text-5xl">
            Our Key{" "}
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Simple, secure, and community focused. Everything you need to
            connect, participate, and create meaningful change.
          </p>
        </div> */}

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#022C22] sm:text-4xl lg:text-5xl">
            Our Key{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#2DD4BF] bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Simple, secure, and community focused. Everything you need to
            connect, participate, and create meaningful change.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative rounded-2xl border border-gray-100 bg-white/80 p-7 text-center shadow-[0_4px_25px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-[0_15px_40px_rgba(13,148,136,0.12)]"
              >
                {/* Icon */}
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg} transition-all duration-300 group-hover:scale-110 group-hover:rounded-full`}
                >
                  <Icon
                    size={30}
                    strokeWidth={2.2}
                    className={`${feature.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-bold text-[#102A43] transition-colors group-hover:text-teal-600">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

                {/* Bottom Decoration */}
                <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300 group-hover:w-20" />

                {/* Hover Arrow */}
                <ArrowUpRight
                  size={18}
                  className="absolute right-5 top-5 text-gray-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-gray-500">
            Together, we can build a stronger and better community.
            <span className="ml-1 font-bold text-teal-600">
              Make an impact today!
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;

// import {
//   CalendarPlus,
//   Users,
//   TrendingUp,
//   ShieldCheck,
//   ArrowUpRight,
// } from "lucide-react";

// const features = [
//   {
//     id: 1,
//     title: "Create Events",
//     description:
//       "Organize community events and bring people together for meaningful causes.",
//     icon: CalendarPlus,
//     color: "text-[#0F766E]",
//     bg: "bg-[#0F766E]/10",
//   },
//   {
//     id: 2,
//     title: "Join Events",
//     description:
//       "Be a part of positive change by joining community activities.",
//     icon: Users,
//     color: "text-[#0F766E]",
//     bg: "bg-[#0F766E]/10",
//   },
//   {
//     id: 3,
//     title: "Track Progress",
//     description: "See your contributions and track your community impact.",
//     icon: TrendingUp,
//     color: "text-[#0F766E]",
//     bg: "bg-[#0F766E]/10",
//   },
//   {
//     id: 4,
//     title: "Safe & Secure",
//     description: "Your personal information and activities are protected.",
//     icon: ShieldCheck,
//     color: "text-[#0F766E]",
//     bg: "bg-[#0F766E]/10",
//   },
// ];

// const KeyFeatures = () => {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f0fdfa] to-white px-4 py-20 sm:px-6 lg:px-8">
//       {/* Background Decoration */}
//       <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#0F766E]/10 blur-3xl" />
//       <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#2DD4BF]/15 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl">
//         {/* Section Heading */}
//         <div className="mx-auto mb-14 max-w-2xl text-center">
//           <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#022C22] sm:text-4xl lg:text-5xl">
//             Our Key{" "}
//             <span className="bg-gradient-to-r from-[#0F766E] to-[#2DD4BF] bg-clip-text text-transparent">
//               Features
//             </span>
//           </h2>

//           <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
//             Simple, secure, and community focused. Everything you need to
//             connect, participate, and create meaningful change.
//           </p>
//         </div>

//         {/* Feature Cards */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {features.map((feature) => {
//             const Icon = feature.icon;

//             return (
//               <div
//                 key={feature.id}
//                 className="group relative rounded-2xl border border-teal-100/80 bg-white/80 p-7 text-center shadow-[0_4px_25px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#0F766E]/40 hover:shadow-[0_15px_40px_rgba(15,118,110,0.12)]"
//               >
//                 {/* Icon */}
//                 <div
//                   className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg} transition-all duration-300 group-hover:scale-110 group-hover:rounded-full group-hover:bg-[#0F766E]`}
//                 >
//                   <Icon
//                     size={30}
//                     strokeWidth={2.2}
//                     className={`${feature.color} transition-colors duration-300 group-hover:text-white`}
//                   />
//                 </div>

//                 {/* Content */}
//                 <h3 className="mt-6 text-lg font-bold text-[#022C22] transition-colors group-hover:text-[#0F766E]">
//                   {feature.title}
//                 </h3>

//                 <p className="mt-3 text-sm leading-6 text-gray-600">
//                   {feature.description}
//                 </p>

//                 {/* Bottom Decoration */}
//                 <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#0F766E] to-[#2DD4BF] transition-all duration-300 group-hover:w-20" />

//                 {/* Hover Arrow */}
//                 <ArrowUpRight
//                   size={18}
//                   className="absolute right-5 top-5 text-gray-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0F766E] group-hover:opacity-100"
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* Bottom Text */}
//         <div className="mt-12 text-center">
//           <p className="text-sm font-medium text-gray-600">
//             Together, we can build a stronger and better community.
//             <span className="ml-1 font-bold text-[#0F766E]">
//               Make an impact today!
//             </span>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default KeyFeatures;
