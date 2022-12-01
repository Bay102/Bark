const getData = async () => {
  return await fetch("https://freerandomapi.cyclic.app/api/v1/dogs?limit=30")
    .then((res) => res.json())
    .then((data) => data.data);
};

const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");
const getFavButtons = () => document.getElementsByClassName("addToFav");
const getRemoveFavButtons = () => document.getElementsByClassName("removeFav");

const addEventListeners = (favBtns, removeBtns) => {
  for (const button of favBtns) {
    button.addEventListener("click", (e) => {
      let parent = e.target.parentElement.parentElement;
      favesDiv.append(parent);
      button.classList.add("is-not-visible");
      for (const button of removeBtns) {
        button.classList.remove('is-not-visible')
      }
    });
  }
  for (const button of removeBtns) {
    button.addEventListener("click", (e) => {
      let parent = e.target.parentElement.parentElement;
      adoptCardsDiv.append(parent);
      button.classList.remove("is-not-visible");
      for (const buttons of favBtns) {
        buttons.classList.remove('is-not-visible')
      }
    });
  }
};

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.innerHTML = ` 
      <div class="cardsClass">   
      <h2> ${dog.name} </h2> 
      <i class="addToFav  fa-sharp fa-solid fa-heart-circle-plus"></i>
      <i class="removeFav is-not-visible fa-solid fa-heart-crack"></i> 
      <img src=${dog.photoUrl} >
      <div class="info-wrapper">   
      <div> <strong> Breed : </strong> ${dog.breed} </div>  
      <div> <strong> Age: </strong> ${dog.age}</div> 
      </div>          
      </div>
      `;
  addEventListeners(getFavButtons(), getRemoveFavButtons());
  adoptCardsDiv.appendChild(dogDiv);
};

const createAllCards = (data) => {
  data.map((data) => {
    createSingleCard(data);
  });
};

const launchCards = async () => {
  data = await getData();
  createAllCards(data);
};
launchCards();

// addEventListeners(getFavButtons(),getRemoveFavButtons())
