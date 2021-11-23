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

app.get("/", routes.index);
app.get("/home", routes.index);
app.get("/game", routes.game);
app.get("/store", routes.store);
app.get("/Login", routes.login);
app.post("/Login",urlencodedParser, routes.login)
app.get("/signup", routes.signup);

app.listen(3000);