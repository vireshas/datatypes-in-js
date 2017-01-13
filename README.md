#datatypes-in-js
Checks if the given data matches a schema.

##API  
> Validate(schema, data)

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
  Validate('string', 0.3) => false
  Validate('string', 'abcd') => true
```

####Boolean
```
  Validate('boolean', "abc") => false
  Validate('boolean', true) => true
  Validate('boolean', false) => true
```

####Map
```
  Validate('map<string: string>', {a: 'b'}) => true
  Validate('map<string: string>', {a: 'b', c: 'd'}) => true
  Validate('map<string: number>', {a: 1, b: 2}) => true
  Validate('map<string: number>', {a: 1, b: 'a'}) throws /does not match the schema/
  Validate('map<string: nu>', {a: 1, b: 'a'}) }) throws /invalid data-type/
  Validate('map< string : number >', {'a' : 100}) => true
```

####Array
```
  Validate('array<number>', [1, 2]) => true
  Validate('array<string>', ['a', 'b']) => true
  Validate('array<string>', {a: 1, b: 'a'}) throws /not an array/
  Validate('array<string>', [1, 2]) throws /does not match the schema/
  Validate('array<string>', ['1', 2]) }) throws /2 doesnt match schema/
```
