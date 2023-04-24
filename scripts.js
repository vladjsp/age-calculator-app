const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const submitButton = document.getElementById('submit');
const resultYear = document.getElementById('result_year');
const resultMonth = document.getElementById('result_month');
const resultDay = document.getElementById('result_day');
const form = document.querySelector('form');
//Errors highlight
const dayEmptyErr = document.getElementById('day-req-error');
const monthEmptyErr = document.getElementById('mon-req-error');
const yearEmptyErr = document.getElementById('year-req-error');
const dayValueErr = document.getElementById('day-value-error');
const monthValueErr = document.getElementById('mon-value-error');
const yearValueErr = document.getElementById('year-value-error');
const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');

const today = new Date();

const submit = () => {
  if (
    checkEmptyField(dayInput, dayEmptyErr) ||
    checkEmptyField(monthInput, monthEmptyErr) ||
    checkEmptyField(yearInput, yearEmptyErr) ||
    valueValidation(dayInput, dayValueErr) ||
    valueValidation(monthInput, monthValueErr) ||
    valueValidation(yearInput, yearValueErr)
  ) {
    return;
  } else {
    const userDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

    let diffInMs = Math.floor(today.getTime() - userDate.getTime());

    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
    diffInMs -= years * (1000 * 60 * 60 * 24 * 365.25);
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    diffInMs -= months * (1000 * 60 * 60 * 24 * 30.44);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    resultYear.innerText = years;
    resultMonth.innerText = months;
    resultDay.innerHTML = days;

    clearInputs();
  }
};

function checkEmptyField(inputField, errorElement) {
  toggleErrorMessage(isFieldEmpty(inputField), errorElement);
  if (isFieldEmpty(inputField)) {
    return true;
  }
  return false;
}

function valueValidation(inputField, errorElement) {
  toggleErrorMessage(isValueOutOfRange(inputField), errorElement);
  if (isValueOutOfRange(inputField)) {
    return true;
  }
  return false;
}

function isFieldEmpty(inputField) {
  if (inputField.value === '') {
    return true;
  } else {
    return false;
  }
}

function isValueOutOfRange(input) {
  if (input === dayInput) {
    if (input.value > 31 || input.value < 1) {
      return true;
    }
    return false;
  }
  if (input === monthInput) {
    if (input.value <= 0 || input.value > 12) {
      return true;
    }
    return false;
  }
  if (input === yearInput) {
    if (input.value < 1930 || input.value > today.getFullYear()) {
      return true;
    }
    return false;
  }
}

function toggleErrorMessage(status, errorElement) {
  if (status) {
    errorElement.classList.remove('hide');
    errorElement.classList.add('active');
    labels.forEach((label) => label.classList.add('text-red'));
    inputs.forEach((input) => input.classList.add('border-red'));
    return;
  } else {
    errorElement.classList.add('hide');
    errorElement.classList.remove('active');
    labels.forEach((label) => label.classList.remove('text-red'));
    inputs.forEach((input) => input.classList.remove('border-red'));
  }
}

function clearInputs() {
  form.reset();
}
