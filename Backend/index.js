const express = require("express");
const pug = require("pug");
const path = require("path");
const routes = require("./routes/routes");
const urlencodedParser = express.urlencoded({
    extended: false
});

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname+"/views");
app.use(express.static(path.join(__dirname,"/public")));


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
            return err
        }
        else {
            console.log("users::readOneByName::success - " + JSON.stringify(data, null, 2));
            return data
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
index = (req,res) => {  
    res.render("home", {
        title:`Ise-Cards`
    });
};

check = async (req,res) => {
    Hash = JSON.parse(readOneByName(req.body.username))
    console.log("RESULTS OF READBYNAME: " + readOneByName(req.body.username))
    bcrypt.compareSync(req.body.password, Hash.Item.password);

    req.session.user = {
        isAuthenticated: true,
        username: req.body.username
    }

    res.render("home", {
        title:`Ise-Cards`
    });
}
create = (req,res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    addOne(req.body.username, hash);
    res.render("Login", {
        title:`Ise-Cards`
    });
};

game = (req,res) => {
    res.render("game");
};

store = (req,res) => {
    
    res.render("store", {
        title:`Ise-Cards`
    });
};

login = (req,res) => {
    
    res.render("Login", {
        title:`Ise-Cards`
    });
};

signup = (req,res) => {
    
    res.render("signup", {
        title:`Ise-Cards`
    });
};

app.get("/", index);
app.get("/home", index);
app.get("/game", game);
app.get("/store", store);
app.get("/Login", login);
app.get("/signup", signup);
app.post("/create",urlencodedParser, create)
app.post("/",urlencodedParser, check)
app.post("/check",urlencodedParser, check)

app.listen(3000);