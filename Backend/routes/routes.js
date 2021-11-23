var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2021-11-11'});

exports.index = (req,res) => {
    
    res.render("home", {
        title:`Ise-Cards`
    });
};

exports.indexLoggedIn = (req,res) => {
        var params = {
        TableName: 'Users',
        Key: {'Type': req.body.username}
        };
        
        docClient.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Item);
            }
        });

    req.session.user = {
        isAuthenticated: true,
        username: req.body.username
    }
    res.render("home", {
        title:`Ise-Cards`
    });
};
exports.create = (req,res) => {
    
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