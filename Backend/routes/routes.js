var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIASV7F3JEWG3UECSGF", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");

let readOneByName = function (username) {
    var params = {
        TableName: "Users",
        Key: {
            "username": username
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::readOneByName::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::readOneByName::success - " + JSON.stringify(data, null, 2));
        }
    })
}

let addOne = function (username, password) {
    var input = {
        "username":username,
        "password":password,
        "sweatIndex":0,
        "ownedCards": 0,
        "usedCards": 0,
    };
    var params = {
        TableName: "Users",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::addOne::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::addOne::success" );                      
        }
    });
}

exports.index = (req,res) => {
    
    res.render("home", {
        title:`Ise-Cards`
    });
};

exports.indexLoggedIn = (req,res) => {
    Hash = readOneByName(req.body.username)
    bcrypt.compareSync(req.body.password, Hash);
    
    req.session.user = {
        isAuthenticated: true,
        username: req.body.username
    }
    res.render("home", {
        title:`Ise-Cards`
    });
};
exports.create = (req,res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    addOne(req.body.username, hash);
    res.render("Login", {
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