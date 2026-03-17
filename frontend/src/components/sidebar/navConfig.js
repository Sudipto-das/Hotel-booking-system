// Navigation configuration for sidebar
// Maps nav items to routes

export const NAV_SECTIONS = [
  {
    label: "Operations",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "hotel", badge: null, path: "/dashboard" },
      { id: "bookings", label: "Bookings", icon: "bookings", badge: "12", path: "/bookings" },
      { id: "rooms", label: "Rooms", icon: "rooms", badge: null, path: "/rooms" },
      { id: "guests", label: "Guests", icon: "guests", badge: null, path: "/guests" },
    ],
  },
  {
    label: "Services",
    items: [
      { id: "services", label: "Room Service", icon: "services", badge: "3", path: "/services" },
      { id: "restaurant", label: "Restaurant", icon: "restaurant", badge: null, path: "/restaurant" },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "analytics", label: "Analytics", icon: "analytics", badge: null, path: "/analytics" },
      { id: "settings", label: "Settings", icon: "settings", badge: null, path: "/settings" },
    ],
  },
];

export default NAV_SECTIONS;
