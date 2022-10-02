const fs = require("fs");
const arg = process.argv;
let mode = arg[2];

if (mode == "code") {
  let fileInput = arg[3];
  let fileOutput = arg[4];
  const freqs = text => { // Считаем частоту каждого символа
    return [...text].reduce((fs, c) => fs[c] ? (fs[c] = fs[c] + 1, fs) : (fs[c] = 1, fs), {})
  }
  
  const topairs = freqs => { // преобразуем key: value в [key, value]
    return Object.keys(freqs).map(c => [c, freqs[c]])
  }
  
  const sortPairs = pairs => { // сортируем по value (от меньшего к большему)
    return pairs.sort((a, b) => a[1] - b[1])
  }
  
  const tree = ps => { // построение кодового дерева
    return ps.length < 2 ? ps[0] : tree(sortPairs([[ps.slice(0, 2), ps[0][1] + ps[1][1]]].concat(ps.slice(2))))
  }
  const codes = (tree, pfx = "") => { // определяем коды для каждого символа
    return tree[0] instanceof Array ? Object.assign(codes(tree[0][0], pfx + "0"), codes(tree[0][1], pfx + "1")) : {[tree[0]]: pfx}
  }
  
  const getCodes = text => { // получение кодов
    return codes(tree(sortPairs(topairs(freqs(text)))))
  }
  
  let textInput = fs.readFileSync(fileInput, "utf-8");
  let treeCodes = {};

  if (new Set(textInput).size == 1) {
    treeCodes[textInput.charAt(0)] = "0";
  } else {
    treeCodes = getCodes(textInput);
  }
  
  fs.writeFileSync(fileOutput, "");
  
  for (i of textInput) {
    fs.appendFileSync(fileOutput, treeCodes[i]);
  }

  const swapKeyWithValue = obj => {
    const ret = {};
    Object.keys(obj).forEach(key => {
      ret[obj[key]] = key;
    });
    return ret;
  }
  
  // json файл для декодировки
  fs.writeFileSync("decode.json", JSON.stringify(swapKeyWithValue(treeCodes)));
} else if (mode == "decode") {
  let fileInput = arg[3];
  let fileHelp = arg[4];
  let fileOutput = arg[5];
  fs.writeFileSync(fileOutput, "");

  let textInput = fs.readFileSync(fileInput, "utf-8");
  let treeCodes = JSON.parse(fs.readFileSync(fileHelp, "utf-8"));
  
  let i = 0;

  while (i < textInput.length) {
    for (code in treeCodes) {
      if (textInput.startsWith(code, i)) {
        fs.appendFileSync(fileOutput, treeCodes[code]);
        i += code.length;
      }
    }
  }
} else if (mode == "test") {
  let fileInput = arg[3];
  let fileOutput = arg[4];

  if (fs.readFileSync(fileInput, "utf-8") == fs.readFileSync(fileOutput, "utf-8")) {
    console.log("success!")
  } else {
    console.log(":(")
  }
}