// ДЗ выполнено, дополнительно добавлена возможность ввода с клавиатуры

const display = document.getElementById("display");
const btnsDigits = document.getElementsByClassName("btn-digit");
const btnsActions = document.getElementsByClassName("btn-action");
const btnResult = document.getElementById("btn-result");
const btnDot = document.getElementById("btn-dot");
const btnClearAll = document.getElementById("btn-clear-all");
const btnBack = document.getElementById("btn-back");
const btns = document.querySelectorAll(".btn");

let currentValue = "";
let firstValue = null;
let secondValue = null;
let currentAction = "";

// функция перебирает все кнопки калькулятора и навешивает событие,
// чтобы убирать фокус с кнопки после нажатия
const bindEventsBtns = () => {
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      btn.blur();
    })
  );
};

// функция воода числа
const inputDigit = (digit) => {
  currentValue += digit;
  display.innerText = currentValue;
};

// функция ввода действия
const inputAction = (action) => {
  if (currentAction === "") {
    currentAction = action;

    if (firstValue === null) {
      firstValue = parseFloat(currentValue);
    } else {
      secondValue = parseFloat(currentValue);
    }

    currentValue = "";
    display.innerText = 0;
  } else {
    secondValue = parseFloat(currentValue);
    currentValue = "";
    firstValue = calculate(firstValue, secondValue, currentAction);
    display.innerText = firstValue;
    currentAction = action;
  }
};

// функция ввода точки
const inputDot = () => {
  const indexDot = currentValue.indexOf(".");
  if (indexDot === -1) {
    if (currentValue === "") {
      currentValue = "0.";
    } else {
      currentValue += ".";
    }
    display.innerText = currentValue;
  }
};

// функция удаления последнего символа ввода
const inputBack = () => {
  if (currentValue.length <= 1) {
    currentValue = "";
    display.innerText = 0;
  } else {
    currentValue = currentValue.substring(0, currentValue.length - 1);
    display.innerText = currentValue;
  }
};

// функция очистки значений
const clearValues = () => {
  firstValue = null;
  secondValue = null;
  currentAction = "";
  currentValue = "";
  display.innerText = "0";
};

// функция перебора всех кнопок цифр и навешивания на них события
const bindEventsBtnsDigits = () => {
  for (let i = 0; i < btnsDigits.length; i++) {
    const btn = btnsDigits[i];
    const digit = btn.dataset.digit;
    btn.addEventListener("click", () => inputDigit(digit));
  }
};

// функция перебора всех кнопок действий и навешивания на них события
const bindEventsBtnsActions = () => {
  for (let i = 0; i < btnsActions.length; i++) {
    const btn = btnsActions[i];
    const action = btn.dataset.action;
    btn.addEventListener("click", () => inputAction(action));
  }
};

// функция возвращает рассчет значения
const calculate = (first, second, action) => {
  if (first !== null && second !== null) {
    let result;

    switch (action) {
      case "+":
        result = first + second;
        break;

      case "-":
        result = first - second;
        break;

      case "*":
        result = first * second;
        break;

      case "/":
        if (second === 0) {
          result = "Бесконечность";
          break;
        } else {
          result = first / second;
          break;
        }

      case "%":
        result = first % second;
        break;

      case "^":
        result = Math.pow(first, second);
        break;

      case "√":
        result = Math.sqrt(second);
        break;
    }

    return result;
  }

  return "Некорректные значения";
};

// функция вывода результата
const result = () => {
  secondValue = parseFloat(currentValue);
  firstValue = calculate(firstValue, secondValue, currentAction);
  display.innerText = firstValue;
  currentValue = "";
  currentAction = "";
  secondValue = null;
};

// навешивание события на кнопку равно
btnResult.addEventListener("click", result);

// навешивание события на кнопку точки
btnDot.addEventListener("click", inputDot);

// навешивание события на кнопку Стереть
btnBack.addEventListener("click", inputBack);

// навешивание события на кнопку Очистить все
btnClearAll.addEventListener("click", clearValues);

// навешиваем событие на нажатие клавиш
document.body.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key >= 0 && key <= 9) {
    inputDigit(key);
  } else if (
    key === "+" ||
    key == "-" ||
    key === "*" ||
    key === "/" ||
    key === "^" ||
    key === "%"
  ) {
    inputAction(key);
  } else if (key === "." || key === ",") {
    inputDot();
  } else if (key === "Enter") {
    result();
  } else if (key === "Backspace") {
    inputBack();
  } else if (key === "Escape") {
    clearValues();
  }
});

bindEventsBtns();
bindEventsBtnsDigits();
bindEventsBtnsActions();

//  ДЗ:
// Учитывать то что можно считать последовательно
// Пример: 5 * 5 + 10
//
// --- Добавить точку ---
// нажимая но точку нужно учитывать
// есть ли уже точка, если да, то точку не ставить
// если нет, то ставим
// где ставится точка
// если точка ставится когда ничего нет в currentValue
//  то нужно записать 0.124
// если поставили точку в самом конце то значение должно быть 123.0
//
// --- Расширить список действий ---
// добавить матдействий каких хочется
