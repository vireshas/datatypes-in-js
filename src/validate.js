import _ from "lodash";

const baseTypes = ["number", "string", "boolean"]

const mapRegex = /map\<\s*(\w+)\s*:\s*(\w+)\s*\>/

export default function validate(type, data, schema) {
  switch(type) {
    case "number":
      return _.isNumber(data);
    case "string":
      return _.isString(data);
    case "boolean":
      return _.isBoolean(data);
    case "map":
      return isMap(data, schema);
    default:
      return false 
  }
}


function isMap(data, schema) {
  let match = schema.match(mapRegex)
  if(match && match[1] && match[2]) {
    let keyType = match[1];
    let valueType = match[2];

    if (baseTypes.indexOf(keyType) != -1 && baseTypes.indexOf(valueType) != -1) {
      _.forEach(data, (v, k) => {
        if ( !validate(keyType, k) || !validate(valueType, v) ) {
          throw(`validate: either ${k} or ${v} does not match the schema ${schema}`)
        }
      })
      return true
    } else {
      throw(`validate: either key or value in schema is not a primitive data-type for ${schema}`)
    }
  } else {
    throw(`validate: map schema invalid for ${schema}`)
  } 
    
}
