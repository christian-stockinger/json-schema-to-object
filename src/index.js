/**
 * Converts a JSON schema into a JavaScript object based on specified rules.
 *
 * @param {Object} schema - The JSON schema to convert.
 * @returns {any} - A JavaScript object generated based on the provided JSON schema.
 *
 * @description
 * This function recursively converts a JSON schema into a JavaScript object, adhering to the specified data types and constraints.
 * It supports 'object', 'array', 'string', 'integer', 'number', 'boolean' types, as well as 'default' and 'enum' properties.
 * If a property is not explicitly defined in the schema, the default value for its type is used.
 *
 * @example
 * // Example JSON schema
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     name: { type: 'string' },
 *     age: { type: 'number' },
 *     address: {
 *       type: 'object',
 *       properties: {
 *         street: { type: 'string' },
 *         city: { type: 'string' },
 *       },
 *       required: ['street', 'city'],
 *     },
 *   },
 *   required: ['name', 'age'],
 * };
 *
 * // Convert the JSON schema to an object
 * const generatedObject = convertSchemaToObject(schema);
 * console.log(generatedObject);
 */
function convertSchemaToObject(schema) {
    if (schema.type === 'object') {
        const result = {};
        if (schema.properties) {
            Object.keys(schema.properties).forEach((property) => {
                result[property] = convertSchemaToObject(schema.properties[property]);
            });
        }
        return result;
    } else if (schema.type === 'array') {
        return [convertSchemaToObject(schema.items)];
    } else {
        if (schema.default !== undefined)
            return schema.default;

        switch (schema.type) {
            case 'string':
                if (schema.enum !== undefined)
                    return schema.enum[0]
                return '';
            case 'integer':
            case 'number':
                return 0
            case 'boolean':
                return false
            default:
                return null;
        }
    }
}

module.exports = {convertSchemaToObject}