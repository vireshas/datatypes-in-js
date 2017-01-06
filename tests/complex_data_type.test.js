import Validate from "../src/validate";


describe('map', () => {
  it('{a: {b: c}} is a map', () => {
    expect(Validate('map', {a: {b: "c"}}, 'map<string: map<string: string>>')).toBe(true);
  })

  it('{a: {b: 1}} is a map', () => {
    expect(Validate('map', {a: {b: 1}}, 'map<string: map<string: number>>')).toBe(true);
  })

  it('{a: {b: 1, c: 2}} is a map', () => {
    expect(Validate('map', {a: {b: 1, c: 2}}, 'map<string: map<string: number>>')).toBe(true);
  })

  it('{a: {b: 1, c: "d"}} is a map', () => {
    expect(() => {Validate('map', {a: {b: 1, c: "d"}}, 'map<string: map<string: number>>')}).toThrow(/does not match the schema/);
  })
})

