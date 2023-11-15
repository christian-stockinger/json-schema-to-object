const chai = require('chai');
const {convertSchemaToObject} = require('../src');
const expect = chai.expect;

describe('convertSchemaToObject', () => {
    it('should convert a simple object schema to an object', () => {
        const schema = {
            type: 'object',
            properties: {
                name: {type: 'string'},
                age: {type: 'number'},
            },
            required: ['name', 'age'],
        };

        const result = convertSchemaToObject(schema);

        expect(result).to.deep.equal({name: '', age: 0});
    });

    it('should handle nested object schemas', () => {
        const schema = {
            type: 'object',
            properties: {
                person: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        age: {type: 'number'},
                    },
                    required: ['name', 'age'],
                },
                address: {
                    type: 'object',
                    properties: {
                        street: {type: 'string'},
                        city: {type: 'string'},
                    },
                },
            },
            required: ['person'],
        };

        const result = convertSchemaToObject(schema);

        expect(result).to.deep.equal({
            person: {name: '', age: 0},
            address: {street: '', city: ''},
        });
    });

    it('should convert an array schema to an array with one element', () => {
        const schema = {
            type: 'array',
            items: {type: 'string'},
        };

        const result = convertSchemaToObject(schema);

        expect(result).to.deep.equal(['']);
    });

    it('should handle default values', () => {
        const schema = {
            type: 'object',
            properties: {
                name: {type: 'string', default: 'John Doe'},
                age: {type: 'number', default: 25},
            },
        };

        const result = convertSchemaToObject(schema);

        expect(result).to.deep.equal({name: 'John Doe', age: 25});
    });

    it('should handle enum values for strings', () => {
        const schema = {
            type: 'object',
            properties: {
                color: {type: 'string', enum: ['red', 'green', 'blue']},
            },
        };

        const result = convertSchemaToObject(schema);

        expect(result).to.deep.equal({color: 'red'});
    });
});
