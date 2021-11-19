//const {MongoClient, ObjectId} = require("mongodb");

//const url = "";
//const client = new MongoClient(url);

//const dbName = "myData";
//const db = client.db(dbName);
//const collection = db.collection("People");

exports.index = (req,res) => {
    
    res.render("home", {
        title:`Ise-Cards`
    });
};
