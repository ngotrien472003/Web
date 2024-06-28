const Product=require("../../models/product.model");
const filterStateHelper=require("../../Helper/filter-State.helper");
const Pagination=require("../../Helper/pagination-helper")
const { prefixAdmin } = require("../../config/system");
module.exports.index=async(req,res) =>{
    try {
        const filterState=filterStateHelper(req.query)
        const find={
            deleted: false,
        }
        if(req.query.status){
            find.status=req.query.status
        };
        if(req.query.keyword){
            const regex=new RegExp(req.query.keyword,"i")
            find.title=regex
        }

        
        const total=await Product.countDocuments({
            deleted: false,
        })
        const objectPagination=Pagination(4,total,req.query)
        const products= await Product.find(find)
        .limit(objectPagination.limit)
        .skip(objectPagination.skip);
        res.render("admin/pages/products/index",{
            pageTitle: "Trang quản lý sản phẩm",
            products: products,
            filterState: filterState,
            valuesearch: req.query.keyword,
            objectPagination: objectPagination
        });
    } catch (error) {
        console.log(error)
        res.redirect(`/${prefixAdmin}/products`)
    }
};