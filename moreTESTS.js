
let dogData; 
const getData = async () => {
  dataFetch = await fetch(
    "https://freerandomapi.cyclic.app/api/v1/dogs?limit=30&page=11"
  );
  const json = await dataFetch.json(); 
  dogData = json.data; 
  createAllCards(dogData);
  totalAge(dogData);
   
  };
getData();

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.classList.add('dog');
  dogDiv.setAttribute('id', dog._id);
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

const createAllCards = (dogData) => {
  dogData.map((data) => {
    createSingleCard(data);
  });
  addEventListenersToFav(getFavButtons);
};

const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");
const getFavButtons = document.getElementsByClassName("addToFav");
const getRemoveFavButtons = document.getElementsByClassName("removeFav");

/////// FAVORITE / UN-FAVORITE /////////     on click need to remove current card from dogData
const addEventListenersToFav = (faveBtns) => {
  for (const button of faveBtns) {
    button.addEventListener("click", (e) => {
      let parent = e.target.parentElement.parentElement.parentElement;
      button.classList.remove("fa-heart-circle-plus");
      button.classList.add("fa-heart-crack");
      button.classList.remove("addToFav");
      button.classList.add("removeFav");
      favesDiv.append(parent);
      /// remove current dog card here from original dogData
      const cardIndex = dogData.findIndex((element => element._id === parent.id));  
      dogData.splice(cardIndex, 1); 

      console.log(cardIndex);
      console.log(dogData);
     
      addEventListenersToUnFav(getRemoveFavButtons);
    });
  }
};

const addEventListenersToUnFav = (removeBtns) => {
  for (const button of removeBtns) {
    button.addEventListener("click", (e) => {
      let parent = e.target.parentElement.parentElement.parentElement;
      adoptCardsDiv.append(parent);
      button.classList.remove("fa-heart-crack");
      button.classList.add("fa-heart-circle-plus");
      button.classList.remove("removeFav");
      button.classList.add("addToFav");


    // need to add card back to dogCard Array - needs to be an object  
      dogData.push()
      console.log(parent);
      console.log(parent.id)
      console.log(dogData);
    });
  }
};

const favTracker = document.getElementById('favorite');
// favTracker

////////// SORTING //////////////  

// when sort is clicked , need to sort the cards living AdoptionDiv & FavDiv

// need to grab and track the adoptionCardsDiv & favsDiv separately and sort only those cards

const sortButtonAZ = document.querySelector(".fa-arrow-down-a-z");

let sortedFrontwards = (dogs) => {
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

//////////  SORTING EVENT LISTENERS /////////////////
// const addEventListenersSorting = (AZ, ZA) => {
//   for (const button of AZ) {
//     button.addEventListener("click", () => {
//       sortedFrontwards(dogs)
//     });
//   }
// //   for (const button of ZA) {
// //     button.addEventListener("click", () => {
// //       launchSortCardsZA();
// //     });
// //   }
// };
// addEventListenersSorting(sortButtonAZ, sortButtonZA);

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


