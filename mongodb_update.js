const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: "Valley 345" };
  var newvalues = { $set: { name: "Mickey1", address: "Canyon 123" } };
  dbo
    .collection("customers")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
});
