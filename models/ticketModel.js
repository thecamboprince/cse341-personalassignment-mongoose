module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Tickets = mongoose.model(
    "tickets",
    mongoose.Schema({
      _id: { type: ObjectId, auto: true },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      assignee: {
        type: String,
      },
      reporter: {
        type: String,
      },
      priority: {
        type: String,
      },
      status: {
        type: String,
      },
      createdDate: {
        type: String,
      },
      lastUpdatedDate: {
        type: String,
      },
      comments: {
        type: String,
      },
    })
  );

  return Tickets;
};
