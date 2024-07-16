const Product=require("../../models/product.model");
// [GET] /products/
module.exports.index=async (req,res) =>{
    const products=await (Product).find({
        status: "active",
       deleted: false
    }).sort({
        position:"asc"
    });
    products.forEach(item => {
       item.priceNew=item.price*(1-item.discountPercentage/100);
       item.priceNew=item.priceNew.toFixed(2);
    });
    
    res.render("client/pages/products/index",{
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    });
};
// [GET] /products/detail
module.exports.detail=async (req,res) =>{
    const slug=req.params.slug
    const product=await (Product).findOne({
        slug:slug,
        status: "active",
        deleted: false
    });
    product.priceNew=product.price*(1-product.discountPercentage/100);
    product.priceNew=product.priceNew.toFixed(2);
    res.render("client/pages/products/detail",{
        pageTitle: product.title,
        item: product
    });
};
