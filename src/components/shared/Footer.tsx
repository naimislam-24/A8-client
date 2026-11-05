import {
  HeartHandshake,
  Home,
  Calendar,
  Users,
  Info,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#022C22] text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-t border-emerald-800/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-emerald-800/30">
        {/* Left Column: Logo, Tagline & Social Icons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {/* <div className="bg-emerald-600/20 p-2 rounded-xl text-emerald-400">
              <HeartHandshake className="w-8 h-8 text-white" />
            </div> */}
            <div className="bg-emerald-600/20 p-2 rounded-xl text-emerald-400">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">
              SocialServe
            </span>
          </div>
          <p className="text-sm text-gray-300 max-w-xs">
            Together for a Better Community. Empowering people through shared
            actions.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            {/* Twitter / X */}
            <a
              href="#"
              className="p-2 bg-emerald-900/40 hover:bg-emerald-800/60 rounded-full text-white transition-colors"
              title="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Github */}
            <a
              href="#"
              className="p-2 bg-emerald-900/40 hover:bg-emerald-800/60 rounded-full text-white transition-colors"
              title="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            {/* Youtube */}
            <a
              href="#"
              className="p-2 bg-emerald-900/40 hover:bg-emerald-800/60 rounded-full text-white transition-colors"
              title="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Linkedin */}
            <a
              href="#"
              className="p-2 bg-emerald-900/40 hover:bg-emerald-800/60 rounded-full text-white transition-colors"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Middle Column: Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4 text-white" /> Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4 text-white" /> Upcoming Event
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Users className="w-4 h-4 text-white" /> Create Event
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Info className="w-4 h-4 text-white" /> About
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact Us */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 tracking-wider">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:support@socialserve.org"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-white shrink-0" />{" "}
                support@socialserve.org
              </a>
            </li>
            <li>
              <a
                href="tel:+8801227007000"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-white shrink-0" /> +880 1227
                007000
              </a>
            </li>
            <li>
              <div className="flex items-center gap-2.5 text-gray-300">
                <MapPin className="w-4 h-4 text-white shrink-0" /> Dhaka,
                Bangladesh
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-gray-400">
        © 2026 SocialServe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

// import {
//   HeartHandshake,
//   Home,
//   Calendar,
//   Users,
//   Info,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
// } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#0b101d] text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/30">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-emerald-900/30">
//         {/* Left Column: Logo, Tagline & Social Icons */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="bg-emerald-600/20 p-2 rounded-xl text-emerald-400">
//               <HeartHandshake className="w-8 h-8" />
//             </div>
//             <span className="text-xl font-bold tracking-wide text-white">
//               SocialServe
//             </span>
//           </div>
//           <p className="text-sm text-gray-400 max-w-xs">
//             Together for a Better Community. Empowering people through shared
//             actions.
//           </p>

//           {/* Social Icons (Using SVG to prevent any missing export error) */}
//           <div className="flex items-center gap-4 pt-2">
//             {/* Twitter / X */}
//             <a
//               href="#"
//               className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 rounded-full text-gray-300 hover:text-white transition-colors"
//               title="Twitter"
//             >
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//               </svg>
//             </a>
//             {/* Github */}
//             <a
//               href="#"
//               className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 rounded-full text-gray-300 hover:text-white transition-colors"
//               title="GitHub"
//             >
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                 <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
//               </svg>
//             </a>
//             {/* Youtube */}
//             <a
//               href="#"
//               className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 rounded-full text-gray-300 hover:text-white transition-colors"
//               title="YouTube"
//             >
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//               </svg>
//             </a>
//             {/* Linkedin */}
//             <a
//               href="#"
//               className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 rounded-full text-gray-300 hover:text-white transition-colors"
//               title="LinkedIn"
//             >
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//               </svg>
//             </a>
//           </div>
//         </div>

//         {/* Middle Column: Quick Links */}
//         <div>
//           <h3 className="text-white font-semibold text-base mb-4 tracking-wider">
//             Quick Links
//           </h3>
//           <ul className="space-y-3 text-sm">
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
//               >
//                 <Home className="w-4 h-4 text-emerald-500" /> Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
//               >
//                 <Calendar className="w-4 h-4 text-emerald-500" /> Upcoming Event
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
//               >
//                 <Users className="w-4 h-4 text-emerald-500" /> Create Event
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
//               >
//                 <Info className="w-4 h-4 text-emerald-500" /> About
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Right Column: Contact Us */}
//         <div>
//           <h3 className="text-white font-semibold text-base mb-4 tracking-wider">
//             Contact Us
//           </h3>
//           <ul className="space-y-3 text-sm">
//             <li>
//               <a
//                 href="mailto:support@socialserve.org"
//                 className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
//               >
//                 <Mail className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
//                 support@socialserve.org
//               </a>
//             </li>
//             <li>
//               <a
//                 href="tel:+8801227007000"
//                 className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
//               >
//                 <Phone className="w-4 h-4 text-emerald-500 shrink-0" /> +880
//                 1227 007000
//               </a>
//             </li>
//             <li>
//               <div className="flex items-center gap-2.5 text-gray-300">
//                 <MapPin className="w-4 h-4 text-emerald-500 shrink-0" /> Dhaka,
//                 Bangladesh
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Copyright Section */}
//       <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-gray-500">
//         © 2026 SocialServe. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
