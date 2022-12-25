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

document.querySelector("#codeText").addEventListener("click", () => {
  let textCode = document.querySelector("#textCode").value;
  if (validText(textCode, 4)) {
    let textEncode = textCode;
    textCode = textCode.split('').map((el) => Number(el))
    if (textCode.reduce((partialSum, a) => partialSum + a, 0) % 2 != 0) {
      document.querySelector("#errorMessage").textContent = "Unreal!";
      return;
    }
    document.querySelector("#errorMessage").textContent = "";
    let cir = [textCode[3], textCode[3], textCode[3]]; // 1, 2 и 3 круг
    cir[0] += textCode[0] + textCode[1]
    cir[1] += textCode[1] + textCode[2]
    cir[2] += textCode[0] + textCode[2]
    cir = cir.map((el) => el % 2)
    textEncode += cir.join('')
    document.querySelector("#textEncode").value = textEncode;
  } else {
    document.querySelector("#errorMessage").textContent = "Code length is 4 and only includes '0' or '1'";
  }
})

document.querySelector("#decodeText").addEventListener("click", () => {
  textDecode = document.querySelector("#textEncode").value;
  if (validText(textDecode, 7)) {
    textDecode = textDecode.split('').map((el) => Number(el))
    let cir = [textDecode[3], textDecode[3], textDecode[3]]; // 1, 2 и 3 круг
    cir[0] += textDecode[0] + textDecode[4] + textDecode[6]
    cir[1] += textDecode[1] + textDecode[4] + textDecode[5]
    cir[2] += textDecode[2] + textDecode[5] + textDecode[6]
    cir = cir.map((el) => el % 2);
    let cir_index = [[4, 6, 0], [4, 5, 1], [5, 6, 2]];
    // 0001111
    //
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
          errBite = Number(cir_index[errLast].filter(x => cir_index[i].includes(x)));
        } else if (err == 3) {
          errBite = 3; // центр всех пересечений
        }
      }
    }
    
    if (err != 0) {
      console.log(errBite, typeof(errBite));
      textDecode = textDecode.slice(0, errBite).join('') + (textDecode[errBite] == "1" ? "0" : "1") + textDecode.slice(errBite+1).join('');
      document.querySelector("#textDecode").value = textDecode;
      document.querySelector("#errorMessage").textContent = `Zup in ${Number(errBite)+1}!`;
    } else {
      document.querySelector("#textDecode").value = textDecode;
      document.querySelector("#errorMessage").textContent = "Correct!";
    }    
  } else {
    document.querySelector("#errorMessage").textContent = "Code length is 7 and only includes '0' or '1'";
  }
})