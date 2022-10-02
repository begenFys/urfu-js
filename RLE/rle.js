let fs = require("fs"); // подключение lib для работы с файлами
let arg = process.argv; // доступ к аргументам

let mode = arg[2];
let fileInput = arg[3];
let fileOutput = arg[4];

let inText = fs.readFileSync(fileInput, "utf-8");
let outText = "";


// https://metanit.com/web/nodejs/2.8.php
// кодировка текста
const codeFile = (inText) => {
	let pos = "";
	let n = 1;
	for (let i = 0; i < inText.length; i++) {
		pos = inText.charAt(i);
		if ((inText.charAt(i) == inText.charAt(i+1)) && !(n == 255))  {
			n += 1;
		} else {
			if ((n >= 4) || (pos.includes("#"))) {
				outText += "#" + String.fromCharCode(n) + pos[0];
			} else {
				for (let k = 0; k < n-1; k++){
					pos += pos[0]
				}
				outText += pos;
			}
			pos = "";
			n = 1;
		}
	}

	fs.writeFileSync(fileOutput, outText);
	// размер в байтах
	let fileInputSize = fs.statSync(fileInput).size;
	let fileOutputSize = fs.statSync(fileOutput).size;
	console.log(`Размер изначального файла (в байтах): ${fileInputSize}`)
	console.log(`Размер выходного файла (в байтах): ${fileOutputSize}`)
	console.log(`Коэффициент сжатия: ${fileInputSize/fileOutputSize}`)
};

// декодировка текста
const decodeFile = (inText) => {
	let i = 0;
	while (i != inText.length) {
		if (inText.charAt(i) == "#") {
			let pos = "";
			for (let j = 0; j < inText.charCodeAt(i+1); j++){
				pos += inText.charAt(i+2);
			}
			outText += pos;
			i += 3;
		} else {
			outText += inText.charAt(i);
			i += 1;
		}
	}

	fs.writeFileSync(fileOutput, outText);
}

if (mode == "code") {
	codeFile(inText);
} else if (mode == "decode") {
	decodeFile(inText);
} else if (mode == "test") {
	outText = fs.readFileSync(fileOutput);
	if (inText == outText) {
		console.log("Texts match");
	} else {
		console.log("Text me about no match :)")
	}
}
