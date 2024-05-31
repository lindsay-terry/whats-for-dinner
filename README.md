# What’s For Dinner?



## Description

“What’s for dinner?” A question that’s as old as time. After a busy, stressful day, the last thing anyone wants to do is come up with something for dinner. We’ve created an application to ease the burden, and make the decision for you. Our application uses two server-side APIs to give the user an abundance of meal recipes and drink recipes. The meals are completely randomly generated with the click of a button. For the drinks, the user’s input is required in the form of their choice of alcohol type, or non-alcoholic. Then the user is given a list of drinks to choose from. After the user has found a meal and/or drink recipe they like, they have the option to save the recipe. Once saved, the user can open the modal and see their recipes all in one place. 

This project was very challenging, with working together as a team, compromising for the greater good of the application, and dealing with merge conflicts. We learned how to lean on each other’s strengths and come together and help each other succeed. Coming up with the idea was the easy part, then came the hard. Using the Foundation Framework proved very difficult. We had to figure out how to use Foundation properly so that we could implement styling and add a modal to our application. Merge conflicts were also a big issue for us. With this application being on such a small scale, we all needed to work in the same files. That’s where we were running into issues. We remedied that by communicating with each other about who was opening branches when, and what files they were working in. 
*Add in specific successes?

In future development we would like to implement more features including using more local storage to save the generated meal and drink 	cards on page refresh, in case the user accidentally refreshes the page before they can save their recipes to the modal. We would also like 	to add an option for the user to switch to dark mode, to be easier on the eyes.



## Installation

N/A



## Usage

The user is presented with an application that can generate meal and drink recipes. On the left-hand side there are three buttons. If the user clicks the first “Generate a Meal” button, a meal card with the meal name, photo, ingredients with measurements, and instructions, is generated and rendered. Then if the user clicks the second “Generate a Drink” button, they are given the option to select the kind of alcohol they like or non-alcoholic ingredient. Once they click their preference and hit submit, a list of drink names is rendered. From there, the user clicks a name they want and a drink card is rendered. The drink card also gives the drink name, photo, ingredients with measurements, and instructions. Both meal and drink cards contain a scroll bar to use when the recipe is longer. At the bottom of each card there is a “Save Recipe” button. This button allows the user to save the recipes that they like and in turn view said recipes again in a modal. To view those saved recipes, the user can click the third button “Saved Recipes” on the left-hand side. A modal will be rendered, showing the recipes with meals on the left and drinks on the right. On smaller sized screens the two columns will stack into one and the user can scroll through meals and drinks independently. As for the main page, on smaller screens, the three buttons will move underneath the main image and stack, along with the meal card and drink card stacking underneath the buttons. And at the bottom of the application the user can view the footer with links to each team member’s personal GitHub.

[Please click here]() to view deployed application.

![“What’s for dinner screenshot”](./assets/images/   .png)


## Credits

Each team member provided important contributions and this project wouldn’t have worked without each of them.

Savannah:
* index.html: Modal
* Footer html and styling
* Icons on footer
* script.js: Functions to render meal cards based on random meal generated
* Updates to styling for complete meal card contents
* Comments to meal card function in script.js
* Styling for rendered meal cards


Elena:
* index.html: Basic HTML Framework
* HTML outline of modal element for local storage rendering
* script.js: Initial fetch request for random meal generation
* Created function to retrieve drink ID of clicked on drink
* Wrote renderDrinkStorage function to render drink cards to saved recipe section
* Styling for rendered drink cards
* README.md


Hannah:
* style.css: Initial CSS styling
* Header styling and image
* Adjusted button hover and focus styling
* Color themes and updates for all elements
* Adjusted image responsiveness, button focus, and header text shadow
* Started functions to render meal cards in saved recipe section
* Adjusted hover in footer to match rest of page
* Modal header styling and button styling
* script.js: Assigned data attributes to save meal button
* Added event listener for saving meal recipe


Lindsay:
* index.html: Foundation framework classes in HTML to adjust for Y Axis
* Scrolling on small screen bug fix
* script.js: Functions to retrieve drink information based on user input and render list
* Function to render drink card to page based on user selection
* Buttons to save recipes to local storage JS
* Adjustments to meal card functions for bug fix at rendering in saved recipes
* Filled in remaining catch statements


Resources used: 
* [Foundation Framework](https://get.foundation/)
* [Meal API](https://www.themealdb.com/api.php)
* [Drink API](https://www.thecocktaildb.com/api.php?ref=apilist.fun)
* [Header image](https://unsplash.com/photos/assorted-sliced-citrus-fruits-on-brown-wooden-chopping-board-1CsaVdwfIew?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)


## License

N/A