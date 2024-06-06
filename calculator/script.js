// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let state = {
        currentValue: '',
        storedValue: '',
        operator: '',
        resultDisplayed: false
    };
    const maxDigits = 15;

    const updateDisplay = () => {
        display.innerText = state.currentValue.length > maxDigits ? 'Error' : state.currentValue;
    };

    const appendNumber = (number) => {
        if (state.resultDisplayed) {
            state.currentValue = number;
            state.resultDisplayed = false;
        } else if (state.currentValue.length < maxDigits) {
            state.currentValue += number;
        }
        updateDisplay();
    };

    const setOperator = (op) => {
        if (state.currentValue === '') return;
        if (state.storedValue && !state.resultDisplayed) {
            calculateResult();
        }
        state.operator = op;
        state.storedValue = state.currentValue;
        state.currentValue = '';
        display.innerText = `${state.storedValue} ${state.operator}`;
    };

    const clearCalculator = () => {
        state = {
            currentValue: '',
            storedValue: '',
            operator: '',
            resultDisplayed: false
        };
        updateDisplay();
    };

    const calculateResult = () => {
        if (!state.currentValue || !state.storedValue || !state.operator) return;
        let result;
        const num1 = parseFloat(state.storedValue);
        const num2 = parseFloat(state.currentValue);

        switch (state.operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return;
        }

        state.currentValue = result.toString().slice(0, maxDigits);
        if (state.currentValue.length > maxDigits) {
            state.currentValue = 'Error';
        }
        state.operator = '';
        state.storedValue = '';
        state.resultDisplayed = true;
        updateDisplay();
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (button.classList.contains('operator')) {
                setOperator(value);
            } else if (button.classList.contains('clear')) {
                clearCalculator();
            } else if (button.classList.contains('equal')) {
                calculateResult();
            } else {
                appendNumber(value);
            }
        });
    });

    clearCalculator(); // Initialize display on load
});
