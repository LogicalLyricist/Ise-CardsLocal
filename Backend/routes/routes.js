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

exports.game = (req,res) => {
    
    res.render("game", {
        title:`Ise-Cards`
    });
};

exports.store = (req,res) => {
    
    res.render("store", {
        title:`Ise-Cards`
    });
};

exports.login = (req,res) => {
    
    res.render("Login", {
        title:`Ise-Cards`
    });
};

exports.signup = (req,res) => {
    
    res.render("signup", {
        title:`Ise-Cards`
    });
};