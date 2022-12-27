//////// FETCH / DISPLAY CARDS ////// 
let dogData;
const getData = async () => {
  dataFetch = await fetch(
    "https://freerandomapi.cyclic.app/api/v1/dogs?limit=40&page=15"
  );
  const json = await dataFetch.json();
  dogData = json.data;
  createAllCards(dogData);   
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
  dogData.map((eachDog) => {
    createSingleCard(eachDog);
  });
  moveCard();
};

/////// FAVORITE / UN-FAVORITE /////////

const main = document.getElementById("main");
const faves = document.getElementById("faves");

let favArray = [];

const moveCard = () => {
  const favButtons = document.querySelectorAll(".fa-heart-circle-plus");
  favButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const parent = e.target.parentElement.parentElement.parentElement;
      const direction =
        button.parentElement.parentElement.parentElement.parentElement.id ===
        "main"
          ? "toFaves"
          : "toMain";
      updateCollections(button.id, direction);
      updateArrays(parent, direction);
      favButtonSwap(direction, button);
      emptyCollection();
    });
  });
};

const updateCollections = (id, direction) => {
  const params = direction === "toFaves" ? [main, faves] : [faves, main];
  Object.values(params[0].children).map((item) => {
    if (item.id === id) {
      element = item;
      item.remove();
      params[1].appendChild(element);
    }
  });
};

const favButtonSwap = (direction, button) => {
  if (direction === "toFaves") {
    button.classList.remove("fa-heart-circle-plus");
    button.classList.add("fa-heart-crack");
  } else {
    button.classList.add("fa-heart-circle-plus");
  }
};

const updateArrays = (parent, direction) => {
  if (direction === "toFaves") {
    const findCardIndex = dogData.findIndex(
      (element) => element._id === parent.id
    );
    const currentDog = dogData[findCardIndex];
    dogData.splice(findCardIndex, 1);
    favArray.push(currentDog);
    totalAge(favArray);
  } else if (direction === "toMain") {
    const findCardIndex = favArray.findIndex(
      (element) => element._id === parent.id
    );
    const currentDog = favArray[findCardIndex];
    favArray.splice(findCardIndex, 1);
    dogData.push(currentDog);
    totalAge(favArray);
  }
};

const emptyCollection = () => {
  if (dogData.length === 0) {
    const empty = document.getElementById('empty');
    empty.classList.remove('not-visible')
  } else {
    empty.classList.add('not-visible');
  }
}

////////// SORTING ////////////// 

const sortButtonAZ = document.querySelector(".fa-arrow-down-a-z");
const sortedFrontwards = (dogs) => {
  dogs.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  return dogs;
};

const sortButtonZA = document.querySelector(".fa-arrow-up-z-a");
const sortedBackwards = (dogs) => {
  dogs.sort((a, b) => {
    if (b.name > a.name) {
      return 1;
    }
    if (b.name < a.name) {
      return -1;
    }
    return 0;
  });
  return dogs;
};

const sort = (AZ, ZA) => {
  AZ.addEventListener("click", () => {
    main.innerHTML = "";
    const sorted = sortedFrontwards(dogData);
    createAllCards(sorted);
  });
  ZA.addEventListener("click", () => {
    main.innerHTML = "";
    const sorted = sortedBackwards(dogData);
    createAllCards(sorted);
  });
};
sort(sortButtonAZ, sortButtonZA);

////// Total Age /////////
const getNumberDiv = document.querySelector(".number");

const totalAge = (dogs) => {
  if (favArray.length >= 0) {
    let ageArray = dogs
      .map((dog) => dog.age)
      .reduce((acc, val) => acc + val / favArray.length, 0)
      .toFixed(1);
    getNumberDiv.innerHTML = ageArray;
  }
};

////////  Open/Close Faves  ///////

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";
const notVisible = "not-visible";
const header = "header";

const openFavorites = document.querySelectorAll(modalOpen);

for (const elm of openFavorites) {
  elm.addEventListener("click", function () {
    if (favArray.length === 0) {
      alert("YOU HAVE NO FAVORITES! try adding some :) ");
    } else {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
      document.getElementById(header).classList.add(notVisible);
    }
  });
}

const closeFavorites = document.querySelectorAll(modalClose);
for (const elm of closeFavorites) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.classList.remove(isVisible);
    document.getElementById(header).classList.remove(notVisible);
  });
}
