const Subscribe = () => {
  return (
    <div>
      <section className="bg-slate-50 dark:bg-[#0b101d] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* <!-- Title with Mail Icon --> */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg
              className="w-8 h-8 text-sky-500 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Subscribe to Our Newsletter
            </h2>
          </div>

          {/* <!-- Subtitle --> */}
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-lg mb-6">
            Get updates on upcoming events and community news.
          </p>

          {/* <!-- Input Form UI --> */}
          <form
            // onsubmit="return false;"
            className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151c2e] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm sm:text-base"
              />
            </div>
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 bg-[#0F766E] hover:bg-[#115E59] text-white font-medium rounded-lg shadow transition duration-200 shrink-0 text-sm sm:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Subscribe;
