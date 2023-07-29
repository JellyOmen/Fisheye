// fetching photographers data
async function getPhotographers() {
  return fetch("data/photographers.json").then((response) => response.json());
}

// display photographers profile data
async function displayPhotographerData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(photographer);
  const userProfile = photographerModel.getUserProfilDOM();
  const userPicture = photographerModel.getUserPictureDOM();

  photographerHeader.insertBefore(userProfile, photographerHeader.firstChild);
  photographerHeader.appendChild(userPicture);
}

// Get photographer id
function getPhotographerId() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params.photographer;
}


// displaying photographer work (medias)
async function displayWorkData(medias) {
  const photographerWork = document.querySelector(".photograph-work");

  const works = medias.filter((media) => media.photographerId == getPhotographerId());

  works.forEach((media) => {
    const photographerWorkModel = photographerWorkFactory(media);
    const userWorkDOM = photographerWorkModel.getUserWorkDOM();
    photographerWork.appendChild(userWorkDOM);
  });
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

// init function
async function init() {
  // retrieving photographers data
  const { photographers, media } = await getPhotographers();

  // finding the photograph based on the id parameter of their page
  const photographer = photographers.find((photographe) => photographe.id == getPhotographerId());

  displayPhotographerData(photographer);
  displayWorkData(media);
}

init();

  