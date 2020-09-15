const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = [
    { _id: 154, name: "Chocolate Heaven" },
    { _id: 155, name: "Tasty Lemon" },
    { _id: 156, name: "Vanilla Dream" },
  ];
  dbo.collection("products").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});
