const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // dbo.collection("customers").drop(function (err, delOK) {
  // два варианта
  dbo.dropCollection("customers", function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
