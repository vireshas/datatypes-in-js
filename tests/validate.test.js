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

  describe('regex', () => {
    test('^abc$ is a regex', () => {
      expect(Validate('regex', "^abc$")).toBe(true);
    })
  })

  describe('map', () => {
    test('{a: b} is a map', () => {
      expect(Validate('map', {a: 'b'}, 'map<string: string>')).toBe(true);
    })

    test('{a: b, c: d} is a map', () => {
      expect(Validate('map', {a: 'b', c: 'd'}, 'map<string: string>')).toBe(true);
    })

    test('{a: 1, b: 2} is a map', () => {
      expect(Validate('map', {a: 1, b: 2}, 'map<string: number>')).toBe(true);
    })

    test('invalid map', () => {
      expect(() => {
        Validate('map', {a: 1, b: 'a'}, 'map<string: number>');
      }).toThrow(/does not match the schema/);
    })

    it('invalid schema', () => {
      expect(function() { Validate('map', {a: 1, b: 'a'}, 'map<string: nu>') }).toThrow(/invalid data-type/);
    })

    it('array is invalid', () => {
      function func() {
        Validate('map', [1, 2, 3], 'map<string: number>')
      }
      expect(func).toThrowError("validate: data 1,2,3 is of type array and not map")
    })

    test('schema with spaces', () => {
      expect(Validate('map', {a: 'b'}, 'map< string : string>')).toBe(true);
    })

    test('{"a" : 100} is a map', () => {
      expect(Validate('map', {'a' : 100}, 'map< string : number >')).toBe(true);
    })

  })

  describe('array', () => {
    test('[1, 2] is an array', () => {
      expect(Validate('array', [1, 2], 'array<number>')).toBe(true);
    })

    test('["a", "b"] is an array', () => {
      expect(Validate('array', ['a', 'b'], 'array<string>')).toBe(true);
    })

    test('invalid array', () => {
      expect(() => {
        Validate('array', {a: 1, b: 'a'}, 'array<string>');
      }).toThrow(/not an array/);
    })

    it('invalid schema', () => {
      expect(function() { Validate('array', [1, 2], 'array<string>') }).toThrow(/does not match the schema/);
    })

    it('invalid schema', () => {
      expect(function() { Validate('array', ['1', 2], 'array<string>') }).toThrow(/2/);
    })

  })

})