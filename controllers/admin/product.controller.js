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
        let sortObj={}
        if(req.query.sortKey && req.query.sortValue){
            sortObj[req.query.sortKey]=req.query.sortValue
        }else{
            sortObj["position"]="asc"
        }
        
        //console.log(objectPagination.currentPage)
        const products= await Product.find(find)
        .sort(sortObj)
        .limit(objectPagination.limit)
        .skip(objectPagination.skip);
        // products.forEach((i)=>{
        //     console.log(i.position)
        // })
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

module.exports.changeStatus=async(req,res) =>{
    const status=req.params.status;
    const id=req.params.id;
    try {
        await Product.updateOne({
            _id: id
        },{
            status: status
        })
    } catch (error) {
        res.redirect("back");
    }
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect("back");
   //console.log(req.params)
};

module.exports.changeMulti=async(req,res) =>{
    const ids=req.body.ids.split("-");
    const status=req.body.type;
    switch (status) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id:{$in :ids}
            },{
                status: status
            })
            req.flash('sucess', 'Cập nhật trạng thái thành công!');
            break;
        case "delete-item":
            await Product.updateMany({
                _id:{$in :ids}
            },{
                deleted: true,
                deletedAt:new Date()
            })
            req.flash('delete', 'Xóa các bản ghi thành công!');
            break;
        case "change-position":
            for (const item of ids) {
                let [id,position]=item.split(":")
                position=parseInt(position)
                //console.log(position)
                await Product.updateOne({
                    _id: id
                },{
                    position: position
                })
            }
            req.flash('sucess', 'Cập nhật vị trí thành công!');
            break;
        default:
            break;
    }
    res.redirect("back");
}

module.exports.deleteItem=async(req,res) =>{
    const id=req.params.id;
    try {
        await Product.updateOne({
            _id: id
        },{
            deleted: true,
            deletedAt:new Date()
        })
    } catch (error) {
        console.log(error)
    }
    req.flash("delete","Xóa bản ghi thành công!")
    res.redirect("back");
}

module.exports.create=async(req,res) =>{
    res.render(`admin/pages/products/create`,{
        pageTitle:"Thêm mới sản phẩm",
})
}

module.exports.createPost=async(req,res) =>{
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    if(req.body.position==""){
        const count=await Product.countDocuments();
        req.body.position=count+1
    }else{
        req.body.position=parseInt(req.body.position);
    }
    if(req.file){
        if(req.file.filename){
            req.body.thumbnail=`/uploads/${req.file.filename}`;
        }
        
    }
    const item=new Product(req.body);

    try {
        await item.save();
    } catch (error) {
        console.log(error)
    }
    console.log(req.body)
    req.flash("sucess","Thêm mới sản phẩm thành công!")
    res.redirect(`/${prefixAdmin}/products`);
}
module.exports.edit=async(req,res) =>{
    try {
        const id=req.params.id
        const item=await Product.findOne({
            _id:id,
            deleted:false
        })
        console.log(item)
        res.render("admin/pages/products/edit",{
            pageTitle:"Sửa sản phẩm",
            item:item,
            id:id
        })
    } catch (error) {
        res.redirect(`/${prefixAdmin}/products`)
    }
 
}

module.exports.editPatch=async(req,res)=>{
    try {
        const id=req.params.id
        req.body.price=parseInt(req.body.price)
        req.body.discountPercentage=parseInt(req.body.discountPercentage)
        req.body.stock=parseInt(req.body.stock)
        req.body.position=parseInt(req.body.position)
        if(req.file){
            if(req.file.filename){
                req.body.thumbnail=`/uploads/${req.file.filename}`;
            }
            
        }
        await Product.updateOne({
            _id:id,
            deleted:false
        },req.body)
     //console.log(req.body)
     req.flash("success","Cập nhật sản phẩm thành công!")
    } catch (error) {
        res.redirect(`/${prefixAdmin}/products`)
    }
 res.redirect(`back`)
}

module.exports.detail=async(req,res)=>{
    const id=req.params.id
    const item=await Product.findOne({
        _id:id,
        deleted:false
    })
    res.render("admin/pages/products/detail",{
        pageTitle:"Chi tiết sản phẩm",
        item:item
    })
}




