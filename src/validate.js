import _ from "lodash";

const baseTypes = ["number", "string", "boolean"]

export default function validate(type, value) {
  switch(type) {
    case "number":
      return _.isNumber(value);
    case "string":
      return _.isString(value);
    case "boolean":
      return _.isBoolean(value);
    default:
      return false 
  }
}
