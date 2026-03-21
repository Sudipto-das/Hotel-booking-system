// ── Mock data ─────────────────────────────────────────────────────────────────
export const MOCK_GUESTS = [
  { id: 1, name: "Eleanor Voss",     email: "eleanor.voss@email.com",  room: "Penthouse A", checkIn: "2025-07-01", checkOut: "2025-07-05", status: "checked-in",  vip: true  },
  { id: 2, name: "Marcus Hale",      email: "m.hale@corporate.io",     room: "Suite 204",   checkIn: "2025-07-02", checkOut: "2025-07-04", status: "checked-in",  vip: false },
  { id: 3, name: "Isabelle Laurent", email: "i.laurent@monde.fr",      room: "Suite 301",   checkIn: "2025-07-05", checkOut: "2025-07-10", status: "reserved",    vip: true  },
  { id: 4, name: "Theodore Crane",   email: "theo.crane@mail.com",     room: "Deluxe 112",  checkIn: "2025-06-28", checkOut: "2025-07-01", status: "checked-out", vip: false },
  { id: 5, name: "Sophia Reinhardt", email: "s.reinhardt@haus.de",     room: "Suite 210",   checkIn: "2025-07-03", checkOut: "2025-07-08", status: "checked-in",  vip: false },
  { id: 6, name: "Julian Park",      email: "julian.park@nexus.com",   room: "Penthouse B", checkIn: "2025-07-07", checkOut: "2025-07-12", status: "reserved",    vip: true  },
  { id: 7, name: "Natalie Bloom",    email: "nbloom@private.net",      room: "Deluxe 108",  checkIn: "2025-06-25", checkOut: "2025-06-30", status: "checked-out", vip: false },
  { id: 8, name: "Dorian Ashworth",  email: "d.ashworth@oxford.ac.uk", room: "Suite 305",   checkIn: "2025-07-09", checkOut: "2025-07-14", status: "reserved",    vip: false },
];


export const STATUS_LABELS = {
  "checked-in":  "Checked In",
  "reserved":    "Reserved",
  "checked-out": "Checked Out",
};