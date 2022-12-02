const getData = async () => {
  return await fetch(
    "https://freerandomapi.cyclic.app/api/v1/dogs?limit=30&page=11"
  )
    .then((res) => res.json())
    .then((data) => data.data);
};

const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.innerHTML = `      
      <div class="cardsClass">   
      <div class=card-header>
      <img class="card-header-img" src="${dog.photoUrl}">
      <div class="info-wrapper">  
      <h2> ${dog.name} </h2> 
      <div>${dog.breed} - ${dog.age}</div>  
     
      </div>
      <i class="fa-solid fa-ellipsis"></i>
      </div>
      <img  class="main-card-image" src=${dog.photoUrl} >
      <div class="below-image-bar">
      <i class="addToFav fa-sharp fa-solid fa-heart-circle-plus"></i>
      <i class="fa-regular fa-comment"></i> 
      <i class="fa-solid fa-hand-holding-dollar"></i>
      <i class="fa-solid fa-share-from-square"></i>
      </div>  
      <input class="textarea" name="" type="text" placeholder="Comment...">    
      </div>
      `;
  adoptCardsDiv.appendChild(dogDiv);
};

const createAllCards = (data) => {
  data.map((data) => {
    createSingleCard(data);
  });
  addEventListenersToFav(getFavButtons);
};

const launchCards = async () => {
  data = await getData();
  createAllCards(data);
};
launchCards();

const getFavButtons = document.getElementsByClassName("addToFav");

const addEventListenersToFav = (faveBtns) => {
  for (const button of faveBtns) {
    button.addEventListener("click", (e) => {
      let parent = e.target.parentElement.parentElement.parentElement;
      button.classList.add("fa-heart-crack");
      button.classList.remove("fa-heart-circle-plus");
      button.classList.remove("addToFav");
      button.classList.add("removeFav");
      favesDiv.append(parent);
      addEventListenersToUnFav(getRemoveFavButtons);
    });
  }
};

const getRemoveFavButtons = document.getElementsByClassName("removeFav");

const addEventListenersToUnFav = (removeBtns) => {
  for (const button of removeBtns) {
    button.addEventListener("click", (e) => {
      let parent = e.target.parentElement.parentElement.parentElement;
      adoptCardsDiv.append(parent);
      button.classList.remove("fa-heart-crack");
      button.classList.add("fa-heart-circle-plus");
      button.classList.remove("removeFav");
      button.classList.add("addToFav");
    });
  }
};

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

// this will store any element that has "[data-open]" in a node list
const openModal = document.querySelectorAll(modalOpen);

// this will store any element that has "[data-close]" in a node list
const closeModal = document.querySelectorAll(modalClose);

// for of loop to iterate through node list of queried elements and adding eventlistener to each one
for (const elm of openModal) {
  // open Modal buttons
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open; // "this" is referring to the parent Element
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  // close modal buttons
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// how to sort cards alphabetically ?
