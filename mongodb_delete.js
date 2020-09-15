const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: "Mountain 21" };
  dbo.collection("customers").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
