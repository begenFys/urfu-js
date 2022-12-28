function getPostfixExp(exp){
    let stack = [];
    let priority = {
        '(': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        's': 3,
    };
    let buffer = "";
    let postfixExp = "";

    for (let i = 0; i < exp.length; i++) {
        if(!isNaN(exp[i]) || exp[i] == '.') {
            buffer += exp[i];
        }
        if (exp[i] == '(') {
            stack.push(exp[i]);
            continue;
        }
        if (exp[i] == ')') {
            postfixExp += buffer + ' ';
            buffer = "";
            let ptr = stack.length - 1;
            while(stack[ptr] != '(') {
                postfixExp += stack.pop();
                ptr --;
            }
            stack.pop();
            continue;
        }
        if (isNaN(exp[i]) && exp[i] != '.') {
            postfixExp += buffer + " ";
            buffer ="";
            let lastChar = stack[stack.length - 1];
            if(stack.length != 0 && priority[lastChar] >= priority[exp[i]]) {
                while(stack.length != 0 && priority[lastChar] >= priority[exp[i]]){
                    postfixExp += stack.pop() + ' ';
                    lastChar = stack[stack.length - 1];
                }
                
                stack.push(exp[i]);
            }
            else {
                stack.push(exp[i]);
            }
        }
        if (i == exp.length - 1){
            postfixExp += buffer + " ";
            postfixExp += stack.pop();
        }
    }
    if(stack.length != 0){
        while(stack.length != 0 ){
            postfixExp += ' ' + stack.pop();
        }
    }
    return postfixExp;
}

function calc(operator, a, b) {
    switch(operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case 's': return Math.pow(a,b);
    }
}

function getResult(postfixExp){
    let stack = [];
    let buffer = "";
    let a, b;
    for(let i = 0; i < postfixExp.length; i++) {
        if(!isNaN(postfixExp[i]) && postfixExp[i] != ' '|| postfixExp[i] == '.') {
            buffer += postfixExp[i];
        }
        if(postfixExp[i] == ' ' && buffer != "") {
            stack.push(+buffer);
            buffer = "";
            continue;
        }
        if(postfixExp[i] != ' ' && isNaN(postfixExp[i]) && postfixExp[i] != '.' ) {
            b = stack.length > 0 ? stack.pop() : 0;
            a = stack.length > 0 ? stack.pop() : 0;
            stack.push(calc(postfixExp[i], a, b));
        }
    }
    return stack[0];
}

let arg = process.argv;

let exp = arg[2];
exp = exp.toString();

let postfixExp = getPostfixExp(exp);

console.log(`Postfix form: ${postfixExp}`);
let result = getResult(postfixExp);
console.log(`Result: ${result}`);
for(let i = 0; i < exp.length; i++) {
    exp = exp.replace("s", "**");
}
console.log(`Eval result: ${eval(exp)}`);