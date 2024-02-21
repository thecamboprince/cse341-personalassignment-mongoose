module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Employees = mongoose.model(
    "employees",
    mongoose.Schema({
      _id: { type: ObjectId, auto: true },
      username: {
        type: String,
      },
      email: {
        type: String,
      },
      password: {
        type: String,
      },
    })
  );
  return Employees;
};
