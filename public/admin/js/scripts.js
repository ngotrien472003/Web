const buttonsStatus=document.querySelectorAll("[button-status]")
if(buttonsStatus.length>0){
    buttonsStatus.forEach((button)=>{
      button.addEventListener("click",()=>{
        let url = new URL(window.location.href);
        const status=button.getAttribute("button-status")
        if(status){
            url.searchParams.set("status",status)
        }else{
            url.searchParams.delete("status")
        }
        window.location.href=url.href;
    });
})
}

const formSearch=document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit",(event)=>{
        event.preventDefault();
        const value=event.target.elements.keyword.value;
        if(value){
           url.searchParams.set("keyword",value)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href=url.href
    });
}
// Pagination
const buttonPagination=document.querySelectorAll("[button-pagination]");
if(buttonPagination.length>0){
    buttonPagination.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            let url =new URL(window.location.href);
            const pageValue=button.getAttribute("button-pagination")
            if(pageValue){
                url.searchParams.set("page",pageValue)
            }else{
                url.searchParams.delete("page")
            }
            window.location.href=url.href
        })
    })
}
// End Pagination