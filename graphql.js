const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLScalarType,
} = require("graphql");
const { tickets } = require("./models");
const { employees } = require("./models");

// Define the EmployeeType
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// Define the TicketType
const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    assignee: { type: GraphQLNonNull(GraphQLString) },
    reporter: { type: GraphQLNonNull(GraphQLString) },
    priority: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLNonNull(GraphQLString) },
    createdDate: { type: GraphQLString }, // Assuming Date is represented as String
    lastUpdatedDate: { type: GraphQLString }, // Assuming Date is represented as String
    comments: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    employees: {
      type: GraphQLList(EmployeeType),
      resolve: async () => {
        try {
          return await employees.find();
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    employeeById: {
      type: EmployeeType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await employees.findById(id); // Use findById() to get employee by ID
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    tickets: {
      type: GraphQLList(TicketType),
      resolve: async () => {
        try {
          return await tickets.find();
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    ticketById: {
      type: TicketType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await tickets.findById(id); // Use findById() to get ticket by ID
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
  },
});

// Use either localhost:8080 or the render link with /graphql
// Example:   localhost:8080/graphql   or  https://cse341-personalassignment-mongoose.onrender.com/graphql
//
// Below is a query to get all employees info (use # before an item to not show it)
// Or use employeeById(id: "65c749db839d216100e738e3") for individual
// query{
//     employees {
//       # _id
//       username
//       email
//       password
//     }
//   }
//
// Below is a query to get all tickets info (use # before an item to not show it)
// Or use ticketById(id: "") for individual
// query{
//   tickets {
//     _id
//     description
//     assignee
//     reporter
//     priority
//     status
//     createdDate
//     lastUpdatedDate
//     comments
//   }
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
});
