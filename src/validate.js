import _ from "lodash";

const baseTypes = ["number", "string", "boolean"];
const mapRegex = /^map\<\s*(\w+)\s*:\s*(.*)\s*\>/;
const arrayRegex = /^array\<\s*(.*)\s*\>/;

export default function validate(type, data, schema) {
  switch(type) {
    case "number":
      return _.isNumber(data);
    case "string":
      return _.isString(data);
    case "boolean":
      return _.isBoolean(data);
    case "regex":
      return _.isString(data) && isRegex(data);
    case "range":
      return isRange(schema, data);
    case "map":
      return isMap(schema, data);
    case "array":
      return isArray(schema, data);
    default:
      throw new Error("validate: invalid data-type");
  }
}

function handleComplexDataType(inferedType, schema, data) {
  switch(inferedType) {
    case 'map':
      if (!isMap(schema, data)) {
        throw new Error(`validate: ${data} does not match the schema ${schema}`);
      }
      return true;
    case 'array':
      if (!isArray(schema, data)) {
        throw new Error(`validate: ${data} does not match the schema ${schema}`);
      }
      return true;
    default:
      if (!validate(schema, data)) {
        throw new Error(`validate: ${data} does not match the schema ${schema}`);
      }
      return true;
  }
}

function inferDataType(data) {
  let inferedType = data;

  if (data.match(mapRegex)) {
    inferedType = "map";
  } else if (data.match(arrayRegex)) {
    inferedType = "array";
  } 

  return inferedType;
}

function isRegex(data) {
  var isValid = true;
  try {
    new RegExp(data);
  } catch(e) {
    isValid = false;
  }
  return isValid;
}

function isRange(schema, data) {
  if (schema.length == 2 && isArray('array<number>', schema)) {
    return _.isRange(data, schema[0], schema[1])
  } else {
    throw new Error("validate: min and max are not valid")
  }  
}

function isArray(schema, data) {
  if (!_.isArray(data)) {
    throw new Error(`validate: data ${data} is not an array`);
  }

  let match = schema.match(arrayRegex);
  if(match && match[1]) {
    let valueType = match[1].trim();
    let inferedType = inferDataType(valueType);

    _.forEach(data, (v) => { handleComplexDataType(inferedType, valueType, v) });

    return true;
  } else {
    throw new Error(`validate: array schema invalid for ${schema}`);
  } 
}

function isMap(schema, data) {
  if (_.isArray(data)) {
    throw new Error(`validate: data ${data} is of type array and not map`);
  }

  let match = schema.match(mapRegex);
  if(match && match[1] && match[2]) {
    let keyType = match[1].trim();
    let valueType = match[2].trim();

    if ( baseTypes.indexOf(keyType) != -1 ) {
      let inferedType = inferDataType(valueType);

      _.forEach(data, (v, k) => {
        if ( !validate(keyType, k) ) {
          throw new Error(`validate: ${k} does not match the schema ${keyType}`);
        }
        handleComplexDataType(inferedType, valueType, v);
      });

      return true;

    } else {
       throw new Error(`validate: key has to be a primitive data-type. ${keyType} given`);
    }

  } else {
    throw new Error(`validate: map schema invalid for ${schema}`);
  } 
}
