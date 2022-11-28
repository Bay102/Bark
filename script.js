// Fetch data from an API //

fetch("https://freerandomapi.cyclic.app/api/v1/dogs?limit=20")
  .then((data) => {
    return data.json();
  })
  .then((completedData) => {
    /// once the data is 'Fetched', THEN this will happen
    completedData.data.map((dog) => {
      dogCard = document.createElement("div");
      dogCard.innerHTML = ` 
      <div class="cardsClass">   
      <h2> ${dog.name} </h2> 
      <i class="addToFav fa-sharp fa-solid fa-heart-circle-plus"></i>
      <i class="removeFav fa-solid fa-heart-crack"></i> 
      <img src=${dog.photoUrl} >
      <div class="infowrapper">   
      <div> <strong> Breed : </strong> ${dog.breed} </div>  
      <div> <strong> Age: </strong> ${dog.age}</div> 
      </div>          
      </div>
      `;

      document.getElementById("adoptionCards").appendChild(dogCard);

      const favButton = dogCard.querySelector(".addToFav");
      const removeFav = dogCard.querySelector(".removeFav");
      const dogDiv = document.getElementById("faves");
      let adoptCardsDiv = document.getElementById("adoptionCards");

      removeFav.style.display = "none";

      favButton.addEventListener("click", (e) => {
        let parent = e.target.parentElement; // the parent element of the event target ?
        dogDiv.append(parent); 
        removeFav.style.display = "block";
        favButton.style.display = "none";
      });
      removeFav.addEventListener("click", (e) => {
        let parent = e.target.parentElement;
        adoptCardsDiv.append(parent);
        favButton.style.display = "block";
        removeFav.style.display = "none";
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Build function to add selected items to a favorite list

// Build a function to remove items and place back into collection
