// event listener
document.getElementById('searchForm').addEventListener('submit', searchMeal);

// fetch function
async function searchMeal(event) {
  event.preventDefault();

  const query = document.getElementById('searchInput').value; 
  const url =  `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`; 
  try {
  
    const response = await fetch(url);
    const data = await response.json();
     
    // check for meal here the male not found 
    if (data.meals === null) {
  
      document.getElementById('mealCardPlaceholder').innerHTML = `<h3> Meal Not Found</h3>`;
      document.getElementById('mealContainer').style.display = 'block';
    } else {

      // Meal found
      const meal = data.meals[0];  // get the first meal 

     const mealDetails = `
     <h2>${meal.strMeal}</h2>
      <p><b>Area: ${meal.strArea}</b></p>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><b>${meal.strInstructions}</b></p>
      <p>YouTube: <a href="${meal.strYoutube}" target="_blank">${meal.strYoutube}</a></p>
      `;

     document.getElementById('mealCardPlaceholder').innerHTML = mealDetails;
     document.getElementById('mealContainer').style.display = 'block';

    }
  } catch (error) {
    console.error('Error cannot fetch', error);

    document.getElementById('mealCardPlaceholder').innerHTML = `<b><h3> Error While Fetching Meals </h3><b>`;
    document.getElementById('mealContainer').style.display = 'block';

  }

  document.getElementById('searchInput').value = '';
}
