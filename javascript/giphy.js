    //create array of strings:
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
        ]


        // call renderButtons function
        renderButtons()
    /*
    // The createButton function takes data returned by Giphy and appends a button for each string in the array.
    function createButton(data) {
        // Append the newly created button to the page
        button.append(topics[i]);
        console.log(button);
        
    }

    */

    $("#button").on("click", function (event) {
    // code below prevents submitting a form when clicking on the "Submit" button
    event.preventDefault();
    // takes out the text from the user's value    
    //$("#textInput").val()

    // takes out the text from the user's value  
    //and puts it into the array.
        sportsTypes.push($("#textInput").val());
        renderButtons();

    });

    // listening for clicks for any button that is inside the sports id. Added an extra CSS selector "button" to identify the 
    // specific thing inside the sports div that was cl(icked.  Listen on the parent element to always be able to catch
    // clicks from dynamically added buttons that did not exist when page was loaded. The Submit button exists the whole
    // time so it's a good one to listen on. This is known as "Event Delegation".  Delegate the listening from something that may
    // or may not exist to something that exists the whole time. 
    $("#sports").on("click", "button", function (event) {
        // event is a jquery property, .text is a Jquery method
        // including something in the () passing the variable into the function

        // see http://api.jquery.com/text/
        var userText = $(event.target).text();
        
        //call function and pass the parameter;
        searchGiphyAPI(userText);

    });



    // Function for displaying sport gif
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
        


    function searchGiphyAPI(query) {
        
        // Did I construct the url correctly?
        // Example queryURL for Giphy API  
        const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=yXpUFSBSyo5ZTKljdu245PqedaVENLh3&q=" + query + "&limit=10&rating=pg";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        //.done expects to be passed a function or you will get an undefined error. 
        }).done(function (response) {
            console.log (response);
        });
        
    }

    // displaying results to user will be similar to the create button, except will create an image instead of a button. 
    // remember to clear the div before appending them so that you replace new pics from a fresh button click with old ones. 

    //searchGiphyAPI("");

        
    
    
    
    /*
    for(var i = 0; i < topics.length; i++){

        //this will print names of all the sports 
        console.log(sportTypes[i]);

        //create buttons using the printed string
        buttons[i] = $("<a href='#' data-theme='b' data-role='button'>" + sportTypes[i] + "</a>");       

    */