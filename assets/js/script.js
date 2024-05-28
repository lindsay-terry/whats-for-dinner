$(document).foundation(); // Allows modal to open

//setting up local storage for meals
let savedMeals = JSON.parse(localStorage.getItem('savedMeals')) ||[];

function readMealStorage() {
    let savedMeals = JSON.parse(localStorage.getItem('savedMeals')) ||[];

    return savedMeals;
}

function saveMealToStorage() {
    localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
}

//setting up local storage for drinks
let savedDrinks = JSON.parse(localStorage.getItem('savedDrinks')) ||[];

function readDrinkStorage() {
    let savedDrinks = JSON.parse(localStorage.getItem('savedDrinks')) ||[];

    return savedDrinks;
}

function saveDrinkToStorage() {
    localStorage.setItem('savedDrinks', JSON.stringify(savedDrinks));
}


// URL to fetch random meal
const mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'; 

// Event listener for the generate a meal button to create a card
$('#meal-button').on('click', function(event) {
    event.preventDefault();

    // $('#cards-container').empty();

    //fetch random meal and log data to console
    fetch(mealApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        createMealCard(data);
    })
});

//Meal card coding here
//connects to div id in HTML where we will display the data
const cardsContainer = document.querySelector("#cards-container"); 

//function for creating card elements
function createMealCard (meals) { 
    // Clear existing meal cards
    cardsContainer.innerHTML = '';

        console.log(meals.meals);
        const mealsArray = meals.meals;
        const mealData = mealsArray[0];
       
        const mealCard = document.createElement('div');
        mealCard.setAttribute('class', 'card');

        const mealName = document.createElement('h5');
        mealName.classList.add('card-divider');
        mealCard.appendChild(mealName);
        mealName.textContent = mealsArray[0].strMeal;

        const mealImg = document.createElement('img');
        mealImg.setAttribute('src', `${mealsArray[0].strMealThumb}/preview`);
        mealImg.setAttribute('style','height:200px;', 'display:inline');

        const addedIngredientDiv = document.createElement('div');
        addedIngredientDiv.setAttribute('class', 'flex-container flex-child-auto');
        addedIngredientDiv.appendChild(mealImg);

        const ingredientList = document.createElement('ul');
        ingredientList.setAttribute('class','text-wrap'); 

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

        const recipeInstructions = document.createElement('div');
        recipeInstructions.textContent = mealsArray[0].strInstructions 
        
        mealCard.appendChild(addedIngredientDiv); 
        addedIngredientDiv.appendChild(ingredientList);
        mealCard.appendChild(recipeInstructions);
        
        cardsContainer.appendChild(mealCard);

}

//function to render the meal card to the screen
    // function renderMealCard(meals) {
    // const mealDiv = $('#meal-div');
    // mealDiv.empty();
    // mealDiv.append(createMealCard(meals));

// }

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