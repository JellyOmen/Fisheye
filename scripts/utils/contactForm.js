/* eslint-disable no-unused-vars */
// trapping focus inside modal

const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector("#contact_modal"); // select the modal by it's id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener("keydown", function (e) {
  let isTabPressed = e.key === "Tab";

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();

let IsFormContactKeyListenerActive = false;
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    IsFormContactKeyListenerActive ? closeModal() : undefined;
  }
});

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.add("modal-show");
  modal.querySelector("img").focus();
  IsFormContactKeyListenerActive = true;
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.remove("modal-show");
  setTimeout(() => document.querySelector("main .contact_button").focus(), 50);
  IsFormContactKeyListenerActive = false;
}

function getFormData() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let yourMessage = document.getElementById("yourMessage").value;
  let data = { firstName, lastName, email, yourMessage };
  resetFormData();

  return data;
}

function resetFormData() {
  document.getElementById("firstName").value =
    document.getElementById("lastName").value =
    document.getElementById("email").value =
    document.getElementById("yourMessage").value =
      "";
}

function sendForm(event) {
  event.preventDefault();

  console.log(getFormData());

  closeModal();
  return false;
}
