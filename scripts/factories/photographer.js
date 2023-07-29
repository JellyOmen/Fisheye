function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const userLink = document.createElement("a");
    userLink.href = `photographer.html?photographer=${id}`;
    userLink.ariaLabel = name;
    userLink.setAttribute("onkeydown", "openLink(event)");

    const img = getUserPictureDOM();

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;

    const tag = document.createElement("p");
    tag.textContent = tagline;

    const dailyPrice = document.createElement("p");
    dailyPrice.textContent = `${price}$/day`;

    userLink.appendChild(img);
    userLink.appendChild(h2);
    article.appendChild(userLink);

    article.appendChild(location);
    article.appendChild(tag);
    article.appendChild(dailyPrice);
    return article;
  }

  function getUserProfilDOM() {
    const profil = document.createElement("div");
    profil.className = "photographer-profile";

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const location = document.createElement("h2");
    location.textContent = `${city}, ${country}`;
    const tag = document.createElement("p");
    tag.textContent = tagline;

    profil.appendChild(h1);
    profil.appendChild(location);
    profil.appendChild(tag);

    return profil;
  }

  function getUserPictureDOM() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `picture of ${name}`);
    img.setAttribute("loading", "lazy");
    img.className = "user";

    return img;
  }
  return { getUserProfilDOM, getUserPictureDOM, getUserCardDOM, price };
}
