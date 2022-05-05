const mongoose = require("mongoose");

mongoose.set("debug", process.env.NODE_ENV === "development");
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// BD_CONN_STR es la connection string de la bd de mongo
const mongo = mongoose.connect(process.env.DB_CONN_STR, options);

mongo.then(
  () => {
    console.log(
      `Mongoose default connection open to ${process.env.DB_CONN_STR}`
    );
  },
  (error) => {
    console.log(error, "error");
  }
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});