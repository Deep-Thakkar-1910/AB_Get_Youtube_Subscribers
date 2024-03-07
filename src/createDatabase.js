const dotenv = require("dotenv");
const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers");
const data = require("./data");

// to configure the env variable path
dotenv.config({ path: "./.env" });
// Connect to DATABASE
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database created..."));

const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  await subscriberModel.insertMany(data);
  await mongoose.disconnect();
};
refreshAll();
