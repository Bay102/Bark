const allDogs = [
   { name: "zoomslayer", isFavorite: true },
   { name: "coolio", isFavorite: false },
   { name: "zoey", isFavorite: false },
   { name: "Odie", isFavorite: true },
 ];


const allDogs2 = structuredClone(allDogs);




 const isFav = (allDogs) => {
   allDogs.filter((dog) => dog.isFavorite === true);
   return allDogs
 }

 console.log(isFav(allDogs));




  
   allDogs.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    
allDogs  

  // console.log(sortedFrontwards(allDogs));