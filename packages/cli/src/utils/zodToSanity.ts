import { z } from 'zod';

// Utility function to map Zod types to Sanity schema types
const zodToSanity = (zodSchema: z.ZodTypeAny, title: string, typeName: string) => {
    const fields: any[] = [];

    zodSchema._def.shape().forEach((field: any, fieldName: string) => {
        let fieldType: string;

        if (field instanceof z.ZodString) {
            fieldType = 'string';
        } else if (field instanceof z.ZodNumber) {
            fieldType = 'number';
        } else if (field instanceof z.ZodBoolean) {
            fieldType = 'boolean';
        } else if (field instanceof z.ZodObject) {
            fieldType = 'object';
            // recursively handle nested objects
        } else {
            throw new Error(`Unsupported Zod field type: ${field}`);
        }

        fields.push({
            name: fieldName,
            type: fieldType,
            title: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
        });
    });

    return {
        title,
        name: typeName,
        type: 'document',
        fields,
    };
};