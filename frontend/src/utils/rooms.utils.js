export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '/placeholder-room.jpg';
  if (imageUrl.startsWith('http')) return imageUrl;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  return `${backendUrl}${imageUrl}`;
};

export const getStatusClass = (status, styles) => ({
  Available: styles.statusAvailable,
  Booked: styles.statusOccupied,
  Maintenance: styles.statusMaintenance,
}[status] ?? '');

export const computeStats = (rooms) => ({
  total: rooms.length,
  available: rooms.filter(r => r.status === 'Available').length,
  booked: rooms.filter(r => r.status === 'occupied').length,
  maintenance: rooms.filter(r => r.status === 'Maintenance').length,
});