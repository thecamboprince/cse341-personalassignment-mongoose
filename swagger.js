<<<<<<< HEAD
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Lesson 5 Personal Assignment",
    description: "CSE 341 API",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
=======
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Lesson 5 Personal Assignment",
    description: "CSE 341 API",
  },
  host: "cse341-personalassignment-mongoose.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
>>>>>>> 8f49ab1fd9aa36224d594cf96578afacfc9e2b5c
