const getData = async () => {
  return await fetch("https://freerandomapi.cyclic.app/api/v1/dogs?limit=30")
    .then((res) => res.json())
    .then((data) => data.data);
};

const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.innerHTML = ` 
      <div class="cardsClass">   
      <h2> ${dog.name} </h2> 
      <div class="info-wrapper">   
      <div> <strong> Breed : </strong> ${dog.breed} </div>  
      <div> <strong> Age: </strong> ${dog.age}</div> 
      </div>  
      <img src=${dog.photoUrl} >
      <i class="addToFav fa-sharp fa-solid fa-heart-circle-plus"></i>     
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
      let parent = e.target.parentElement.parentElement;
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
      let parent = e.target.parentElement.parentElement;
      adoptCardsDiv.append(parent);
      button.classList.remove("fa-heart-crack");
      button.classList.add("fa-heart-circle-plus");
      button.classList.remove("removeFav");
      button.classList.add("addToFav");
    });
  }
};








const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

// this will store any element that has "[data-open]" in a node list 
const openModal = document.querySelectorAll(modalOpen);

// this will store any element that has "[data-close]" in a node list 
const closeModal = document.querySelectorAll(modalClose);

//
// const closeService = document.querySelectorAll(serviceClose);


// for of loop to iterate through node list of queried elements above 
//  and adding eventlistener to each one 
for (const elm of openModal) { // open Modal buttons
   elm.addEventListener('click', function() {
      const modalId = this.dataset.open;  // "this" is referring to the parent Element
      document.getElementById(modalId).classList.add(isVisible)
   })
}

for (const elm of closeModal) { // close modal buttons 
   elm.addEventListener('click', function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible)
   })
}