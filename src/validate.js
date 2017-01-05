import _ from "lodash";

const baseTypes = ["number", "string", "boolean"]

const mapRegex = /map\<\s*(\w+)\s*:\s*(\w+)\s*\>/
const arrayRegex = /array\<\s*(\w+)\s*\>/

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
    case "array":
      return isArray(data, schema);
    default:
      return false 
  }
}

function isArray(data, schema) {
  if (!_.isArray(data)) {
    throw new Error(`validate: data ${data} is not an array`)
  }

  let match = schema.match(arrayRegex)
  if(match && match[1]) {
    let valueType = match[1];

    if (baseTypes.indexOf(valueType) != -1) {
      _.forEach(data, (v) => {
        if ( !validate(valueType, v) ) {
          throw new Error(`validate: either ${v} does not match the schema ${schema}`)
        }

      })
      return true

    } else {
      throw new Error(`validate: value in schema is not a primitive data-type for ${schema}`)

    }
  } else {
    throw new Error(`validate: array schema invalid for ${schema}`)

  } 
}

function isMap(data, schema) {
  if (_.isArray(data)) {
    throw new Error(`validate: data ${data} is of type array and not map`)
  }

  let match = schema.match(mapRegex)
  if(match && match[1] && match[2]) {
    let keyType = match[1];
    let valueType = match[2];

    if (baseTypes.indexOf(keyType) != -1 && baseTypes.indexOf(valueType) != -1) {
      _.forEach(data, (v, k) => {
        if ( !validate(keyType, k) || !validate(valueType, v) ) {
          throw new Error(`validate: either ${k} or ${v} does not match the schema ${schema}`)
        }

      })
      return true

    } else {
      throw new Error(`validate: either key or value in schema is not a primitive data-type for ${schema}`)

    }
  } else {
    throw new Error(`validate: map schema invalid for ${schema}`)

  } 
}
