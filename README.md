#datatypes-in-js
Checks if the given data matches a schema.

##API  
Validate(schema, data)


String, Number, Regex, Boolean, Range

###Complex data-types:
Array, Map

##Basic data-types:

####Number
```
  Validate('number', 20) => true
  Validate('number', 0.3) => true
  Validate('number', 'abcd') => false
```

####String  
```
  Validate('string', "abc def") => true
```


Validate('boolean', true) => true

expect(Validate('map<string: string>', {a: 'b', c: 'd'})).toBe(true);
expect(Validate('array<string>', ['a', 'b'])).toBe(true);

expect(Validate('map<string: map<string: map<string: map<string: number>>>>', {a: {b: {c: {d: 2}}}} )).toBe(true)
expect(Validate('array<array<number>>', [[1, 2], [2, 3]])).toBe(true);

expect(Validate('map<string: array<map<string: number>>>', {a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]})).toBe(true);
```
