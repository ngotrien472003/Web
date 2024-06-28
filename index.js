const express=require("express");
const routerClient=require("./routes/client/index.routes");
const routerAdmin=require("./routes/admin/index.route");
const systemconfig=require("./config/system");

const dotenv=require("dotenv");
const connectDatabase=require("./config/database");


const app=express();
dotenv.config();
const port=process.env.PORT;

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
