const fs = require("fs");
console.log(fs)

let btn = document.querySelector("button");

btn.onclick = function () {
    let i = 0;
    fs.writeFile(`input_${i++}.txt`, "helloword", err => {
        if (err) {
            return console.log("err")
        }
        return console.log("done");
    })
}

