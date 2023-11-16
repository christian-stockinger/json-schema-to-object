# JSON Schema to Object Converter
![npm](https://img.shields.io/npm/dt/json-schema-to-object)
![GitHub License](https://img.shields.io/github/license/christian-stockinger/json-schema-to-object)
![CircleCI](https://img.shields.io/circleci/build/github/christian-stockinger/json-schema-to-object)
![npm version](https://img.shields.io/github/package-json/version/christian-stockinger/json-schema-to-object)



A simple Node.js package that converts JSON schemas into JavaScript objects.

## Installation

```bash
npm install json-schema-to-object
```

``` javascript
const { convertSchemaToObject } = require('json-schema-to-object');

// Example JSON schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
      required: ['street', 'city'],
    },
  },
  required: ['name', 'age'],
};

// Convert the JSON schema to an object
const generatedObject = convertSchemaToObject(schema);

console.log(generatedObject);
```

This package provides a function **convertSchemaToObject** that takes a JSON schema as input and returns a JavaScript object that conforms to that schema.

## API
### convertSchemaToObject(schema)
schema (Object): The JSON schema to convert.  
Returns: A JavaScript object generated based on the provided JSON schema.