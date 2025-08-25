const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const resultsGrid = document.querySelector("#results-grid");

async function searchRecipes(keyword) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;

  // (1) Loading State
  resultsGrid.innerHTML = "<p>Searching for recipes...</p>";

  try {
    const response = await fetch(endpoint);

    // (2) Error Handling
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // เรียกฟังก์ชันแสดงผล
    displayRecipes(data.meals);

  } catch (error) {
    console.error("Error fetching data:", error);

    // (3) แสดงข้อผิดพลาด
    resultsGrid.innerHTML = "<p>An error occurred. Please try again later.</p>";
  }
}

// ฟังก์ชันแสดงผล
function displayRecipes(meals) {
  resultsGrid.innerHTML = "";

  if (!meals) {
    resultsGrid.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  meals.forEach(meal => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <a href="${meal.strSource || '#'}" target="_blank" class="view-btn">View Recipe</a>
    `;

    resultsGrid.appendChild(mealCard);
  });
}

// ฟอร์ม submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = input.value.trim();
  if (keyword) {
    searchRecipes(keyword);
  }
});
