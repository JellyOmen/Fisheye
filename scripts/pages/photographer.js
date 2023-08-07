// fetching photographers data
function getPhotographers() {
  return fetch("data/photographers.json").then((response) => response.json());
}

// displaying photographers profile data
function displayPhotographerData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const pricePerDay = document.querySelector(".pricePerDay");

  const photographerModel = photographerFactory(photographer);
  const userProfile = photographerModel.getUserProfilDOM();
  const userPicture = photographerModel.getUserPictureDOM();
  const userPrice = document.createTextNode(photographerModel.price);

  photographerHeader.insertBefore(userProfile, photographerHeader.firstChild);
  photographerHeader.appendChild(userPicture);

  pricePerDay.insertBefore(userPrice, pricePerDay.firstChild);
}

// displaying photographer work (medias)
function displayWorkData(medias) {
  const photographerWork = document.querySelector(".photograph-work");

  const works = medias.filter(
    (media) => media.photographerId == getPhotographerId()
  );

  works.forEach((media) => {
    const photographerWorkModel = photographerWorkFactory(media);
    const userWorkDOM = photographerWorkModel.getUserWorkDOM();
    photographerWork.appendChild(userWorkDOM);
  });
}

// function to get photographer id
function getPhotographerId() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params.photographer;
}
// function to add likes
function like(event) {
  const target = event.currentTarget;

  if (!target.hasAttribute("liked")) {
    target.setAttribute("liked", "");
    target.querySelector(".number-likes").textContent =
      parseInt(target.textContent) + 1;
    updateTotalLikes();
  }
}

// function to update the total number of likes
function updateTotalLikes() {
  const pictures = document.querySelector(".photograph-work");
  const likes = pictures.querySelectorAll(".number-likes");
  const totalLikesNumber = document.querySelector(".totalLikesNumber");

  let totalLikes = 0;
  likes.forEach((like) => (totalLikes += parseInt(like.textContent)));

  totalLikesNumber.textContent = totalLikes;
}

// dropdown function
function dropdown(event) {
  const button = event.currentTarget;
  const dropdown = button.parentNode;
  dropdown.classList.toggle("dropdown-open");
  if (dropdown.classList.contains("dropdown-open")) {
    button.setAttribute("aria-expanded", true);
  } else {
    button.setAttribute("aria-expanded", false);
  }
}
// selectDropdownOption function
function selectDropdownOption(event) {
  const target = event.currentTarget;
  const option = target.dataset.value;
  const dropdownList = target.parentNode;
  const dropdown = target.parentNode.parentNode;
  const button = dropdown.querySelector("button");

  const currentDropdown = dropdown.querySelectorAll(".dropdown-hide");
  for (let i = 0; i < currentDropdown.length; i++) {
    currentDropdown[i].classList.remove("dropdown-hide");
    currentDropdown[i].setAttribute("aria-selected", "false");
  }

  target.classList.add("dropdown-hide");
  target.setAttribute("aria-selected", "true");

  dropdown.dataset.value = option;
  dropdown.querySelector("button").textContent = dropdown.querySelector(
    `[data-value=${option}]`
  ).textContent;

  dropdown.classList.toggle("dropdown-open");
  if (dropdown.classList.contains("dropdown-open")) {
    button.setAttribute("aria-expanded", true);
  } else {
    button.setAttribute("aria-expanded", false);
  }
  dropdownList.setAttribute("aria-activedescendant", target.id);

  orderWork();
}

function orderWork() {
  const photographWork = document.querySelector(".photograph-work");
  let contentNodes = document.querySelectorAll(".thumb-imgfull");
  const order = document.querySelector(".dropdown").dataset.value;
  // converting the Nodelist into a true Javascript array, allowing access to the slice method
  let content = Array.prototype.slice.call(contentNodes);

  switch (order) {
    case "popularity":
      // sorting content based on the number of likes (descending order)
      content.sort(function (item, nextItem) {
        let firstNumber = parseInt(
          item.querySelector(".number-likes").textContent
        );
        let secondNumber = parseInt(
          nextItem.querySelector(".number-likes").textContent
        );
        return secondNumber - firstNumber;
      });
      break;
    case "date":
      //descending order (from most recent to older)
      content.sort(function (item, nextItem) {
        let firstString = item.querySelector("[data-date]").dataset.date;
        let secondString = nextItem.querySelector("[data-date]").dataset.date;
        return secondString.localeCompare(firstString);
      });
      break;
    case "title":
      // from A to B
      content.sort(function (item, nextItem) {
        let firstString = item
          .querySelector(".thumb-imgfull>:nth-child(2)")
          .textContent.toLowerCase();
        let secondString = nextItem
          .querySelector(".thumb-imgfull>:nth-child(2)")
          .textContent.toLowerCase();
        return firstString.localeCompare(secondString);
      });
      break;
    default:
      break;
  }

  photographWork.innerHTML = "";
  content.forEach((item) => photographWork.appendChild(item));
}

// init function
async function init() {
  // retrieving photographers data
  const { photographers, media } = await getPhotographers();

  // finding the photograph based on the id parameter of their page
  const photographer = photographers.find(
    (photographe) => photographe.id == getPhotographerId()
  );

  // displaying the photographer name in the contact form
  document.querySelector(".modal header>h2").textContent = photographer.name;
  document
    .querySelector(".modal header>h1")
    .setAttribute("arial-label", `Contact me ${photographer.name}`);

  displayPhotographerData(photographer);
  displayWorkData(media);

  orderWork();
  updateTotalLikes();
}

init();
