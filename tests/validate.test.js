import Validate from "../src/validate";


describe('Validate', () => {
  test('20 is a number', () => {
    expect(Validate('number', 20)).toBe(true);
  })

  test('0.3 is a number', () => {
    expect(Validate('number', 0.3)).toBe(true);
  })

  test('abcd is a number', () => {
    expect(Validate('number', 'abcd')).toBe(false);
  })

})
