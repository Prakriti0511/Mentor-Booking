"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-xl font-semibold">MentorBooking</h1>

        <div className="space-x-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-black"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Book a slot with our mentor now!
          </h2>

          <p className="text-gray-600 mb-8">
            Schedule personalized mentorship sessions with experienced professionals.
            Simple. Fast. Reliable.
          </p>

          <Link
            href="/register"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
