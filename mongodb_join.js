const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://User:A123456@dmi01.05hx1.mongodb.net/mydb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  dbo.createCollection("orders", function (err, res) {
    if (err) throw err;
    console.log("Collection orders created!");
  });

  if (err) throw err;
  dbo.createCollection("products", function (err, res) {
    if (err) throw err;
    console.log("Collection products created!");
  });

  var myobj = [
    { _id: 1, product_id: 155, status: 1 },
    { _id: 2, product_id: 156, status: 1 },
  ];
  dbo.collection("orders").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted to orders: " + res.insertedCount);
  });

  var myobj = [
    { _id: 154, name: "Chocolate Heaven" },
    { _id: 155, name: "Tasty Lemon" },
    { _id: 156, name: "Vanilla Dream" },
  ];
  dbo.collection("products").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log(
      "Number of documents inserted to products: " + res.insertedCount
    );
  });

  dbo
    .collection("orders")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(`\norders: \n`, result);
    });

  dbo
    .collection("products")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(`\nproducts: \n`, result);
    });

  dbo
    .collection("orders")
    .aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "orderdetails",
        },
      },
    ])
    .toArray(function (err, res) {
      if (err) throw err;
      console.log(`Joined collection: \n`, JSON.stringify(res));
    });

  dbo.dropCollection("orders", function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection orders deleted");
  });

  dbo.dropCollection("products", function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection products deleted");
    db.close();
  });
});
