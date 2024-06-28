const productRouters=require("./product.router");
const homeRouters=require("./home.routes");

module.exports.routerClient=(app) =>{
    app.use("/",homeRouters);
    app.use("/products",productRouters);
};