const express=require("express");
const routerClient=require("./routes/client/index.routes");
const routerAdmin=require("./routes/admin/index.route");
const systemconfig=require("./config/system");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')


const dotenv=require("dotenv");
const connectDatabase=require("./config/database");


const app=express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config();
const port=process.env.PORT;

//flash-express
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End flash-express

connectDatabase.connect();
app.set("views","./views");
app.set("view engine","pug");
app.use(express.static("public"));
app.locals.prefixAdmin=systemconfig.prefixAdmin;
routerClient.routerClient(app);
routerAdmin.routerAdmin(app);

app.listen(port,() => {
    console.log(`app is listening at ${port}`);
});
