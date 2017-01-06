import Validate from "./validate"

console.log(Validate("map<string: map<string: string>>", {a: {b: 'c:'}}))
