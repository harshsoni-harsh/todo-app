const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "Todo App API",
      version: "1.0.0",
      description: "API documentation for the Todo App",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

exports.swaggerSpec = swaggerJsdoc(swaggerOptions);
