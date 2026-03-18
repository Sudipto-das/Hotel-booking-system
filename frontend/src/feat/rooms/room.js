// Sample room data (in production, this would come from an API)
export const initialRooms = [
  {
    _id: '1',
    roomNumber: '101',
    type: 'Standard',
    pricePerNight: 150,
    capacity: 2,
    status: 'Available',
    amenities: ['WiFi', 'TV', 'AC'],
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop'
  },
  {
    _id: '2',
    roomNumber: '102',
    type: 'Deluxe',
    pricePerNight: 250,
    capacity: 3,
    status: 'Booked',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop'
  },
  {
    _id: '3',
    roomNumber: '201',
    type: 'Suite',
    pricePerNight: 450,
    capacity: 4,
    status: 'Available',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop'
  },
  {
    _id: '4',
    roomNumber: '202',
    type: 'Standard',
    pricePerNight: 150,
    capacity: 2,
    status: 'Maintenance',
    amenities: ['WiFi', 'TV'],
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop'
  },
  {
    _id: '5',
    roomNumber: '301',
    type: 'Presidential',
    pricePerNight: 850,
    capacity: 6,
    status: 'Available',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Butler Service'],
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=250&fit=crop'
  },
  {
    _id: '6',
    roomNumber: '103',
    type: 'Deluxe',
    pricePerNight: 280,
    capacity: 3,
    status: 'Booked',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=250&fit=crop'
  },
  {
    _id: '7',
    roomNumber: '203',
    type: 'Suite',
    pricePerNight: 480,
    capacity: 4,
    status: 'Available',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'],
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=250&fit=crop'
  },
  {
    _id: '8',
    roomNumber: '104',
    type: 'Standard',
    pricePerNight: 165,
    capacity: 2,
    status: 'Booked',
    amenities: ['WiFi', 'TV', 'AC'],
    imageUrl: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&h=250&fit=crop'
  },
];

export const roomTypes = ['All', 'Single', 'Double', 'Suite'];
export const statusFilters = ['All', 'Available', 'Booked', 'Maintenance'];
