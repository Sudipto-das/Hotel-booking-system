import { useState, useMemo } from 'react';

 const useRoomFilters = (rooms) => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = useMemo(() => rooms.filter(room => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || room.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  }), [rooms, searchTerm, typeFilter, statusFilter]);

  return {
    filteredRooms,
    searchTerm, setSearchTerm,
    typeFilter, setTypeFilter,
    statusFilter, setStatusFilter,
  };
};

export default useRoomFilters