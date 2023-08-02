/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
function handleKeyDown(event) {
  switch (event.key) {
    case "Enter":
      return true;
      break;
    case " ":
      event.preventDefault();
      return true;
      break;
    default:
      return false;
      break;
  }
}

function openlink(event) {
  if (event.key === " ") {
    event.preventDefault();
    window.open(event.currentTarget.href, "_self");
  }
}
