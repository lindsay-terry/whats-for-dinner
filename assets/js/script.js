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

    //fetch random meal and log data to console
    fetch(mealApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        renderMealCard(data); 
    })
});

//Meal card coding
//Displays cards in the div with ID "cards-container"
const cardsContainer = document.querySelector("#cards-container"); 


//function for creating card elements
function createMealCard (meals) { 
        const mealsArray = meals.meals;
        const mealData = mealsArray[0];
       
        const mealCard = document.createElement('div');
        mealCard.setAttribute('class', 'card');
        //assign meal ID as data attribute to meal card
        mealCard.setAttribute('data-meal-id', mealsArray[0].idMeal);
        mealCard.setAttribute('style', 'border-radius: 0.5em;');

        const mealName = document.createElement('h5');
        mealName.textContent = mealsArray[0].strMeal;
        mealName.setAttribute('class','card-divider align-center');
        mealName.setAttribute('style','background-color: var(--mint);');

        const mealImg = document.createElement('img');
        mealImg.setAttribute('src', `${mealsArray[0].strMealThumb}/preview`);
        mealImg.setAttribute('style','height:200px;', 'display:inline');
        mealImg.setAttribute('class','align-center');

        const addedIngredientDiv = document.createElement('div');
        addedIngredientDiv.setAttribute('class', 'flex-container align-spaced');

        const ingredientList = document.createElement('ul');

        //Loops through ingredients and measurements and displays them together on the card
        for (let i=1; i<=20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measurement = mealData[`strMeasure${i}`];

        if (ingredient && measurement) {
            const ingredientArea = document.createElement('li');
            ingredientArea.textContent = (`${measurement} ${ingredient}`);
            ingredientList.appendChild(ingredientArea);
            }
        }

        const recipeInstructions = document.createElement('div');
        recipeInstructions.textContent = mealsArray[0].strInstructions 
        
        //Appends children elements to the cards
        mealCard.appendChild(mealName);
        mealCard.appendChild(addedIngredientDiv); 
        addedIngredientDiv.appendChild(ingredientList);
        addedIngredientDiv.appendChild(mealImg);
        mealCard.appendChild(recipeInstructions);

        return mealCard;
 }


    function renderMealCard(meals) {
        //clears existing meal card
        cardsContainer.innerHTML = '';
        console.log(meals);

        const saveMealButton = document.createElement('button'); //save button potentially not needed with local storage
        saveMealButton.setAttribute('class', 'button custom-btn-clr');
        saveMealButton.setAttribute('data-meal-id', meals.meals[0].idMeal);
        saveMealButton.textContent = 'Save Recipe';
        //append button beneath meal card
        // cardsContainer.append(createMealCard(data.meals));
        cardsContainer.append(createMealCard(meals));
        cardsContainer.append(saveMealButton);
        // cardsContainer.innerHTML = '';
    }

    function renderMealStorage() {
        const savedMeals = readMealStorage();
        $('#saved-meals').empty();
        for (let i = 0; i < savedMeals.length; i++){
            const mealIdURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${savedMeals[i]}`
                fetch(mealIdURL)
                .then(function(response) {
                return response.json();
            })
                .then(function (data) {
                    // const mealCard = createMealCard(data.meals);
                    // $('#saved-meals').append(mealCard);
                $('#saved-meals').append(createMealCard(data));
            })
            .catch(function(error) {
                console.error('Error fetching meal data:', error);
            });
        }
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
    drinkCard.setAttribute('style', 'border-radius: 0.5em;');
    //Set ID as data attribute for saving to local storage if user chooses
    drinkCard.setAttribute('data-drink-id', selectedDrink[0].idDrink);

    const drinkHeader = document.createElement('h5');
    drinkHeader.setAttribute('class', 'card-divider align-center');
    drinkHeader.setAttribute('style', 'background-color: var(--mint);');
    drinkHeader.textContent = selectedDrink[0].strDrink;

    const picIngredientDiv = document.createElement('div');
    picIngredientDiv.setAttribute('class', 'flex-container align-spaced');

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
            const drinkIngredientsList = document.createElement('li');
            drinkIngredientsList.textContent =(`${measurement} ${ingredient}`);
            drinkIngredients.appendChild(drinkIngredientsList);
        }
    }

    drinkCard.appendChild(drinkHeader);
    drinkCard.appendChild(picIngredientDiv);
    picIngredientDiv.appendChild(drinkIngredients);
    picIngredientDiv.appendChild(drinkPicture);
    drinkCard.appendChild(instructionDiv);
    return drinkCard;
}

//function to render the drink card to screen
function renderDrinkCard(drinks) {
    const drinkDiv = $('#drink-div');
    drinkDiv.empty();

    //create save drink recipe button
    const saveDrinkButton = document.createElement('button');
    saveDrinkButton.textContent = 'Save Recipe';
    saveDrinkButton.setAttribute('class', 'button custom-btn-clr');

    //call function to create drink card and append to div
    drinkDiv.append(createDrinkCard(drinks));
    //Set data attribute of drink ID to save button
    saveDrinkButton.setAttribute('data-drink-id', drinks.drinks[0].idDrink);
    //append save button to drinkDiv beneath created card
    drinkDiv.append(saveDrinkButton);
}

//renders drinks based on IDs in local storage
function renderDrinkStorage() {
    const savedDrinks = readDrinkStorage();
    //empty div to avoid double rendering
    $('#saved-drinks').empty();
    for (let i = 0; i < savedDrinks.length; i++) {

        const drinkIdUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${savedDrinks[i]}`;
        fetch (drinkIdUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            //calls function to render drink in modal
            $('#saved-drinks').append((createDrinkCard(data)));
        })
    }
}


// Event listener to render clicked on drink
$('#drink-div').on("click", ".drink-title", fetchDrinkInfo);
//Event listener to save drink recipe to local storage
$('#drink-div').on('click', '.custom-btn-clr', function(event) {
    readDrinkStorage();
    event.preventDefault();
    const saveButton = event.target;
    const savedId = saveButton.dataset.drinkId;
    savedDrinks.push(savedId);
    saveDrinkToStorage();
    console.log(savedDrinks);
})

//To - Do: create event listener to save meals to local storage
$('#cards-container').on('click', '.custom-btn-clr', function(event) {
    readMealStorage();
    event.preventDefault();
    const saveButton = event.target;
    const savedId = saveButton.dataset.mealId;
    savedMeals.push(savedId);
    saveMealToStorage();
    console.log(savedMeals);
})

$('#saveRecipes').on('click', function(event){
    renderMealStorage();
    renderDrinkStorage();
    event.preventDefault();
    
}
)



//Fetch template
// fetch()
// .then(function(response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// })