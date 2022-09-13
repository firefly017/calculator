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
  if (hasDecimal) {
    decimalCount = getDecimalCount(operand1);
  }
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
  decimalCount = 0;
  document.getElementById("result").innerHTML += ".";
}

function addDigit(number, digit) {
  if (!hasDecimal) return number * 10 + digit;
  decimalCount++;
  let divisior = 1;
  for (let i = 0; i < decimalCount; i++) {
    digit = digit / 10;
    divisior = divisior * 10;
  }
  number = number + digit;
  return Math.round((number + Number.EPSILON) * divisior) / divisior;
}
function getDecimalCount(number) {
  let curDecimalCount = 0;
  while (!Number.isInteger(number)) {
    number = number * 10;
    curDecimalCount++;
  }
  return curDecimalCount;
}
function onBackspace() {
  if (hasDecimal) {
    if (lastOperator == "") {
      operand1 = removeLastPress(operand1);
    } else {
      operand2 = removeLastPress(operand2);
    }
  } else if (operand2 != 0) {
    operand2 = removeLastPress(operand2);
  } else if (lastOperator != "") {
    lastOperator == "";
  } else {
    operand1 = removeLastPress(operand1);
  }
  if (operand2 == 0) document.getElementById("result").innerHTML = operand1;
  else document.getElementById("result").innerHTML = operand2;
}

function removeLastPress(digit) {
  if (!hasDecimal) {
    digit = digit - (digit % 10);
    digit = digit / 10;
    return digit;
  }
  if (decimalCount == 0) {
    hasDecimal = false;
    return digit;
  }
  let div = 1;
  for (let i = 0; i < decimalCount; i++) {
    div = div * 10;
  }
  digit = digit * div;
  digit = Math.round(digit);
  digit = digit - (digit % 10);
  digit = digit / div;
  decimalCount--;
  return digit;
}
