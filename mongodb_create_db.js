var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

mongoClient.connect(function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
