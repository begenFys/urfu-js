let fs = require('fs')
let arg = process.argv;
let input = arg[2].toString();
let str = '';
let rpn = new Array();
let stack = new Array();

let priority = {
    '(': 0,
    ')': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    's': 3
};

for (let i = 0; i < input.length; i++) {
    if (isNaN(input.charAt(i) * 1) && input.charAt(i) != '.'){
        if (str != ''){
            rpn.push(str * 1);
        }
        str = '';
        if (input.charAt(i) == '(') {
            stack.push('(');
        }  
        else if (input.charAt(i) == ')') {
            while (stack[stack.length - 1] != '(') {
                rpn.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.pop();
        } 
        else if (stack.length == 0 || priority[input.charAt(i)] >= priority[stack[stack.length - 1]]) {
            stack.push(input.charAt(i))
        } 
        else {
            while (stack[stack.length - 1] != '(' && stack.length) {
                rpn.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.push(input.charAt(i));
        }
    }
    else{
        str += input.charAt(i);
    }
}
if (str != ''){
    rpn.push(str * 1);
}
while (stack.length) {
    rpn.push(stack[stack.length - 1]);
    stack.pop()
}

console.log(rpn);

for (let i = 0; i < rpn.length; i++) {
    if (isNaN(rpn[i]) * 1){
        if (rpn[i] == '+'){
            rpn[i - 2] = rpn[i - 2] + rpn[i - 1]; 
            rpn.splice(i - 1, 2);
            i -= 2;
        }
        else if (rpn[i] == '-'){
            rpn[i - 2] = rpn[i - 2] - rpn[i - 1];
            rpn.splice(i - 1, 2);
            i -= 2;
        }
        else if (rpn[i] == '*'){
            rpn[i - 2] = rpn[i - 2] * rpn[i - 1]; 
            rpn.splice(i - 1, 2);
            i -= 2;
        }
        else if (rpn[i] == 's'){
            rpn[i - 2] = rpn[i - 2] ** rpn[i - 1];
            rpn.splice(i - 1, 2); 
            i -= 2;
        }
        else if (rpn[i] == '/'){
            rpn[i - 2] = rpn[i - 2] / rpn[i - 1];
            rpn.splice(i - 1, 2);
            i -= 2; 
        }
        else {
            break;
        }
    }
}

console.log(rpn);

for(let i = 0; i < input.length; i++) {
    input=input.replace("s", "**");
}


console.log("Наш алгоритм - ", rpn[0]);
console.log("Ответ eval - ", eval(input));