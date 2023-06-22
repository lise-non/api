const express = require("express");
const db = require("./models/index");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// Middleware Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.mongoose.connect("mongodb://127.0.0.1:27017/test");

require("./routes/user.routes")(app);
require("./routes/book.routes")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Super formation, on s'éclate !!",
      version: "1.0.0",
      description: "Une description de mon API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          required: ["name", "email", "password"],
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
