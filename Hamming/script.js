"use strict";

let textCode, textEncode, textDecode;

const validText = (text, len) => { // проверяем чтобы текст соотв длине и были только 0 и 1
  let syms = Array.from(new Set(text));
  let flag = false;
  for (let i of syms) {
    if (!("01".includes(i))) {
      flag = true;
      break;
    }
  }

  if ((text.length != len) || flag) {
    return false;
  } else {
    return true;
  }
}

const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

document.querySelector("#codeText").addEventListener("click", () => {
  textCode = document.querySelector("#textCode").value;
  if (validText(textCode, 4)) {
    textEncode = textCode;
    let cir = [Number(textCode[3]), Number(textCode[3]), Number(textCode[3])]; // 1, 2 и 3 круг
    cir[0] += Number(textCode[0]) + Number(textCode[1])
    cir[1] += Number(textCode[1]) + Number(textCode[2])
    cir[2] += Number(textCode[0]) + Number(textCode[2])
    textEncode += String(cir[0] % 2) + String(cir[1] % 2) + String(cir[2] % 2);
    document.querySelector("#textEncode").value = textEncode;
  } else {
    document.querySelector("#errorMessage").textContent = "Code length is 4 and only includes '0' or '1'";
  }
})

document.querySelector("#decodeText").addEventListener("click", () => {
  textDecode = document.querySelector("#textEncode").value;
  if (validText(textDecode, 7)) {
    let cir = [Number(textDecode[3]), Number(textDecode[3]), Number(textDecode[3])]; // 1, 2 и 3 круг
    cir[0] += Number(textDecode[0]) + Number(textDecode[1]) + Number(textDecode[4])
    cir[1] += Number(textDecode[1]) + Number(textDecode[2]) + Number(textDecode[5])
    cir[2] += Number(textDecode[0]) + Number(textDecode[2]) + Number(textDecode[6])
    
    cir = cir.map((el) => el % 2)
    let cir_index = [[0, 1, 4], [1, 2, 5], [0, 2, 6]];

    let err = 0;
    let errLast = -1;
    let errBite = -1;
    for (let i = 0; i < cir.length; i++) {
      if (cir[i] == 1){
        err += 1;
        if (err == 1){
          errLast = i;
          errBite = cir_index[i][2];
        } else if (err == 2) {
          errBite = cir_index[errLast].filter(x => cir_index[i].includes(x));
        } else if (err == 3) {
          errBite = 3; // центр всех пересечений
        }
      }
    }
    
    if (err != 0) {
      textDecode = textDecode.slice(0, errBite) + (textDecode[errBite] == "1" ? "0" : "1") + textDecode.slice(errBite+1)
      document.querySelector("#textDecode").value = textDecode;
      document.querySelector("#errorMessage").textContent = `Zup in ${errBite+1}!`;
    } else {
      document.querySelector("#textDecode").value = textDecode;
      document.querySelector("#errorMessage").textContent = "Correct!";
    }    
  } else {
    document.querySelector("#errorMessage").textContent = "Code length is 7 and only includes '0' or '1'";
  }
})