import Validate from "../src/validate";


describe('Validate', () => {
  describe('numbers', () => {
    test('20 is a number', () => {
      expect(Validate('number', 20)).toBe(true);
    })

    test('0.3 is a number', () => {
      expect(Validate('number', 0.3)).toBe(true);
    })

    test('abcd is not a number', () => {
      expect(Validate('number', 'abcd')).toBe(false);
    })
  })

  describe('string', () => {
    test('abc def is a string', () => {
      expect(Validate('string', "abc def")).toBe(true);
    })

    test('0.3 is not a string', () => {
      expect(Validate('string', 0.3)).toBe(false);
    })

    test('abcd is a string', () => {
      expect(Validate('string', 'abcd')).toBe(true);
    })
  })

  describe('boolean', () => {
    test('abc is not a boolean', () => {
      expect(Validate('boolean', "abc")).toBe(false);
    })

    test('true is a boolean', () => {
      expect(Validate('boolean', true)).toBe(true);
    })

    test('false is a boolean', () => {
      expect(Validate('boolean', false)).toBe(true);
    })
  })

})
