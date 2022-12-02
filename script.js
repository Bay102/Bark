const getData = async () => {
  return await fetch("https://freerandomapi.cyclic.app/api/v1/dogs?limit=30")
    .then((res) => res.json())
    .then((data) => data.data);
};

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.innerHTML = ` 
      <div class="cardsClass">   
      <h2> ${dog.name} </h2> 
      <i class="addToFav fa-sharp fa-solid fa-heart-circle-plus"></i>
      <img src=${dog.photoUrl} >
      <div class="info-wrapper">   
      <div> <strong> Breed : </strong> ${dog.breed} </div>  
      <div> <strong> Age: </strong> ${dog.age}</div> 
      </div>          
      </div>
      `;
      adoptCardsDiv.appendChild(dogDiv);  
};


const createAllCards = (data) => {
  data.map((data) => {
    createSingleCard(data);
  });
  addEventListenersToFav(getFavButtons); ///// added event listeners here .
};

const launchCards = async () => {
  data = await getData();
  createAllCards(data);
};
launchCards();


const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");
const getFavButtons =  document.getElementsByClassName("addToFav"); 
const getRemoveFavButtons = document.getElementsByClassName("removeFav"); 



const addEventListenersToFav = (favBtns) => {
  for (const button of favBtns) {
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

const addEventListenersToUnFav = (removeBtn) => {
  for (const button of removeBtn) {
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

