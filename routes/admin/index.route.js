const dashboardRouter=require("./dashboard.route");
const productRouter=require("./product.route");
const systemconfig=require("../../config/system");
const prefixAdmin=systemconfig.prefixAdmin;
module.exports.routerAdmin=(app) =>{
     app.use(`/${prefixAdmin}/dashboard`,dashboardRouter);
     app.use(`/${prefixAdmin}/products`,productRouter);
};