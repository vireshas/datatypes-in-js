import _ from "lodash";

export default function validate(type, value) {
  switch(type) {
    case "number":
      return _.isNumber(value);
    case "string":
      return _.isString(value);
    default:
      return false 
  }
}
