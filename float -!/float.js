const fs = require('fs');

function isNumber(number){
    number = "" + number;
    return !isNaN(number) && !isNaN(parseFloat(number));
}

function isNegative(number){
    if (number[0] == '-'){
        return true;
    }
    return false;
}

function getNormalisedNumber(number, signBit){
    let mantissa = '';
    let order;

    number = number.toString(2);
    if (number.indexOf('.') == -1){
        number += '.';
    }

    order = number.indexOf('.') - number.indexOf('1') - 1;
    if (order >= 0){
        number = number.slice(number.indexOf('1'), number.indexOf('.')) + number.slice(number.indexOf('.') + 1);
    }
    else {
        ++order;
        number = number.slice(number.indexOf('1'));
    }

    if (number.length > 24){
        number = number.slice(0, 24);
    }
    else {
        number += '0'.repeat(24 - number.length);
    }
    
    mantissa = number.slice(1);
    order = (order + 127).toString(2);
    order = '0'.repeat(8 - order.length) + order;
    
    return [signBit, order, mantissa];
}

function converter(input){
    let signBit = '0';

    //Инпут является числом
    if (isNumber(input)){
        //Проверка знака
        if (isNegative(input)){
            signBit = '1';
            input  = input.slice(1);
        }
        
        let number = parseFloat(input);
        //Число больше допустимого по модулю
        if (number > (2 - Math.pow(2, -23)) * Math.pow(2, 127)){
            return [signBit, '1'.repeat(8), '0'.repeat(23)];
        }
        //Число меньше допустимого по модулю
        else if (number < Math.pow(2, -126)){
            return [signBit, '0'.repeat(8), '0'.repeat(23)];
        }
        //Если всё нормально, переводим число по классике
        else {
            return getNormalisedNumber(number, signBit);
        }
    }
    
    return [signBit, '1'.repeat(8), '1' + '0'.repeat(22)]
}

function getInputData(file_name){
    let inputString = fs.readFileSync(file_name, 'utf8');
    let num1 = "", num2 = "";
    let i = 1;

    num1 += inputString[0];
    while (inputString[i] != '-' && inputString[i] != '+' ){
        num1 += inputString[i];
        i++;
    }

    if (inputString[i+1] == '-' || inputString[i+1] == '+' ){
        if (inputString[i] != inputString[i+1]){
            num2 = '-' + num2;
        }
        else {
            num2 = '+' + num2;
        }
        i += 2;
    }
    for (i; i < inputString.length; i++){
        num2 += inputString[i];
    }
    
    return [parseFloat(num1), parseFloat(num2)];
}

function sum(num1, num2) {
    let answer = "";
    let overflow = 0;

    for (let i = num1.length - 1; i >= 0; i--) {
        let sum = overflow + parseInt(num1[i]) + parseInt(num2[i]);
        answer = sum % 2 + answer;
        overflow = Math.floor(sum / 2);
    }

    if (overflow == 1){
        answer = '1' + answer;
    }
    
    return answer;
};

function sub(num1, num2) {
    let answer = "";
    let debt = 0;

    for (let i = num1.length - 1; i >= 0; i--){
        let sub = parseInt(num1[i]) - parseInt(num2[i]);
        if (debt == 1) {
            if (sub == 0){
                sub = 1;
            }
            else if (sub == -1){
                sub = 0;
            }
            else {
                sub = 0;
                debt = 0;
            }
        }

        if (sub < 0){
           sub = 1;
           debt = 1;
        }
        answer = sub + answer;
    }
    return answer;
}

function isFirstNumGreater(num1, num2){
    let count1 = 0, count2 = 0;

    for (let i = 0; i < num1.length; i++){
        count1 += parseInt(num1[i]);
        count2 += parseInt(num2[i]);
    }

    if (num1.indexOf('1') < num2.indexOf('1')){
        return true;
    }
    else if (num1.indexOf('1') == num2.indexOf('1')){
        if (count1 >= count2){
            return true;
        }
        return false;
    }
    return false;
}

function calculator(num1, num2){
    let mantissa, orders_diff;
    let result = new Array(3);

    //Сравнение и выравнивание порядков чисел
    let diff = parseInt(num1[1], 2) - parseInt(num2[1], 2);
    if (diff > 0){
        num2[1] = num1[1];
        num1[2] = '1' + num1[2];
        num2[2] = '0'.repeat(diff) + '1' + num2[2];
        num2[2] = num2[2].slice(0,24);
    } 
    else {
        num1[1] = num2[1];
        num2[2] = '1' + num2[2];
        num1[2] = '0'.repeat(Math.abs(diff)) + '1' + num1[2];
        num1[2] = num1[2].slice(0,24);
    }
    
    //Если знаки одинаковые, то складываем числа с этим знаком
    if (num1[0] == num2[0]){
        mantissa = sum(num1[2], num2[2]);
        orders_diff = mantissa.length - 24;
        mantissa = mantissa.slice(1, mantissa.length - orders_diff);

        result[0] = num1[0];
        result[1] = (parseInt(num1[1], 2) + orders_diff).toString(2);
        result[1] = '0'.repeat(8 - result[1].length) + result[1];
        result[2] = mantissa;
    }

    //Если знаки разные, то выбрать большее по модулю число – его знак будет знаком результата операции
    else {
        if (diff == 0 && num1[2] == num2[2]){
            return ['0', '0'.repeat(8), '0'.repeat(23)]
        }
        if (isFirstNumGreater(num1[2], num2[2])){
            result[0] = num1[0];
            mantissa = sub(num1[2], num2[2]);
        }
        else {
            result[0] = num2[0];
            mantissa = sub(num2[2], num1[2]);
        }  

        mantissa = mantissa.slice(mantissa.indexOf('1'))
        orders_diff = 24 - mantissa.length;
        mantissa = mantissa.slice(1) + '0'.repeat(orders_diff);

        result[1] = (parseInt(num1[1], 2) - orders_diff).toString(2);
        result[1] = '0'.repeat(8 - result[1].length) + result[1];
        result[2] = mantissa;
    }
    return result
}

function getDecimalNumber(number){
    let order = parseInt(number[1], 2) - 127;
    let mantissa = parseInt(number[2], 2);
    if (number[0] == '0'){
        return  Math.pow(2, order) + mantissa * Math.pow(2, -24 + order + 1)
    }
    else {
        return -1 * (Math.pow(2, order) + mantissa * Math.pow(2, -24 + order + 1))
    }
}

function main(){
    let mode = process.argv[3];

    //Режим перевода числа в нормализованный вид
    if (mode == 'conv'){
        let input = fs.readFileSync(process.argv[2], 'utf8');
        let answer = converter(input);
        let output = "";

        for (let i = 0; i < answer.length; i++){
            output += answer[i] + " ";
        }
        fs.writeFileSync('output.txt', output);
    }

    //Режим арифметических операций с числами
    else if (mode == 'calc'){
        let inputData = getInputData(process.argv[2]);
        let num1 = converter(inputData[0].toString());
        let num2 = converter(inputData[1].toString());
        let answer = calculator(num1, num2);
        let output = "";
        
        for (let i = 0; i < answer.length; i++){
            output += answer[i] + " ";
        }
        
        let DecimalNumber;
        if (answer[1] == '0'.repeat(8)){
            DecimalNumber = 0;
        }
        else {
            DecimalNumber = getDecimalNumber(answer);
        }

        output += "~ " + DecimalNumber;
        fs.writeFileSync('output.txt', output);
    }

    else {
        console.log('ERROR! Incorrect arguments!')
    }
}

main()