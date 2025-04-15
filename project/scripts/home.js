fetch('data/news.json')
  .then(response => response.json())
  .then(news => {

    // Main article
    const mainArticle = document.querySelector('.main-article .text');
    mainArticle.innerHTML = `
      <h1>${news.mainArticle.title}</h1>
      <p>${news.mainArticle.content}</p>
      <img src="${news.mainArticle.image}" alt="Main image">
      <p>${news.mainArticle.longContent}</p>
    `;

    // Sidebar
    const sidebar = document.querySelector('.sidebar');
    news.sidebarArticles.forEach(article => {
      const articleElement = document.createElement('article');
      if (article.title) {
        articleElement.innerHTML = `<h2>${article.title}</h2><p>${article.summary}</p>`;
      } else {
        articleElement.innerHTML = `<p>${article.summary}</p><img src="${article.image}" alt="Thumbnail">`;
      }
      sidebar.appendChild(articleElement);
    });

    // Modal functionality
    const infoDetails = document.getElementById('news-details');

    function displayNewsDetail(info) {
      const infoData = news.info;  // Access JSON data

      if (infoData) {
        infoDetails.innerHTML = `
          <button id="closeModal">❌</button>
          <h2>${infoData.title}</h2>
          <p>${infoData.summary}</p>
        `;
      } else {
        infoDetails.innerHTML = '<p>No information available</p>';
      }

      infoDetails.showModal();

      const closeModal = document.getElementById('closeModal');
      closeModal.addEventListener("click", () => {
        infoDetails.close();
      });

      infoDetails.addEventListener("click", (event) => {
        if (event.target === infoDetails) {
          infoDetails.close();
        }
      });
    }

    // Attach click event to each sidebar article
    document.querySelectorAll('article').forEach((button) => {
      button.addEventListener('click', () => {
        displayNewsDetail(button.dataset.info);  // Pass the article ID
      });
    });

  })
  .catch(error => console.error('Error loading news:', error));


// Carousel

document.addEventListener("DOMContentLoaded", () => {
  fetch('data/news.json')
    .then(response => response.json())
    .then(data => {
      const carouselContainer = document.getElementById('carousel-items');
      carouselContainer.innerHTML = '';

      data.carousel.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
          <img src="${item.image}" alt="carousel image">
          <p>${item.text}</p>
        `;
        carouselContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error loading carousel:', error);
    });
});


// Worldwide news via external API

const apiKey = '7f1c567fe0bcf74fb576f09453e0ac75';
const gridContainer = document.querySelector('.grid');
let addedArticles = [];

async function fetchWorldNews() {
  try {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&max=12&topic=world&apikey=${apiKey}`
    );
    const data = await res.json();

    gridContainer.innerHTML = '';

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error('Unexpected data format');
    }

    data.articles.forEach(article => {
      if (addedArticles.includes(article.title)) return;
      addedArticles.push(article.title);

      const imageUrl = article.image || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg';

      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${imageUrl}" alt="news image" />
        <p>${article.title}</p>
      `;
      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading world news:", error);
    gridContainer.innerHTML = '<p>Unable to load news.</p>';
  }
}

window.addEventListener('DOMContentLoaded', fetchWorldNews);


// Culture and Sport via external API

const defaultImage = 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg';

const sportContainer = document.getElementById('sport-news');
const cultureContainer = document.getElementById('culture-news');

async function fetchCategoryNews(keyword, container, label) {
  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?q=${keyword}&lang=fr&max=6&apikey=${apiKey}`
    );
    const data = await res.json();

    container.innerHTML = `<h3>${label}</h3><div class="grid"></div>`;

    const grid = container.querySelector('.grid');

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('news-card');

        const image = article.image || defaultImage;

        card.innerHTML = `
          <img src="${image}" alt="image">
          <p>${article.title}</p>
        `;
        grid.appendChild(card);
      });
    } else {
      grid.innerHTML = `<p>No news available for ${label}</p>`;
    }
  } catch (err) {
    console.error(`Error loading ${label} news:`, err);
    container.innerHTML = `<h3>${label}</h3><p>Error loading ${label}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  fetchCategoryNews('sport', sportContainer, 'Sport');
  fetchCategoryNews('culture', cultureContainer, 'Culture');
});


// Confirmation

function redirectToConfirmation(event) {
  event.preventDefault();
  window.location.href = "confirmation.html";
}
