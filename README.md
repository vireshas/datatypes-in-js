#datatypes-in-js

From the specs

###Basic data-types:
string
number
regex
boolean
range

###Complex data-types:
Array
Map


###Usage:  
```

expect(Validate('number', 20)).toBe(true);
expect(Validate('number', 0.3)).toBe(true);
expect(Validate('boolean', true)).toBe(true);


expect(Validate('map<string: string>', {a: 'b', c: 'd'})).toBe(true);
expect(Validate('array<string>', ['a', 'b'])).toBe(true);


expect(Validate('map<string: map<string: map<string: map<string: number>>>>', {a: {b: {c: {d: 2}}}} )).toBe(true)
expect(Validate('array<array<number>>', [[1, 2], [2, 3]])).toBe(true);

expect(Validate('map<string: array<map<string: number>>>', {a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]})).toBe(true);

```