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

})
