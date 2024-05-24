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
    createMealCard(data);
})

//Meal card coding here
const cardsContainer = document.querySelector("#cards-container"); //connects to div id in HTML where we will display the data

function createMealCard (meals) { //function for creating card elements

        console.log(meals.meals);
        const mealsArray = meals.meals;
        const mealData = mealsArray[0];
       
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('flex-container');

        

        const mealName = document.createElement('h4');
        mealName.classList.add('card-divider');

        const mealImg = document.createElement('img');
        mealImg.setAttribute('src', `${mealsArray[0].strMealThumb}/preview`);
        mealImg.setAttribute('style','width:200px; display:inline');

        card.appendChild(mealName);
        mealName.textContent = mealsArray[0].strMeal;

        card.appendChild(mealImg);

        const ingredientList = document.createElement('ul');
       ingredientList.setAttribute('class', 'inline-list');
       card.appendChild(ingredientList);

        for (let i=1; i<=20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measurement = mealData[`strMeasure${i}`];
        if (ingredient && measurement) {
            console.log(`${measurement} ${ingredient}`);
            
            const ingredientArea = document.createElement('li');
            ingredientArea.textContent = (`${measurement} ${ingredient}`);
    
            ingredientList.appendChild(ingredientArea);
        }
        }
        cardsContainer.appendChild(card);

    }


















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

// Purpose is to retrieve ID from clicked on drink, from the rendered list
//and use ID to access information required to create and render drink card
function fetchDrinkInfo(event) {
    const drinkId = event.target.getAttribute("data-drink-id");

    const drinkIdUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(drinkIdUrl)
    .then(function(response) {
    return response.json();
    })
    .then(function (data) {
    //call function to render drink card
    renderDrinkCard(data);
    })
    }

//create the elements associated with the drink card
function createDrinkCard(drinks) {
    const selectedDrink = drinks.drinks;

    const drinkCard = document.createElement('div');
    drinkCard.setAttribute('class', 'card');

    const drinkHeader = document.createElement('div');
    drinkHeader.setAttribute('class', 'card-divider');
    drinkHeader.textContent = selectedDrink[0].strDrink;

    const picIngredientDiv = document.createElement('div');
    picIngredientDiv.setAttribute('class', 'flex-container');

    const drinkPicture = document.createElement('img');
    drinkPicture.setAttribute('src', `${selectedDrink[0].strDrinkThumb}/preview`);

    const instructionDiv = document.createElement('div');
    instructionDiv.setAttribute('class', 'card-section');
    instructionDiv.textContent = selectedDrink[0].strInstructions;

    const drinkIngredients = document.createElement('ul');

    //Loop through ingredients and measurements to create elements for all that exist
    for (let i=1; i <= 20; i++) {
        const drinkChoice = selectedDrink[0];
        const ingredient = drinkChoice[`strIngredient${i}`];
        const measurement = drinkChoice[`strMeasure${i}`];

        if (ingredient && measurement) {
            console.log(`${measurement} ${ingredient}`);
            const drinkIngredientsList = document.createElement('li');
            drinkIngredientsList.textContent =(`${measurement} ${ingredient}`);
            drinkIngredients.appendChild(drinkIngredientsList);
        }
    }

    drinkCard.appendChild(drinkHeader);
    drinkCard.appendChild(picIngredientDiv);
    picIngredientDiv.appendChild(drinkPicture);
    picIngredientDiv.appendChild(drinkIngredients);
    drinkCard.appendChild(instructionDiv);
    return drinkCard;
}

//function to render the drink card to screen
function renderDrinkCard(drinks) {
    const drinkDiv = $('#drink-div');
    drinkDiv.empty();

    //call function to create drink card and append to div
    drinkDiv.append(createDrinkCard(drinks));


    

}


// Event listener to render clicked on drink
$('#drink-div').on("click", ".drink-title", fetchDrinkInfo);



//Fetch template
// fetch()
// .then(function(response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// })