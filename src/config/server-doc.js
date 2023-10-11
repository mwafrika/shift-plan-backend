import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
  info: {
    title: "SHIFT PLAN API",
    version: "1.0.0",
    description: "WELCOME TO SHIFT PLAN API"
  },
  host: 'localhost:5000', // Host (optional)
  basePath: '/api/v1', // Base path (optional)
  path: {
    '/api/v1': {
      get: {
        summary: 'Get all users',
        tags: ['Users'],
        responses: {
          200: {
            description: 'A list of users.',
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: "integer"
          },
          name: {
            type: "string"
          },
          email: {
            type: "string"
          }
        }
      }
    }
  }
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["../routes/*.js"] // Path to the API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
