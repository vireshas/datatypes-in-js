import Validate from "../validate";

describe('map', () => {
  it('{a: {b: c}} is a map', () => {
    expect(Validate('map<string: map<string: string>>', {a: {b: "c"}})).toBe(true);
  })

  it('{a: {b: 1}} is a map', () => {
    expect(Validate('map<string: map<string: number>>', {a: {b: 1}})).toBe(true);
  })

  it('{a: {b: {c: {d: 2}}}} is a map', () => {
    expect(Validate('map<string: map<string: map<string: map<string: number>>>>', {a: {b: {c: {d: 2}}}})).toBe(true);
  })

  it('{a: {b: 1, c: 2}} is a map', () => {
    expect(Validate('map<string: map<string: number>>', {a: {b: 1, c: 2}})).toBe(true);
  })

  it('{a: {b: 1, c: 2}, b: {b: 1, c: 2}} is a map', () => {
    expect(Validate('map<string: map<string: number>>', {a: {b: 1, c: 2}, b: {b: 1, c: 2}})).toBe(true);
  })

  it('{a: {b: 1, c: "d"}} is a invalid map', () => {
    expect(() => {Validate('map<string: map<string: number>>', {a: {b: 1, c: "d"}})})
    .toThrow(/d does not match the schema/);
  })
})

describe('array', () => {
  it('[[1, 2], [2, 3]] is an array', () => {
    expect(Validate('array<array<number>>', [[1, 2], [2, 3]])).toBe(true);
  })

  it('[["1", "2"], ["2", "3"]] is an array', () => {
    expect(Validate('array<array<string>>', [["1", "2"], ["2", "3"]])).toBe(true);
  })


  it('[["1", "2"], ["2", "3"]] is an array', () => {
    expect(() => {Validate('array<array<string>>', [["1", "2"], ["2", 3]])})
    .toThrow(/3 does not match the schema/);
  })
})

describe('map with array', () => {
  it('{a: {b: [1,2]}} is a map with array', () => {
    expect(Validate('map<string: map<string: array<number>>>', {a: {b: [1, 2]}})).toBe(true);
  })

  it('{a: {b: [1, 2]}, b: {c: [3,4]}} is a map with array', () => {
    expect(Validate('map<string: map<string: array<number>>>', {a: {b: [1, 2]}, b: {c: [3,4]}})).toBe(true);
  })

  it('{a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]} is a map with array', () => {
    expect(Validate('map<string: array<map<string: number>>>', {a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]})).toBe(true);
  })

  it('{a: {b: [1, 2]}, b: {c: [3,4]}} is an invalid map with array', () => {
    expect(() => {Validate('map<string: map<string: array<number>>>', {a: {b: [1, 2]}, b: {c: [3,"4"]}})}).toThrow(/4 does not match the schema number/);
  })
})

describe('array with map', () => {
  it('[{a: "b"}] is an array with map', () => {
    expect(Validate('array<map<string: string>>', [{a: "b"}])).toBe(true);
  })

  it('[{a: {b: [1, 2]}}, {b: {c: [3, 4]}}] is an array with map', () => {
    expect(Validate('array<map<string: map<string: array<number>>>>', [{a: {b: [1, 2]}}, {b: {c: [3, 4]}}])).toBe(true);
  })
})