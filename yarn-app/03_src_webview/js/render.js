const fs = require("fs");
let holder = document.querySelector("#holder");
let readList = document.querySelector("#read");
holder.addEventListener('drop',e=>{
    e.preventDefault();// 取消默认
    e.stopPropagation();// 取消冒泡
    for(const file of e.dataTransfer.files){
        console.log(file);
        console.log(file.path);
        console.log(file.name);
        fs.readFile(file.path,(err,data)=>{
            if(err){
                return console.error(err);
            }
            const newDiv = document.createElement("div");
            newDiv.className = "readFile";
            newDiv.innerHTML=`<h3>${file.name}</h3><a>${data}</a>`
            readList.appendChild(newDiv)
        })
    }
});

holder.addEventListener("dragover",e => {
    e.preventDefault();// 取消默认
    e.stopPropagation();// 取消冒泡
});

