module.exports.createPost=(req,res,next)=>{
    if(!req.body.title){
        req.flash("error","Vui lòng không được để trống tiêu đề!");
        res.redirect("back");
        return;
    }
    next();
}