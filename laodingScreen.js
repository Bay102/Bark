
 
//   .loading-screen {
//     display: none; /* Hide the loading screen by default */
//     background-color: #fff; /* Set the background color */
//     position: fixed; /* Position the element on the page */
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: 9999; /* Set a high z-index to ensure the loading screen is displayed on top of other elements */
//   }

//   /* Add a loading spinner to the loading screen */
//   .loading-screen .spinner {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }





  // Show the loading screen when the page is loading
  window.addEventListener("load", function() {
    document.querySelector(".loading-screen").style.display = "block";
  });

  // Hide the loading screen when the page has finished loading
  window.addEventListener("load", function() {
    setTimeout(function() {
      document.querySelector(".loading-screen").style.display = "none";
    }, 3000); // Hide the loading screen after 1 second
  });





