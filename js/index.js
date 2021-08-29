const searchFood = async () => {
    const searchField = document.getElementById('search-input');
    const searchInputText = searchField.value;
    const searchResult = document.getElementById('search-result');
    const mealDetails = document.getElementById('meal-details');
    searchField.value = '';

    if (searchInputText == '') {
        searchResult.textContent = '';
        mealDetails.textContent = '';
        const div = document.createElement('div');
        div.classList.add('bg-warning', 'mx-auto', 'rounded-2')
        div.innerHTML = `<h3 class="p-2  text-center ">Dear sir Please input your favorite Food Name</h3>`;
        searchResult.appendChild(div);
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`;

        const res = await fetch(url);
        const data = await res.json();
        displayFood(data.meals);

        //     fetch(url)
        //     .then(res => res.json())
        //     .then(data => displayFood(data.meals));
        // 
    }

}



const displayFood = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
            `<div onclick="loadMealDetail(${meal.idMeal})" class="card h-100 p-2 rounded-2">
                         <img src="${meal.strMealThumb}" class="card-img-top rounded-2" alt="...">
                     <div class="card-body">
                         <h5 class="card-title">${meal.strMeal}</h5>
                         <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
                    </div>
                 </div>`;
        searchResult.appendChild(div);
    })
}




const loadMealDetail = async meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMeal(data.meals[0])

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMeal(data.meals[0]))

}

const displayMeal = meal => {
    console.log(meal)
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =
        `<img src="${meal.strMealThumb}" class="card-img-top p-2 rounded-4 " alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
        <a href="${meal.strYoutube}"  target="_blank" class="btn btn-primary">${meal.strMeal} Recipes Video</a>
    </div>`;
    mealDetails.appendChild(div);
}