let fs = require("fs"); 
let arg = process.argv; 

let inText = fs.readFileSync(arg[2], "utf-8");

let alph = new Array();
for(let i = 0; i < inText.length; i++){
    if (inText.charAt(i) in alph){
        alph[inText.charAt(i)]++;
    }
    else{
        alph[inText.charAt(i)] = 1;
    }
}

n = 0;
for(i in alph){
    alph[i] /= inText.length;
    n++;
}

h = 0;
for(i in alph){
    h -= alph[i] * Math.log(alph[i]);
}

if (h != 0){
    h /= Math.log(n)
}

console.log(`Энтропия по Шеннону: ${h}`)
