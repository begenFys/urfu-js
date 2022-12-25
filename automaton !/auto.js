let fs = require('fs');
let arg = process.argv;
let pattern = fs.readFileSync(arg[3]);
let inpStr = fs.readFileSync(arg[2]);
pattern = pattern.toString();
inpStr = inpStr.toString();
let alph = [];

function CreateTable(pattern){
for (let i = 0; i < pattern.length; i++) {
    alph[pattern.charAt(i)] = 0;
}
let del = new Array(pattern.length + 1);

for(let j = 0; j <= pattern.length; j++) {
    del[j] = [];
}
for(let i in alph) {
    del[0][i] = 0;
}

for (let j = 0; j < pattern.length; j++) {
    let prev = del[j][pattern.charAt(j)];
    del[j][pattern.charAt(j)] = j + 1;
    for (let i in alph) {
        del[j+1][i] = del[prev][i];
    }
}
return del;
}

const findMatches = (pattern, inpStr) => {
    let del = CreateTable(pattern);
    let state = 0;
    let matchIndexes = [];
    console.time('Time');
    for (let i = 0; i < inpStr.length; i++){
        if(inpStr.charAt(i) in alph) {
            state = del[state][inpStr.charAt(i)];
        }
        else {
            state = 0;
        }

        if(state == pattern.length) { 
            matchIndexes.push(i - pattern.length + 2);
        }
    }
    console.timeEnd('Time');
    return matchIndexes;
}

console.log(`Matches: ${findMatches(pattern,inpStr)}`);