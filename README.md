#datatypes-in-js
Checks if the given data matches a schema.

##API  
> Validate(schema, data)

##Examples

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
  Validate('map<string: number>', {a: 1, b: 'a'}) throws /a does not match the schema/
  Validate('map<string: nu>', {a: 1, b: 'a'}) }) throws /invalid data-type nu/
  Validate('map< string : number >', {'a' : 100}) => true
```

####Array
```
  Validate('array<number>', [1, 2]) => true
  Validate('array<string>', ['a', 'b']) => true
  Validate('array<string>', {a: 1, b: 'a'}) throws /not an array/
  Validate('array<string>', [1, 2]) throws /1 doesnt match the schema/
  Validate('array<string>', ['1', 2]) }) throws /2 doesnt match schema/
```

###Complex

#####Map in Map
```
  Validate('map<string: map<string: number>>', {a: {b: 1}}) => true
  Validate('map<string: map<string: map<string: map<string: number>>>>', {a: {b: {c: {d: 2}}}}) => true
  Validate('map<string: map<string: number>>', {a: {b: 1, c: "d"}})}) throws /d does not match the schema/
```

#####Array in Array
```
  Validate('array<array<string>>', [["1", "2"], ["2", "3"]]) => true
  Validate('array<array<string>>', [["1", "2"], ["2", 3]])}) throws /3 does not match the schema/
```

#####Array in Map
```  
  Validate('map<string: map<string: array<number>>>', {a: {b: [1, 2]}, b: {c: [3,4]}}) => true
  Validate('map<string: array<map<string: number>>>', {a: [{a: 1, b: 2}], b: [{a: 1}, {b: 1}]}) => true
```
  
#####Map in Array
```
  Validate('array<map<string: string>>', [{a: "b"}]) => true
  Validate('array<map<string: map<string: array<number>>>>', [{a: {b: [1, 2]}}, {b: {c: [3, 4]}}])).toBe(true)
```
