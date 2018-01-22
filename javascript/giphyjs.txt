// Review ask how to limit request and response to only "still" and "animated gifs"
// Review ask how to implement the switch between and a still and an animated gif with a button click.  


// create array of strings:
var sportsTypes = [    
  "swimming",
  "football",
  "skiing",
  "volleyball",
  "baseball",
  "lacrosse",
  "soccer",
  "handball",
  "ice skating",
  "golf",
];
    
// call renderButtons function
renderButtons();

/*
  
// The createButton function takes data returned by Giphy and appends a button for each string in the array.
function createButton(data) {
// Append the newly created button to the page
button.append(topics[i]);
console.log(button);
}
*/

// This is required to add a new sport, which only adds a new
// button to the array, and calls renderButtons() method.
$("#button").on("click", function (event) {
  event.preventDefault();

  // takes out the text from the user's value
  // and puts it into the array.
  sportsTypes.push($("#textInput").val());
  renderButtons();
});
    
       
// end of new 1/12/ code    
// listening for clicks for any button that is inside the sports id. Added an extra CSS selector "button" to identify the    
// specific thing inside the sports div that was clicked.  Listen on the parent element to always be able to catch    
// clicks from dynamically added buttons that did not exist when page was loaded. The Submit button exists the whole    
// time so it's a good one to listen on. This is known as "Event Delegation".  Delegate the listening from something that may    
// or may not exist to something that exists the whole time.
    
$("#sports").on("click", "button", function (event) {
  // event is a jquery property, .text is a Jquery method    
  // including something in the () passing the variable into the function
  // see http://api.jquery.com/text/
    
  var userText = $(event.target).text();
  // added 1/12
  // Grabbing and storing the sports value from the button    
  var query = $(this).attr("data-name");
  
  // Constructing a queryURL using the sport name    
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=yXpUFSBSyo5ZTKljdu245PqedaVENLh3&q=" + query + "&limit=10&rating=pg";
  
  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,    
    method: "GET"    
  })
  // After data comes back from the request
  .then(function(response) {
    console.log(queryURL);  
    console.log(response);
  
    // storing the data from the AJAX request in the results variable
    var results = response.data;
  
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
      // Creating and storing a div tag
      var sportsDiv = $("<div>");
      //use the .gif class in the css file to style & align the gifs.
      sportsDiv.addClass("gif");
      
      // Creating a paragraph tag with the result item's rating    
      var rating = $("<div>").text("Rating: " + results[i].rating);
      // use the .rating class in the css file to style & align the ratings for each gif.
      rating.addClass("rating");

      // Creating and storing an image tag
      var sportsImage = $("<img>");

      // Setting the src attribute of the image to a property pulled off the result item
      sportsImage.attr("src", results[i].images.fixed_height_still.url);

      // ********************************************************
      // Pausing functionality **********************************
      sportsImage.attr("data-animate", results[i].images.fixed_height.url);
      sportsImage.attr("data-still", results[i].images.fixed_height_still.url);
      sportsImage.attr("data-state", "still"); // show still gif initially

      sportsImage.on("click", function() {
        var state = $(this).attr("data-state");
        if(state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
        else {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
      });
      // Pausing functionality done *****************************
      // ********************************************************
    
      // Appending the paragraph and image tag to the sportsDiv
      sportsDiv.append(rating);
      sportsDiv.append(sportsImage);

      // Prependng the sportsDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(sportsDiv);
    }
  });
});
    
// Function for displaying sport button    
function renderButtons() {
  // Deleting the sport buttons prior to adding new sport buttons    
  // to prevent having repeat buttons    
  $("#sports").empty();

  // Looping through the array of topics
  for (var i = 0; i < sportsTypes.length; i++) {
    // Then dynamically generate buttons for each sport in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");

    // Adding a class
    a.addClass("sport");

    // Adding a data-attribute with a value of the sport at index i
    a.attr("data-name", sportsTypes[i]);

    // Providing the button's text with a value of the sport at index i
    a.text(sportsTypes[i]);
    
    // Adding the button to the HTML
    $("#sports").append(a);
  }
}