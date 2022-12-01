/*
    Commands:
    input adr value
    add adr1 adr2 adr3       &adr3 = &adr1 + &adr2
    sub adr1 adr2 adr3       &adr3 = &adr1 - &adr2
    mul adr1 adr2 adr3       &adr3 = &adr1 * &adr2
    div adr1 adr2 adr3       &adr3 = &adr1 / &adr2
    mod adr1 adr2 adr3       &adr3 = &adr1 % &adr2
    point adr1 adr2          adr2 - куда положить, adr1 куда указывает
    goto adr
    output adr
    j# adr1 adr2 adr3        if j#(adr1#adr2) then goto adr3 (je ==, jb > , jl <)
 */
let fs = require('fs');
const { exit } = require('process');
let mem = new Array();

let filename = process.argv[2]; //"NOD.jsvm" //"factor.jsvm";

let row_text = fs.readFileSync(filename).toString();
let skipping = false;
row_text.split('\n').forEach((str) => {
    str.split(' ').forEach((item) => {
        if (item.includes('//') || skipping==true){
            skipping = true;
            return;
        }
        if (isNaN(item)){
            mem.push(item.replace('\r', '')) // здесь добавил
        } else {mem.push(parseInt(item));}

    })
    skipping = false;
})
let ip = 0;
// TODO: прописать
/*for (i = mem.length;i<500; i++){
    mem.push('');
}*/
while (mem[ip] != 'exit'){
    switch(mem[ip]){
        case 'put':
            mem[(mem[ip+1])] = (mem[ip+2]);
            ip+=3;
            break;
        case 'add':
            mem[(mem[ip+3])] = (mem[(mem[ip+1])]) + (mem[(mem[ip+2])]);
            ip+=4;
            break;
        case 'sub':
            mem[(mem[ip+3])] = (mem[(mem[ip+1])]) - (mem[(mem[ip+2])]);
            ip+=4;
            break;
        case 'mul':
            mem[(mem[ip+3])] = (mem[(mem[ip+1])]) * (mem[(mem[ip+2])]);
            ip+=4;
            break;
        case 'div':
            mem[(mem[ip+3])] = Math.floor((mem[(mem[ip+1])]) / (mem[(mem[ip+2])]));
            ip+=4;
            break;
        case 'mod':
            mem[(mem[ip+3])] = (mem[(mem[ip+1])]) % (mem[(mem[ip+2])]);
            ip+=4;
            break;
        case 'input':
            mem[(mem[ip+1])] = (mem[ip+2]);
            ip+=3;
            break;
        case 'point':
            mem[mem[ip+1]] = ip+2;
            while (mem[ip] != 'endpoint'){ // здесь добавил
                ip += 1;
            }
            break;
        case 'endpoint': // здесь добавил
            ip += 1;
            break
        case 'goto':
            ip = (mem[mem[ip+1]]);
            break;
        case 'jb':
            if ((mem[(mem[ip+1])]) > (mem[(mem[ip+2])])){
                ip = (mem[(mem[ip+3])]);
            } else {
                ip+=4;
            }
            break;
        case 'jl':
            if ((mem[(mem[ip+1])]) < (mem[(mem[ip+2])])){
                ip = (mem[(mem[ip+3])]);
            } else {
                ip+=4;
            }
            break;
        case 'je':
            if ((mem[(mem[ip+1])]) == (mem[(mem[ip+2])])){
                ip = (mem[(mem[ip+3])]);
            } else {
                ip+=4;
            }
            break;
        case 'output':
            console.log(mem[(mem[ip+1])]);
            ip+=2;
            break;
        case NaN:
            ip += 1;
            break;
        default:
            console.log('Скорее всего произошла ошибка или отсуствует exit.', ip, mem[ip])
            mem[ip] = 'exit';
            break;
    }

}