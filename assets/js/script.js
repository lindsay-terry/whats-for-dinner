$(document).foundation(); // Allows modal to open

// URL to fetch random meal
const mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'; 

//fetch random meal and log data to console
fetch(mealApiUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
})

//Meal card coding here




















//Drink card coding
//Event listener for submit button in dropdown menu
$('#drink-form').on('click', function(event) {
    event.preventDefault();
   fetchDrinkList();

});

//Function to retrieve drink lists based on alcohol type
function fetchDrinkList() {
    const drinkChoice = $('#drink-options').val();
    //drink API Urls
    const nonAlcoholic = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    const drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkChoice}`;
    if ( drinkChoice === "Non_Alcoholic") {
    fetch(nonAlcoholic)
    .then(function(response) {
    return response.json();
})
    .then(function (data) {
    displayDrinkList(data);
})
    } else if (drinkChoice) { 
        fetch(drinkApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayDrinkList(data);
        })
    }
}

//Display list of drinks on screen based on user selection
function displayDrinkList(drinks) {
    console.log(drinks.drinks);
    const drinksList = drinks.drinks;
    const drinkDiv = $('#drink-div');
    drinkDiv.empty();

    for (drinks of drinksList) {
        
        const drinkEntry = document.createElement('div');
        const drinkTitle = document.createElement('h5');

        drinkTitle.setAttribute("class", "drink-title");
        drinkTitle.setAttribute("data-drink-id", drinks.idDrink);

        drinkTitle.textContent = drinks.strDrink;
        drinkEntry.append(drinkTitle);
        drinkDiv.append(drinkEntry);
    }
}

// might change name of this function
// Purpose is to retrieve ID from clicked on drink, from the rendered list
function renderDrinkCard(event) {
    
    const drinkId = event.target.getAttribute("data-drink-id");
    console.log(drinkId);


    const drinkIdUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(drinkIdUrl)
    .then(function(response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    })
    }


// Event listener to render clicked on drink
$('#drink-div').on("click", ".drink-title", renderDrinkCard);



//Fetch template
// fetch()
// .then(function(response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// })