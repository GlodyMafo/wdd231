
  const carouselItems = document.getElementById("carousel-items");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  let scrollAmount = 0;
  const itemWidth = 220; // largeur d’un item (image + texte + marge)

  nextBtn.addEventListener("click", () => {
    scrollAmount += itemWidth;
    carouselItems.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

  prevBtn.addEventListener("click", () => {
    scrollAmount -= itemWidth;
    if (scrollAmount < 0) scrollAmount = 0;
    carouselItems.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

