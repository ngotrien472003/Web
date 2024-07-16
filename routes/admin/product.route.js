const express=require("express");
const productController=require("../../controllers/admin/product.controller");
const router=express.Router();
const multer  = require('multer')
const storageMulter=require("../../Helper/storage-multer")
const upload = multer({ storage: storageMulter() })
const validate=require("../../validates/admin/product.validates")

router.get("/",productController.index);

router.patch("/change-status/:status/:id",productController.changeStatus);

router.patch("/change-multi",productController.changeMulti);

router.delete("/delete/:id",productController.deleteItem);

router.get("/create",productController.create);

router.post("/create",
    upload.single('thumbnail'),
    validate.createPost,
    productController.createPost);

router.get("/edit/:id",
    //upload.single('thumbnail'),
    //validate.createPost,
    productController.edit);

router.patch("/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    productController.editPatch
);
router.get("/detail/:id",productController.detail);

module.exports=router;
