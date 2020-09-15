const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // var mysort = { name: 1 };
  var mysort = { name: -1 }; // descending
  dbo
    .collection("customers")
    .find()
    .sort(mysort)
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});
