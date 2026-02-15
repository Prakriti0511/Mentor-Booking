"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Header*/}
      <header className="flex justify-between items-center px-10 py-6 bg-accent shadow-sm">
        <h1 className="text-3xl font-bold" style={{ color: '#D8CFBC' }}>MentorBooking</h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="text-primary hover:text-foreground"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="btn-custom"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-primary">
            Book a slot with our mentor now!
          </h2>

          <p className="mb-8 text-foreground">
            Schedule personalized mentorship sessions with experienced professionals.
            Simple. Fast. Reliable.
          </p>

          <Link
            href="/register"
            className="btn-custom text-lg"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
