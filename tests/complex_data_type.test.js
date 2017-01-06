import Validate from "../src/validate";


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
