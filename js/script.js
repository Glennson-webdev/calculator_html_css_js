const calculator = document.querySelector(".calculator");
const buttons = document.querySelector(".buttons");
const display = document.querySelector(".userInput");
const operatorButtons = buttons.querySelectorAll('[data-type="operator"]');

buttons.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const button = event.target;
  //console.log(button.textContent)
  const buttonValue = button.textContent;
  const displayValue = display.textContent;
  const { type } = button.dataset;
  const { previousButtonType } = calculator.dataset;

  //is this a number key?
  if (type === "number") {
    if (displayValue === "0") {
      //replace displayValue
      display.textContent = buttonValue;
    } else if (previousButtonType === "operator") {
      display.textContent = buttonValue;
    } else {
      display.textContent = displayValue + buttonValue;
    }
  }

  //check for operator button
  if (type === "operator") {
    const operatorButtons = buttons.querySelectorAll('[data-type="operator"]');
    //one operator per equation, reset state
    operatorButtons.forEach((el) => {
      el.dataset.state = "";
    });
    button.dataset.state = "selection";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = button.dataset.key;
  }

  if (type === "equal") {
    //perform calculation
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  if (type === 'clear') {
    display.textContent = '0'
    delete calculator.dataset.firstNumber
    delete calculator.dataset.operator
  }

  calculator.dataset.previousButtonType = type
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);

  if (operator === "plus") return firstNumber + secondNumber;
  if (operator === "minus") return firstNumber - secondNumber;
  if (operator === "times") return Math.round(firstNumber * secondNumber * 100) /100;
  if (operator === "divide") return Math.round(firstNumber / secondNumber * 100) /100;
  console.log(calculate)

  //let result = '';

  //switch (operator) {
  //    case 'plus': result = firstNumber + secondNumber; break
  //   case 'minus': result = firstNumber - secondNumber; break
  //    case 'times': result = firstNumber * secondNumber; break
  //    case 'divide': result = firstNumber / secondNumber; break
  //}
  //return result.toFixed(2)
}

function clearCalculator() {
  // Press the clear key
  const clearButton = document.querySelector('[data-type="clear"]');
  clearButton.click();

  // Clear operator states
  operatorButtons.forEach((key) => {
    button.dataset.state = "";
  });
}
