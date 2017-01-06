import Validate from "../validate";

describe('map', () => {
  it('{a: {b: c}} is a map', () => {
    expect(Validate('map', {a: {b: "c"}}, 'map<string: map<string: string>>')).toBe(true);
  })

  it('{a: {b: 1}} is a map', () => {
    expect(Validate('map', {a: {b: 1}}, 'map<string: map<string: number>>')).toBe(true);
  })

  it('{a: {b: {c: {d: 2}}}} is a map', () => {
    expect(Validate('map', {a: {b: {c: {d: 2}}}}, 'map<string: map<string: map<string: map<string: number>>>>')).toBe(true);
  })

  it('{a: {b: 1, c: 2}} is a map', () => {
    expect(Validate('map', {a: {b: 1, c: 2}}, 'map<string: map<string: number>>')).toBe(true);
  })

  it('{a: {b: 1, c: 2}, b: {b: 1, c: 2}} is a map', () => {
    expect(Validate('map', {a: {b: 1, c: 2}, b: {b: 1, c: 2}}, 'map<string: map<string: number>>')).toBe(true);
  })

  it('{a: {b: 1, c: "d"}} is a invalid map', () => {
    expect(() => {Validate('map', {a: {b: 1, c: "d"}}, 'map<string: map<string: number>>')})
    .toThrow(/d does not match the schema/);
  })
})

describe('array', () => {
  it('[[1, 2], [2, 3]] is an array', () => {
    expect(Validate('array', [[1, 2], [2, 3]], 'array<array<number>>')).toBe(true);
  })

  it('[["1", "2"], ["2", "3"]] is an array', () => {
    expect(Validate('array', [["1", "2"], ["2", "3"]], 'array<array<string>>')).toBe(true);
  })


  it('[["1", "2"], ["2", "3"]] is an array', () => {
    expect(() => {Validate('array', [["1", "2"], ["2", 3]], 'array<array<string>>')})
    .toThrow(/3 does not match the schema/);
  })
})

describe('map with array', () => {
  it('{a: {b: [1,2]}} is a map with array', () => {
    expect(Validate('map', {a: {b: [1, 2]}}, 'map<string: map<string: array<number>>>')).toBe(true);
  })

  it('{a: {b: [1, 2]}, b: {c: [3,4]}} is a map with array', () => {
    expect(Validate('map', {a: {b: [1, 2]}, b: {c: [3,4]}}, 'map<string: map<string: array<number>>>')).toBe(true);
  })

  it('{a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]} is a map with array', () => {
    expect(Validate('map', {a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]}, 'map<string: array<map<string: number>>>')).toBe(true);
  })

  it('{a: {b: [1, 2]}, b: {c: [3,4]}} is an invalid map with array', () => {
    expect(() => {Validate('map', {a: {b: [1, 2]}, b: {c: [3,"4"]}}, 'map<string: map<string: array<number>>>')}).toThrow(/4 does not match the schema number/);
  })
})

describe('array with map', () => {
  it('[{a: "b"}] is an array with map', () => {
    expect(Validate('array', [{a: "b"}], 'array<map<string: string>>')).toBe(true);
  })

  it('[{a: {b: [1, 2]}}, {b: {c: [3, 4]}}] is an array with map', () => {
    expect(Validate('array', [{a: {b: [1, 2]}}, {b: {c: [3, 4]}}], 'array<map<string: map<string: array<number>>>>')).toBe(true);
  })
})
