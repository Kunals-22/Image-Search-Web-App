const apiKey = "GySyOEOBBl_Hpz31ZQ6hdZJctMrhDMvnpz7UYCD2sN8";

const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("showmore-btn");
const search = document.getElementById("search-button");
const bookMark = document.querySelector('#bookmark')

let inputData;
let page = 1;
let data;
let resultId;

async function searchImages() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  const response = await fetch(url);
  data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  createCards();
}

function createCards() {
  const results = data.results;
  resultId = data.results.id;
  results.map((results) => {
    return searchResults.innerHTML += 
        `<div class="search-cards">
          <img src="${results.urls.small}" />
          <div class="img-info">
            <a href="${results.links.html}" target="_blank" rel="noopener noreferrer">${results.alt_description}</a>
            <button onclick="saveBookmark(${data.results.id})" id="bookmark">
              <i class="fa-regular fa-bookmark">
            </i></button>
          </div>
        </div>`
  // <i id="bookmark" onclick="saveBookmark(${resultId})" class="fa-regular fa-bookmark"></i>
    // const imageWrapper = document.createElement("div");
    // imageWrapper.classList.add("search-cards");

    // const image = document.createElement("img");
    // image.src = results.urls.small;
    // image.alt = results.alt_description;

    // const imgLink = document.createElement("a");
    // imgLink.href = results.links.html;
    // imgLink.setAttribute("target", "_blank");
    // imgLink.textContent = results.alt_description;

    // searchResults.appendChild(imageWrapper);
    // imageWrapper.appendChild(image);
    // imageWrapper.appendChild(imgLink);
  });
  page++;
  console.log(page);

  if (page > 1 && inputData !== "") {
    showMore.style.display = "block";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputData === "") {
    showMore.style.display = "none";
  }
  searchImages();
  refreshPage();
});

showMore.addEventListener("click", (e) => {
  searchImages();
});

function refreshPage(){
  if(page > 1){
    searchResults.innerHTML="";
  }
}

function saveBookmark(){
  console.log(this.resultId)
}
// saveBookmark()