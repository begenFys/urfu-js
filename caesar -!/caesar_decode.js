let arg = process.argv;
let fs = require('fs');
// const { json } = require('stream/consumers');
let message = fs.readFileSync(arg[2]).toString().toLowerCase();
let data = fs.readFileSync("rus.json");
let cf = JSON.parse(data);
let ef = new Array();
let freq = new  Array();
let key = new Array();
let move = new Array();
const prep = " .!?\r\n\t…,-;:()";

length = 0;
for (let i = 0; i < message.length; i++){
    if (!prep.includes(message[i])) {
        if (!(message.charAt(i) in ef)) {
            ef[message.charAt(i)] = 0;
        }
        ef[message.charAt(i)]++;
        length++;
    }
}

let amount = 0;
for (let i in ef){
    ef[i] /= length;
    freq[amount++] = ef[i];
}

let shift = 0;
let check_sum;
let min = 2;
let min_shift = 0;
let count = 0;
for (let i = 0; i <= amount; i++){
    check_sum = 0;
    count = 0;
    for (let j in ef){
        check_sum += Math.pow(freq[(count + shift)%amount] - cf[j], 2);
        count++;
    }
    if (min > check_sum){
        min = check_sum;
        min_shift = shift;
    }
    shift++;
}
console.log(min_shift, min);
console.log(ef);
count = 0;
for (let i in ef){
    move[(count + min_shift) % amount] = i;
    count++;
}

count = 0;
for (let i in ef){
    key[i] = move[count++];
}

console.log(key);
let out = "";
for (let i = 0; i < message.length; i++){
    if (!prep.includes(message[i])) {
        out += key[message.charAt(i)];
    }
    else{
        out += message.charAt(i);
    }
}

fs.writeFileSync('textDecoded.txt', out);
// node caesar_de.js textCoded.txt
// node caesar_de.js textDecoded.txt