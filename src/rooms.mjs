// Synthetic fixture rules only; not the room_rental product specification.
export function filterVacantRooms(rooms, maxRent) {
  if (!Array.isArray(rooms) || typeof maxRent !== 'number' || !Number.isFinite(maxRent) || maxRent < 0) {
    throw new TypeError('rooms array and finite nonnegative maximum rent required');
  }
  for (const room of rooms) {
    if (!room || typeof room.id !== 'string' || !Number.isSafeInteger(room.rent) || room.rent < 0 || typeof room.vacant !== 'boolean') {
      throw new TypeError('invalid synthetic room');
    }
  }
  return rooms.filter(room => room.vacant && room.rent <= maxRent).map(room => ({ ...room }));
}
