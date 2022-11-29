// Fetch data from an API //

const createCards = (dog) => {
  dogDiv = document.createElement("div");
  dogDiv.innerHTML = ` 
  <div class="cardsClass">   
  <h2> ${dog.name} </h2> 
  <i class="addToFav fa-sharp fa-solid fa-heart-circle-plus"></i>
  <i class="removeFav fa-solid fa-heart-crack"></i> 
  <img src=${dog.photoUrl} >
  <div class="info-wrapper">   
  <div> <strong> Breed : </strong> ${dog.breed} </div>  
  <div> <strong> Age: </strong> ${dog.age}</div> 
  </div>          
  </div>
  `;
  
  document.getElementById("adoptionCards").appendChild(dogDiv);
}

  

  const dogsFetch = () => {
   fetch("https://freerandomapi.cyclic.app/api/v1/dogs?limit=20")
  .then((data) => {
    return data.json();
  })
  .then((completedData) => {
    completedData.data.map((dog) => {
      createCards(dog); 

    });
  })
  .catch((err) => {
    console.log(err);
  }); 
  }
  dogsFetch();
  
  const favesDiv = document.getElementById("faves");   
  const adoptCardsDiv = document.getElementById("adoptionCards"); 

 
  let favButton = document.querySelectorAll(".addToFav"); console.log(favButton); 
  let removeFav = document.querySelectorAll(".removeFav"); console.log(removeFav);
 



// const favoriteDog = () => { 
//    .addEventListener("click", (e) => {
// //       let parent = e.target.parentElement; // the parent element of the event target ?
// //       dogDiv.append(parent);
// //       removeFav.style.display = "block";
// //       favButton.style.display = "none";
// //     });
// // };

// //   favoriteDog();


  //  removeFav.style.display = "none";

      // favButton.addEventListener("click", (e) => {
      //   let parent = e.target.parentElement; // the parent element of the event target ?
      //   dogDiv.append(parent);
      //   removeFav.style.display = "block";
      //   favButton.style.display = "none";
      // });
      // removeFav.addEventListener("click", (e) => {
      //   let parent = e.target.parentElement;
      //   adoptCardsDiv.append(parent);
      //   favButton.style.display = "block";
      //   removeFav.style.display = "none";
      // });
 

// Build function to add selected items to a favorite list

// Build a function to remove items and place back into collection


  
