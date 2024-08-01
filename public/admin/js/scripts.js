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
//change status
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length>0){
    const formChangeStatus=document.querySelector("[form-change-status]")
    const path=formChangeStatus.getAttribute("data-path");
    //console.log(formChangeStatus)
    buttonChangeStatus.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const statusCurrent=button.getAttribute("data-status")
            const id=button.getAttribute("data-id")
            const status=statusCurrent=="active" ? 'inactive' : 'active';
            const Action = `${path}/${status}/${id}?_method=PATCH`
            formChangeStatus.action=Action;
           
            //console.log(path)
            formChangeStatus.submit();
        })
    })
}
//console.log(buttonChangeStatus)
//End change status
const table=document.querySelector("[table]");
if(table){
    const btnCheckAll=table.querySelector(" input[name='checkAll'] ")
    const form=document.querySelector("[form-change-multi]");
    //console.log(form)
    //console.log(btnChange)
    //console.log(btnCheckAll)
    const btnCheck=table.querySelectorAll("input[name='id']");
    //console.log(btnCheck)
    if(btnCheckAll){
        btnCheckAll.addEventListener("click",(e)=>{
            if(btnCheckAll.checked){
                btnCheck.forEach((btn)=>{
                    btn.checked=true
                })
            }else{
                btnCheck.forEach((btn)=>{
                    btn.checked=false
                }) 
            }
        })
    }
    const cntButtonCheck=btnCheck.length;
    if(cntButtonCheck>0){
        btnCheck.forEach((btn)=>{
            btn.addEventListener("click",(e)=>{
                const cnt=table.querySelectorAll("input[name='id']:checked").length
                if(cnt==cntButtonCheck){
                    btnCheckAll.checked=true
                }else{
                    btnCheckAll.checked=false
                }
            })
        })
    }
    const formIDS=form.querySelector("input[name='ids']")
    //console.log(formIDS)
    form.addEventListener("submit",(e) =>{
        e.preventDefault();
        const type=e.target.elements.type.value;
        if(type=="delete-item"){
            const isConfirm=confirm("Bạn có chắc chắn muốn xóa những bản ghi này?");
            if(!isConfirm){
                return;
            }
        }
        //console.log(type)
        const ids=table.querySelectorAll("input[name='id']:checked");
        const value=[]
        if(ids.length>0){
            ids.forEach((btn) =>{
                if(type=="change-position"){
                    const inputPosition=btn.closest("tr").querySelector("input[name='position']");
                    const valuePosition=inputPosition.value
                    //console.log(valuePosition)
                    value.push(`${btn.value}:${valuePosition}`)
                }else{
                    value.push(btn.value)
                }
                
            })
            //console.log(value)
            //console.log(value.join("-"))
            formIDS.value=value.join("-")
            //console.log(value)
            form.submit();
        }else{
            alert("Please select at least one item to update")
        }
        
    })
    
}

//Delete
const btnDelete=document.querySelectorAll("[button-delete]");
const formDelete=document.querySelector("[form-delete-item]");
if(formDelete){
    const path=formDelete.getAttribute("data-path")
    btnDelete.forEach((btn) =>{
        btn.addEventListener("click",(e) =>{
            const isConfirm=confirm("Bạn có chắc chắn muốn xóa bản ghi này");
            if(isConfirm){
                const id=btn.getAttribute("data-id");
                formDelete.action=`${path}/${id}?_method=DELETE`;
                formDelete.submit();
            }
            
        })
    })
}

//console.log(formDelete)
//console.log(btnDelete)

//End Delete

//show-alert
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
    const time=showAlert.getAttribute("time-alert")
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
        console.log(showAlert)
    },time);
    const closeAlert=showAlert.querySelector("[close-alert]")
    closeAlert.addEventListener("click",(e) =>{
        showAlert.classList.add("alert-hidden")
    })
}

//console.log(showAlert)

//End show-alert

//Preview
const divPreview=document.querySelector("[block-preview]")
if(divPreview){
    const inpPreview=divPreview.querySelector("input[inp-preview]");
    const imgPreview=divPreview.querySelector("img[img-preview]")
    if(divPreview){
        inpPreview.addEventListener("change",(e) =>{
            const file=e.target.files[0];
            if(file){
                imgPreview.src=URL.createObjectURL(file)
            //console.log(imgPreview.src)
        }
    })
}
//console.log(imgPreview)
}

//End Preview
//sortMulti
const boxSort = document.querySelector("[sort]")
if(boxSort){
    let url=new URL(window.location.href)
    //console.log(boxSort)
    const sortSelect=boxSort.querySelector("[sort-select]")
    sortSelect.addEventListener("change",(e)=>{
        //e.preventDefault()
       const [sortKey,sortValue]=sortSelect.value.split("-")
       //console.log(sortKey,sortValue)
        url.searchParams.set("sortKey",sortKey)
        url.searchParams.set("sortValue",sortValue)
        const string=`${sortKey}-${sortValue}`
    // console.log(string)
    // const selectOption=sortSelect.querySelector(`option[value="${string}"]`)
    // selectOption.selected=true
        window.location.href=url.href
        
        //
    })
    const sortKey=url.searchParams.get("sortKey")
    const sortValue=url.searchParams.get("sortValue")
    if(sortKey && sortValue){
        //console.log(sortKey)
    const string=`${sortKey}-${sortValue}`
    //console.log(string)
    const selectOption=sortSelect.querySelector(`option[value="${string}"]`)
    selectOption.selected=true
    }
    
    const sortClear=boxSort.querySelector("[sort-clear]")
    if(sortClear){
        sortClear.addEventListener("click",(e)=>{
            url.searchParams.delete("sortKey")
            url.searchParams.delete("sortValue")
            window.location.href=url.href
        })
    }
}

//console.log(boxSort)
//endsortMulti