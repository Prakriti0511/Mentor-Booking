*Mentor Booking Platform*

A role-based mentor booking system where mentors create availability slots and users can book them securely.

Live: (https://mentor-booking-q6vs.vercel.app/)

Core Features
- JWT authentication with bcrypt password hashing
- Role-based access (Mentor creates slots, User books slots)
- Atomic booking logic prevents double booking 
- Protected API routes with backend authorization
- Clean, responsive frontend with role-aware UI

Tech Stack
- Frontend: Next.js, React, Tailwind
- Backend: Next.js API Routes, MongoDB, Mongoose
- Auth: JWT

Key Technical Decision

Double booking is prevented using an atomic database update:
findOneAndUpdate(
  { _id: slotId, isBooked: false },
  { isBooked: true }
)
This ensures only one user can book a slot even under concurrent requests.

How to Run Locally

Create .env.local:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run:

npm install
npm run dev

Author
Prakriti Sharma
