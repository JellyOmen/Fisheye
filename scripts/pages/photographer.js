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

async function init() {
  // retrieving photographers data
  const { photographers } = await getPhotographers();

  // finding the photograph based on the id parameter of their page
  const photographer = photographers.find(
    (photographe) => photographe.id == getPhotographerId()
  );

  displayPhotographerData(photographer);
}

init();


