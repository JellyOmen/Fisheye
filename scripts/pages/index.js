
async function getPhotographers() {
    // retrieving data from JSON file
    const photographers = await fetch("data/photographers.json").then((response) =>
        response.json())
        .catch((error) => console.log("Error parsing photographers: ", error));
    return photographers;
};


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Retreive photographer data
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    