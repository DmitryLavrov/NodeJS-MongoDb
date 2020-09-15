const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo
    .collection("customers")
    .find({}, { projection: { _id: 0, name: 1, address: 1 } })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});
