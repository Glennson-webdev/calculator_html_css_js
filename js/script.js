const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector(".buttons");
const display = calculator.querySelector(".userInput");
const operatorButtons = buttons.querySelectorAll('[data-type="operator"]');

buttons.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const button = event.target;
  //console.log(button.textContent)
  const buttonValue = button.textContent;
  const displayValue = display.textContent;
  const { type } = button.dataset;
  const { previousButtonType } = calculator.dataset;

  //is this a number type?
  if (type === "number") {
    if (displayValue === "0" || previousButtonType === "operator") {
      //replace displayValue with buttonValue pressed
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

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = button.dataset.key;
  }

  if (type === "equal") {
    //perform calculation
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    display.textContent = calculate(firstNumber, operator, secondNumber);
    console.log(firstNumber, operator, secondNumber);
  }

  if (type === "clear") {
    display.textContent = "0";
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }

  calculator.dataset.previousButtonType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);

  if (operator === "plus") return firstNumber + secondNumber;
  if (operator === "minus") return firstNumber - secondNumber;
  if (operator === "times")
    return Math.round(firstNumber * secondNumber * 100) / 100;
  if (operator === "divide")
    return Math.round((firstNumber / secondNumber) * 100) / 100;
}
