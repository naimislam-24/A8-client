"use client";
import Link from "next/link";
import { HeartHandshake, Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafb] px-4 py-12 dark:bg-[#071b18]">
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-2xl font-extrabold text-[#022C22] dark:text-white"
        >
          <HeartHandshake className="h-8 w-8 text-[#0F766E]" />
          Good<span className="text-[#0F766E]">Gather</span>
        </Link>

        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-full bg-[#ccfbf1] dark:bg-[#0f3932]">
          <div className="absolute inset-5 rounded-full border-2 border-dashed border-[#0F766E]/30" />

          <div className="text-[120px] font-black leading-none text-[#0F766E]">
            404
          </div>

          <div className="absolute -right-1 top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#70E443] text-[#022C22] shadow-lg rotate-12">
            <SearchX size={32} />
          </div>

          <div className="absolute -bottom-2 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0F766E] text-white shadow-lg">
            <HeartHandshake size={25} />
          </div>
        </div>

        {/* Message */}
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
          Oops! Page Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-gray-600 dark:text-gray-400">
          The page youre looking for doesnt exist or may have been moved. Lets
          get you back to making a difference in our community!
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3.5 font-semibold text-white shadow-lg shadow-teal-900/20 transition duration-300 hover:-translate-y-1 hover:bg-[#022C22] sm:w-auto"
          >
            <Home size={19} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-7 py-3.5 font-semibold text-gray-700 transition duration-300 hover:border-[#0F766E] hover:bg-teal-50 hover:text-[#0F766E] dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#0f3932] sm:w-auto"
          >
            <ArrowLeft size={19} />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-14 text-sm text-gray-500 dark:text-gray-500">
          © 2026 GoodGather. Together, We Make a Difference.
        </p>
      </div>
    </main>
  );
}
