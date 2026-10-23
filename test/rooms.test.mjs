import test from 'node:test';
import assert from 'node:assert/strict';
import { filterVacantRooms } from '../src/rooms.mjs';

test('vacant only, inclusive maximum, stable order and input unchanged', () => {
  const rooms = Object.freeze([
    Object.freeze({ id: 'A', rent: 100, vacant: true }),
    Object.freeze({ id: 'B', rent: 200, vacant: false }),
    Object.freeze({ id: 'C', rent: 200, vacant: true }),
    Object.freeze({ id: 'D', rent: 201, vacant: true }),
  ]);
  const result = filterVacantRooms(rooms, 200);
  assert.deepEqual(result.map(r => r.id), ['A', 'C']);
  result[0].rent = 9;
  assert.equal(rooms[0].rent, 100);
});
test('zero rent and empty input', () => {
  assert.deepEqual(filterVacantRooms([], 0), []);
  assert.equal(filterVacantRooms([{ id: 'zero', rent: 0, vacant: true }], 0).length, 1);
});
test('invalid maximum cannot silently widen selection', () => {
  for (const value of [-1, Infinity, NaN, undefined, null, '200']) {
    assert.throws(() => filterVacantRooms([], value), TypeError);
  }
});
test('invalid input array or room rejected', () => {
  assert.throws(() => filterVacantRooms({}, 200), TypeError);
  for (const room of [null, {}, { id: 'x', rent: -1, vacant: true }, { id: 'x', rent: 1.5, vacant: true }, { id: 'x', rent: 2, vacant: 'yes' }]) {
    assert.throws(() => filterVacantRooms([room], 200), TypeError);
  }
});
