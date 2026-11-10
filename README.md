# Room rental agent fixture

Private sandbox candidate; synthetic data only, no dependencies/providers.
Node24.22.1: `node --test test/*.test.mjs`.

`filterVacantRooms(rooms, maxRent)` selects vacant rooms at or below the inclusive
finite nonnegative rent limit. Malformed inputs throw; returned rows are copies.
These are sample rules, not room_rental product behavior.

Example (synthetic data):

```js
import { filterVacantRooms } from './src/rooms.mjs';

const rooms = [
  { id: 'a1', rent: 300, vacant: true },
  { id: 'a2', rent: 450, vacant: true },
  { id: 'b1', rent: 250, vacant: false },
];

filterVacantRooms(rooms, 400); // [{ id: 'a1', rent: 300, vacant: true }]
```

Fixture CI runs push/main/dev-feature-* and PR tests plus explicit dispatch.
Push/dispatch test head SHA; PR tests GitHub's merge SHA. A PR merge result must
not be accepted as proof that its source-head candidate was tested independently.
CI has read-only contents and no App key/token. Owner controls merge.
