let operand1 = 0;
let operand2 = 0;
let lastOperator = "";
let displayNum = "";
function onNumber(number) {
  if (lastOperator == "") {
    operand1 = operand1 * 10 + number;
    displayNum = operand1;
  } else {
    operand2 = operand2 * 10 + number;
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
}
