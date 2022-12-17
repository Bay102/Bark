let dogData;
const getData = async () => {
  dataFetch = await fetch(
    "https://freerandomapi.cyclic.app/api/v1/dogs?limit=5&page=11"
  );
  const json = await dataFetch.json();
  dogData = json.data;
  createAllCards(dogData);
  totalAge(dogData);
};
getData();

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.classList.add("dog");
  dogDiv.setAttribute("id", dog._id);
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
       <img class="main-card-image" src=${dog.photoUrl} >
       <div class="below-image-bar">
       <i data-fav="${dog._id}" class="fa-solid fa-heart-circle-plus"></i>
       <i class="fa-regular fa-comment"></i> 
       <i class="fa-solid fa-hand-holding-dollar"></i>
       <i class="fa-solid fa-share-from-square"></i>
       </div>  
       <input class="textarea" name="" type="text" placeholder="Comment...">    
       </div>
       `;
  adoptCardsDiv.appendChild(dogDiv);
};

const createAllCards = (dogData) => { // try turnery here for sorting 
  dogData.map((data) => {
   createSingleCard(data);

  });
  // addEventListenersToFav(getFavButtons);
};

/////// FAVORITE / UN-FAVORITE /////////

const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");
const getFavButtons = document.getElementsByClassName("fa-heart-circle-plus");

const favArray = [];



const addEventListenersToFav = (favoriteButtons) => {
   for (const button of favoriteButtons) {
    button.addEventListener("click", (e) => {
      button.setAttribute("class", "fa-solid fa-heart-crack");
      const parent = e.target.parentElement.parentElement.parentElement;
      const itemId = parent.id; 

      const findCardIndex = dogData.findIndex((element) => element._id === parent.id );
      const currentDog = dogData[findCardIndex];

      dogData.splice(findCardIndex, 1);
      favArray.push(currentDog);
      favesDiv.append(parent);  // try pushing parent into a new card instead //first event listener is never removed 
      console.log('fav');
      
      unFav(button);     
    });
  }      
};

// const unFav = (button) => {
//   button.addEventListener("click", (e) => {
//     const parent = e.target.parentElement.parentElement.parentElement;
//      buttonParent = e.target; console.log(buttonParent);
//     if (button.dataset.fav === parent.id) {
//       button.setAttribute("class", "fa-solid fa-heart-circle-plus");
//       console.log("UnFav Working");
//     }
//     const findCardIndex = favArray.findIndex((element) => element._id === parent.id);

//     const currentDog = favArray[findCardIndex];
//     favArray.splice(findCardIndex, 1);
//     dogData.push(currentDog);
//     adoptCardsDiv.append(parent);
//   });
// };



////////// SORTING //////////////

// when sort is clicked , need to sort the cards living AdoptionDiv & FavDiv

// need to grab and track the adoptionCardsDiv & favsDiv separately and sort only those cards

// maybe use an if statement in the creating all cards function,

const sortButtonAZ = document.querySelector(".fa-arrow-down-a-z");

const sortedFrontwards = (dogs) => {
  sortedAZ = dogs.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  return sortedAZ;
};

sortButtonAZ.addEventListener("click", () => {
  sortedFrontwards(dogData);
});

const sortButtonZA = document.getElementsByClassName("fa-arrow-up-z-a");

const sortedBackwards = async () => {
  let data = dogs;
  sortedZA = data.sort((a, b) => {
    if (b.name > a.name) {
      return 1;
    }
    if (b.name < a.name) {
      return -1;
    }
    return 0;
  });
  return sortedZA;
};

const launchSortCardsZA = async () => {
  const data = await sortedBackwards();
  createAllCards(data);
};

////// Total Age /////////
const getNumberDiv = document.querySelector(".number");

function totalAge(dogs) {
  ageArray = dogs.map((dog) => dog.age).reduce((acc, val) => acc + val);
  getNumberDiv.innerHTML = ageArray;
}

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

// this will store any element that has "[data-open]" in a node list
const openFavorites = document.querySelectorAll(modalOpen);

// this will store any element that has "[data-close]" in a node list
const closeFavorites = document.querySelectorAll(modalClose);

// for of loop to iterate through node list of queried elements and adding eventlistener to each one
for (const elm of openFavorites) {
  // open Modal buttons
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open; // "this" is referring to the parent Element
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeFavorites) {
  // close modal buttons
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// setTimeout(() => {
//   console.log(dogData);
// }, 4000);
