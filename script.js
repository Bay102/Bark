const favesDiv = document.getElementById("faves");
const adoptCardsDiv = document.getElementById("adoptionCards");
const favButton = document.getElementsByClassName("addToFav");
const removeFav = document.getElementsByClassName("removeFav");

const getData = async () => {
  return await fetch("https://freerandomapi.cyclic.app/api/v1/dogs?limit=30")
    .then((res) => res.json())
    .then((data) => data.data);
};

function eventListeners(className,div) {
  for (const elm of className) {
    elm.addEventListener("click", (e) => {
      let parent = e.target.parentElement;
      div.append(parent);
    });
  }
}


// function add(className) {
//   for (const elm of className) {
//     elm.addEventListener("click", (e) => {
//       let parent = e.target.parentElement;
//       favesDiv.append(parent);
//     });
//   }
// }

// function remove(className) {
//   for (const elm of className) {
//     elm.addEventListener("click", (e) => {
//       let parent = e.target.parentElement;
//       adoptCardsDiv.append(parent);
//     });
//   }
// }

const createSingleCard = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.innerHTML = ` 
      <div class="cardsClass">   
      <h2> ${dog.name} </h2> 
      <i class="addToFav fa-sharp fa-solid fa-heart-circle-plus" onClick="add"></i>
      <i class="removeFav fa-solid fa-heart-crack"></i> 
      <img src=${dog.photoUrl} >
      <div class="info-wrapper">   
      <div> <strong> Breed : </strong> ${dog.breed} </div>  
      <div> <strong> Age: </strong> ${dog.age}</div> 
      </div>          
      </div>
      `;
      eventListeners(favButton, favesDiv);
      eventListeners(removeFav, adoptCardsDiv)
  // add(favButton);
  // remove(removeFav);

  adoptCardsDiv.appendChild(dogDiv);
};

const createAllCards = (data) => {
  data.map((data) => {
    createSingleCard(data);
  });
};

// const addEventListeners = (className) => {
//  const querySel = document.querySelector(className)
//  className.querySel.addEventListener('click', (e) => {

//  })
// }

const createInitialAppState = async () => {
  data = await getData();
  createAllCards(data);
};
createInitialAppState();

// removeFav.style.display = "none";

//       favButton.addEventListener("click", (e) => {
//         let parent = e.target.parentElement; // the parent element of the event target ?
//         dogDiv.append(parent);
//         removeFav.style.display = "block";
//         favButton.style.display = "none";
//       });
//       removeFav.addEventListener("click", (e) => {
//         let parent = e.target.parentElement;
//         adoptCardsDiv.append(parent);
//         favButton.style.display = "block";
//         removeFav.style.display = "none";
//       });
