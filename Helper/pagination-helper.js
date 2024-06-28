module.exports= (limitItem,countDocuments,query)=>{
    const objectPagination={
        currentPage:1,
        limit:limitItem
    }
    const totalPage=Math.ceil(countDocuments/(parseInt(objectPagination.limit)))
    objectPagination.totalPage=parseInt(totalPage)
    if(query.page){
        objectPagination.currentPage=parseInt(query.page)
    }
    objectPagination.skip=(parseInt(objectPagination.currentPage)-1)*objectPagination.limit
    return objectPagination
}