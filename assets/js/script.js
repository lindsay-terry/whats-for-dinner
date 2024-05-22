// $(document).foundation(); // Allows modal to open



// URL to fetch random meal
const mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'; 

fetch(mealApiUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
})