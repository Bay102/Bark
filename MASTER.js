let dogData;
const getData = async () => {
  dataFetch = await fetch(
    "https://freerandomapi.cyclic.app/api/v1/dogs?limit=5&page=11"
  );
  const json = await dataFetch.json();
  dogData = json.data;
  createAllCards(dogData);
  //   totalAge(dogData);
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
       <i id="${dog._id}" class="fa-solid fa-heart-circle-plus"></i>
       <i class="fa-regular fa-comment"></i> 
       <i class="fa-solid fa-hand-holding-dollar"></i>
       <i class="fa-solid fa-share-from-square"></i>
       </div>  
       <input class="textarea" name="" type="text" placeholder="Comment...">    
       </div>
       `;
  main.appendChild(dogDiv);
};

const createAllCards = (dogData) => {
  // try turnery here for sorting
  dogData.map((data) => {
    createSingleCard(data);
  });
  moveCard();
};

/////// FAVORITE / UN-FAVORITE /////////

const main = document.getElementById("main");
const favs = document.getElementById("favs");

const moveCard = () => {
  const favButtons = document.querySelectorAll(".fa-heart-circle-plus");
  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction =
        button.parentElement.parentElement.parentElement.parentElement.id ===
        "main"
          ? "toFavs"
          : "toMain";
      favButtonSwap(direction, button);
      updateCollections(button.id, direction);
    });
  });
};

const updateCollections = (id, direction) => {
  const params = direction === "toFavs" ? [main, favs] : [favs, main];
  Object.values(params[0].children).map((item) => {
    if (item.id === id) {
      element = item;
      item.remove();
      params[1].appendChild(element);
      dogData.splice(id);
      console.log();
    }
  });
};

const favButtonSwap = (direction, button) => {
  if (direction === "toFavs") {
    button.classList.remove("fa-heart-circle-plus");
    button.classList.add("fa-heart-crack");
  } else {
    button.classList.add("fa-heart-circle-plus");
  }
};
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
  // remove main container
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
