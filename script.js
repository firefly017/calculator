let operand1 = 0;
let operand2 = 0;
let lastOperator = "";
let displayNum = "";
let decimalCount = 0;
let hasDecimal = false;
function onNumber(number) {
  if (lastOperator == "") {
    operand1 = addDigit(operand1, number);
    displayNum = operand1;
  } else {
    operand2 = addDigit(operand2, number);
    displayNum = operand2;
  }
  document.getElementById("result").innerHTML = displayNum;

  console.log(operand1);
}
function onOperator(operator) {
  if (lastOperator != "") {
    operate();
  }
  document.getElementById("result").innerHTML = operand1;
  lastOperator = operator;
  hasDecimal = false;
}
function operate() {
  if (lastOperator == "+") operand1 = operand1 + operand2;
  else if (lastOperator == "-") operand1 = operand1 - operand2;
  else if (lastOperator == "*") operand1 = operand1 * operand2;
  else if (lastOperator == "/") {
    if (operand2 != 0) {
      operand1 = operand1 / operand2;
      operand1 = Math.round((operand1 + Number.EPSILON) * 10000) / 10000;
    } else {
      document.getElementById("result").innerHTML =
        "division by 0 is not allowed";
      return;
    }
  }
  hasDecimal = !Number.isInteger(operand1);
  operand2 = 0;
  lastOperator = "";
  document.getElementById("result").innerHTML = operand1;
  console.log(operand1);
}

function clearCalculation() {
  operand2 = 0;
  lastOperator = "";
  operand1 = 0;
  document.getElementById("result").innerHTML = 0;
  hasDecimal = false;
}

function onDecimal() {
  if (hasDecimal) return;
  hasDecimal = true;
  document.getElementById("result").innerHTML += ".";
}

function addDigit(number, digit) {
  let decimalCount = 0;
  let divisor = 1;
  while (!Number.isInteger(number)) {
    number = number * 10;
    decimalCount++;
    divisor = divisor * 10;
  }
  if (hasDecimal) divisor = divisor * 10;
  number = number * 10 + digit;
  number = number / divisor;
  return number;
}
