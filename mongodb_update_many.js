const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: /^S/ };
  var newvalues = { $set: { name: "Minnie" } };
  dbo
    .collection("customers")
    .updateMany(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log(res.result.nModified + " document(s) updated");
      db.close();
    });
});
