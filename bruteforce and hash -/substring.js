let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync(arg[2]).toString();
let key = arg[3].toString();

const bf = () => {
    let arr = new Array();
    for (i = 0; i < str.length; i++){
        if(str.charAt(i) == key.charAt(0)){
            for(j = 0; j < key.length; j++){
                if(str.charAt(i + j) == key.charAt(j)){
                    if (j == key.length - 1){
                        arr.push(i + 1);
                    }
                }
                else{
                    break;
                }
            }
        }
    }
    
    return arr;
}


const hash1 = () => {
    let arr = new Array();
    let codeStr = 0, codeKey = 0;
    let len_key = key.length;

    for (i = 0; i < len_key; i++){
        codeKey += key.charCodeAt(i);
        codeStr += str.charCodeAt(i);
    }

    for(i = 1; i < str.length; i++){
        if (i > 1){
            codeStr = codeStr - str.charCodeAt(i - 2) + str.charCodeAt(i + key.length - 2);
        }
        if(codeStr == codeKey){
            for (j = 0; j < len_key; j++){
                if(str.charAt(j + i - 1) == key.charAt(j)){
                    if (j == len_key - 1){
                        arr.push(i);
                    }
                }
                else{
                    break;
                }
            }
        }
    }
    return arr;
}

const hash2 = () => {
    let arr = new Array();
    let codeStr = 0, codeKey = 0;
    let len_key = key.length, len_str = str.length;
    
    for (let i = 0; i < len_key; i++){
        codeKey += key.charCodeAt(i) * key.charCodeAt(i);
        codeStr += str.charCodeAt(i) * str.charCodeAt(i);
    }
    
    let i = 1;
    while (i <= len_str - len_key + 1) {
        if (codeKey == codeStr) {
            let j = 0;
            while (str.charAt(i - 1 + j) === key.charAt(j)){
                j++
                if (j == len_key){
                    arr.push(i);
                    break;
                }
            }
        }
        codeStr = (codeStr - str.charCodeAt(i - 1) * str.charCodeAt(i - 1)) + str.charCodeAt(i - 1 + len_key) * str.charCodeAt(i - 1 + len_key) ;
        i++;
    }
    return arr;
}

const hash3 = () => {
    let arr = new Array();
    let codeStr = 0, codeKey = 0;
    let len_key = key.length, len_str = str.length;
    
    for (let i = 0; i < len_key; i++){
        codeKey += key.charCodeAt(i) * Math.pow(2, len_key - i - 1);
        codeStr += str.charCodeAt(i) * Math.pow(2, len_key - i - 1);
    }
    
    for (i = 1; i <= len_str - len_key + 1; i++){
        if (codeStr == codeKey){
            for (j = 0; j < len_key ; j++){
                if(str.charAt(j + i - 1) == key.charAt(j)){
                    if (j == len_key - 1){
                        arr.push(i - 1);
                    }
                }
                else{
                    break;
                }
            }
        }
        codeStr = (codeStr - str.charCodeAt(i - 1) * Math.pow(2, len_key - 1)) * 2 + str.charCodeAt(len_key + i - 1);
    }
    return arr;
}
console.log("Bruteforce:");
console.time('Time');
console.log(bf().join(', '));
console.timeEnd('Time');

console.log("Hash1:");
console.time('Time');
console.log(hash1().join(', '));
console.timeEnd('Time');

console.log("Hash2:");
console.time('Time');
console.log(hash2().join(', '));
console.timeEnd('Time');

console.log("Hash3:");
console.time('Time');
console.log(hash3().join(', '));
console.timeEnd('Time');

// node bf.js testText.txt мне