
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.add("modal-show");
  modal.querySelector("img").focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.remove("modal-show");
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
