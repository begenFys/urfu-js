let arg = process.argv;
let fs = require('fs');
let message = fs.readFileSync(arg[2]).toString().toLowerCase();
let shift = arg[3] * 1;
let mf = {};
let sf = new Array();
let key = new Array();
let out_code = "";
const prep = " .!?\r\n\t…,-;:()";

let length = 0;
for (i = 0; i < message.length; i++){
    if (!prep.includes(message[i])) {
        if (!(message.charAt(i) in mf)) {
            mf[message.charAt(i)] = 0;
        }
        mf[message.charAt(i)]++;
        length++;
    }
}


let amount = 0;
for(let i in mf){
    mf[i] /= length;
    amount++;
}

let count = 0;
for(let i in mf){
    sf[(count + shift) % amount] = i;
    count++;
}

count = 0;
for (let i in mf){
    key[i] = sf[count++];
}

for (let i = 0; i < message.length; i++){
    if (!prep.includes(message[i])) {
        out_code += key[message.charAt(i)];
    }
    else{
        out_code += message.charAt(i);
    }
}
fs.writeFileSync('textCoded.txt', out_code);

// let out_decode = "";
// let back_key = new Array();
// let input = fs.readFileSync('textCoded.txt').toString();

// for (i in key){
//     back_key[key[i]] = i;
// }

// for (i = 0; i < input.length; i++){
//     if (!prep.includes(message[i])) {
//         out_decode += back_key[input.charAt(i)];
//     }
//     else{
//         out_decode += input.charAt(i);
//     }
// }

// fs.writeFileSync('textDecoded.txt', out_decode);

// node caesar_co.js testText.txt 1