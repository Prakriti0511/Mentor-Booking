"use client";


import { useEffect, useState } from "react";


export default function SlotsPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
    } catch {
        console.error("Invalid token");
    }
    }, []);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const res = await fetch("/api/slots");
    const data = await res.json();
    setSlots(data.data || []);
    setLoading(false);
  };

  const handleCreateSlot = async () => {
  const token = localStorage.getItem("token");

  if (!date || !startTime || !endTime) {
    alert("All fields required");
    return;
  }

  const res = await fetch("/api/slots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date, startTime, endTime }),
  });

  if (res.ok) {
    setShowForm(false);
    setDate("");
    setStartTime("");
    setEndTime("");
    fetchSlots();
  } else {
    alert("Failed to create slot");
  }
};

  const handleBook = async (slotId: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ slotId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booked successfully!");
      fetchSlots();
    } else {
      alert(data.error);
    }
  };

  if (loading) return <div className="p-10 text-primary">Loading slots...</div>;

  return (
    <div className="min-h-screen p-10 bg-[var(--background)]">
      <h1 className="text-3xl font-semibold mb-6 text-primary">Available Slots</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="bg-card p-6 rounded-xl shadow border-custom border"
          >
            <p className="text-lg font-medium text-primary">
              {new Date(slot.date).toDateString()}
            </p>
            <p className="text-foreground">
              {slot.startTime} - {slot.endTime}
            </p>

            <button
              onClick={() => handleBook(slot._id)}
              className="mt-4 btn-custom"
            >
              Book Slot
            </button>
          </div>
        ))}
        {role === "mentor" && (
          <div className="mb-8 bg-card p-6 rounded-xl shadow-sm border-custom border">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-custom"
            >
              {showForm ? "Cancel" : "Add Slot"}
            </button>

            {showForm && (
              <div className="mt-4 flex flex-wrap gap-3">
                <input
                  type="date"
                  className="border-custom border p-2 rounded bg-[var(--background)] text-foreground"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <input
                  type="time"
                  className="border-custom border p-2 rounded bg-[var(--background)] text-foreground"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <input
                  type="time"
                  className="border-custom border p-2 rounded bg-[var(--background)] text-foreground"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />

                <button
                  onClick={handleCreateSlot}
                  className="btn-custom"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
