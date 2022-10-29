"use strict";
// ============preloder======================

const preloader = document.querySelector(".preloader");

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

// ========= fetch API =================================================================================

async function search(a) {
  let t = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`
  );
  if (t.ok && 400 != t.status) {
    let x = await t.json();
    console.log(x.meals);
    displayMeals(x.meals);
  }
}

// =========================================================================================

const closeNav = document.querySelector(".closeNav");
const hideAndShow = document.querySelector(".hideAndShow");

closeNav.addEventListener("click", () => {
  hideAndShow.classList.toggle("hideAndShow");
  if (closeNav.classList.contains("fa-window-close" )
  ) {
    closeNav.classList.remove("fa-window-close")
    closeNav.classList.add("fa-bars")
    
  } else {
    closeNav.classList.add("fa-window-close")
  }
});

//===============================================================================

const homeDisplay = document.querySelector(".HomeDisplay");

function displayMeals(meal) {
  let meals = ` `;
  for (let i = 0; i < meal.length; i++) {
    meals += `
   
    <div class="col-md-3 " style="cursor: pointer;">
<div class=" position-relative P-layer overflow-hidden" onclick="getMeal('${meal[i].idMeal}')" >
<div class="layer d-flex align-items-center justify-content-center "  > <h5>${meal[i].strMeal}</h5> </div>

          <img src="${meal[i].strMealThumb}" class="w-100 rounded " alt="${meal[i].strTags}">
          
</div>
      </div>
    `;
  }
  homeDisplay.innerHTML = meals;
  // console.log(meal[i].idMeal);
}

async function getMeal(mealID) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  meal = await meal.json();
  console.log(meal.meals);
  displayMeal(meal.meals[0]);
}

function displayMeal(meal) {
  let tagsAll = ``;
  meal.strTags?.split(",").forEach((tag) => {tagsAll += `<li class="my-3 mx-1 p-1 alert alert-danger rounded">${tag}</li>`;});

  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert alert-warning d-inline-block rounded">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let curenntMeal = `
  <div class="col-md-4  text-white" >
        <img class="w-100" src="${meal.strMealThumb}" alt=""
         ><br>
        <h1>${meal.strMeal}</h1>
      </div>
      <div class="col-md-8 text-white text-left">
        <h2>Instructions</h2>
        <p class="lead text-light ">${meal.strInstructions}</p>
        <p class=" text-light"><b class="fw-bolder lead text-light">Area :</b> ${
          meal.strArea
        }</p>
        <p class=" text-light"><b class="fw-bolder ">Category :</b> ${
          meal.strCategory
        }</p>
        <h3>Recipes :</h3>
        <ul class="" > ${recipes}
        </ul>

        <h3 class="my-2 mx-1 p-1">Tags :</h3>
        <ul class="d-flex" >
        <li class="">${tagsAll ? tagsAll : "meal"}</li>
        </ul>

        
        <a class="btn btn-info text-white" target="_blank" href="${
          meal.strSource
        }">Source</a>
        <a class="btn btn-danger  text-white" target="_blank" href="${
          meal.strYoutube
        }">Youtub</a>
      </div>`;

  homeDisplay.innerHTML = curenntMeal;
}

search(" ");

async function getByLetter(letter) {
  if (letter) {
    let meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    meals = await meals.json();
    if (meals.meals) {
      displayMeals(meals.meals);
    }
  }
}

//============================
const searchInputs = document.querySelector(".searchInputs");
function searchInput() {
  searchInputs.classList.toggle("d-none");
}

//==============================
async function filterByCategory(category) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  meals = await meals.json();
  displayMeals(meals.meals);
}

async function filterByCategoryAll() {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  meals = await meals.json();
  displayCategoriesx(meals.categories);
  console.log(meals.categories);
}
//=====================
function displayCategoriesx(meals) {
  let e = "";
  for (var i = 0; i < meals.length; i++)
    e += `
  <div class="col-md-6 col-lg-3 my-3  ">
      <div class=" rounded position-relative P-layer overflow-hidden" style="cursor: pointer;">
          <div onclick="filterByCategory('${meals[i].strCategory}')" class="">
              <img src='${meals[i].strCategoryThumb}' class="w-100 rounded " />
              <div class=" d-flex align-items-center ">
                  <div class=" layer p-2">
                      <h2>${meals[i].strCategory}</h2>
                      <p>${meals[i].strCategoryDescription
                        .split(" ")
                        .slice(0, 9)
                        .join(" ")}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
  homeDisplay.innerHTML = e;
}
//=============================
async function allArea() {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  meals = await meals.json()
  displayArea(meals.meals)
}

function displayArea(meals) {
  let e = ""
  for (var i = 0; i < meals.length; i++) e += `
  <div class="col-md-6 col-lg-3 my-3   ">
      <div class="  rounded position-relative">
          <div onclick=(filterByArea('${meals[i].strArea}')) class=" " style="cursor: pointer;">
              <i class=" text-center text-success w-100 fas fa-home fa-5x "></i>
              <h2 class="text-white text-center">${meals[i].strArea}</h2>
          </div>
      </div>
  </div>`
  homeDisplay.innerHTML = e;

}

async function filterByArea(area) {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  meals = await meals.json()
  displayMeals(meals.meals.slice(0, 20))
}

//========================

async function dataIngredients() {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  meals = await meals.json()
  displayIngredients(meals.meals.slice(0, 20))
}
function displayIngredients(ingredients) {
  console.log(ingredients);
  let e = ""
  for (var i = 0; i < ingredients.length; i++)
    e += `
  <div class="col-md-6 col-lg-3 my-3 myM  shadow">
      <div onclick="getMainIngredient('${ingredients[i].strIngredient}')" style="cursor: pointer;" class="movie shadow rounded position-relative">
          <div class=" ">
          <i class="fas fa-pizza-slice text-success fa-10x"></i>
                        <h2 class="text-white">${ingredients[i].strIngredient}</h2>
              <p class="text-white">${ingredients[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
          </div>
      </div>
  </div>`
  homeDisplay.innerHTML = e

}

async function getMainIngredient(mealName) {
  let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
  meal = await meal.json()
  displayMeals(meal.meals)
}
//==============================
function contactUs() {
  let x = document.querySelector('.contactUs')
  x.classList.remove('d-none')
  homeDisplay.innerHTML = x.string;

}


const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");
const userAge = document.getElementById("age");
const userPassword = document.getElementById("password");
const userRePassword = document.getElementById("rePassword");
const userNameAlert = document.getElementById("namealert");
const userEmailAlert = document.getElementById("emailalert");
const userPhoneAlert = document.getElementById("phonealert");
const userAgeAlert = document.getElementById("agealert");
const userpasswordAlert = document.getElementById("passwordalert");
const userRepasswordAlert = document.getElementById("repasswordalert");


function validation(x) {
  if (x === "name") {
    if (userNameValid()) {
          userName.classList.remove("is-invalid")
          userName.classList.add("is-valid")
          userNameAlert.classList.replace("d-block", "d-none")

      } else {
          userName.classList.replace("is-valid", "is-invalid")
          userNameAlert.classList.replace("d-none", "d-block")
      }
  }

  if (x === "email") {
    if (userEmailValid()) {
        console.log(userEmail);
          userEmail.classList.remove("is-invalid")
          userEmail.classList.add("is-valid")
          userEmailAlert.classList.replace("d-block", "d-none")
      } else {
          userEmail.classList.replace("is-valid", "is-invalid")
          userEmailAlert.classList.replace("d-none", "d-block")
      }
  }

  if (x === "phone") {
      if (userPhoneValid()) {
          userPhone.classList.remove("is-invalid")
          userPhone.classList.add("is-valid")
          userPhoneAlert.classList.replace("d-block", "d-none")
      } else {
          userPhone.classList.replace("is-valid", "is-invalid")
          userPhoneAlert.classList.replace("d-none", "d-block")
      }
  }

  if (x === "age") {
      if (userAgeValid()) {
          userAge.classList.remove("is-invalid")
          userAge.classList.add("is-valid")
          userAgeAlert.classList.replace("d-block", "d-none")
      } else {
          userAge.classList.replace("is-valid", "is-invalid")
          userAgeAlert.classList.replace("d-none", "d-block")
      }
  }

  if (x === "password") {
      if (userPasswordValid()) {
          userPassword.classList.remove("is-invalid")
          userPassword.classList.add("is-valid")
          userpasswordAlert.classList.replace("d-block", "d-none")
      } else {
          userPassword.classList.replace("is-valid", "is-invalid")
          userpasswordAlert.classList.replace("d-none", "d-block")
      }
  }

  if (x === "repassword") {
      if (userRePasswordValid()) {
          userRePassword.classList.remove("is-invalid")
          userRePassword.classList.add("is-valid")
          userRepasswordAlert.classList.replace("d-block", "d-none")
      } else {
          userRePassword.classList.replace("is-valid", "is-invalid")
          userRepasswordAlert.classList.replace("d-none", "d-block")
      }
  }

  if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
      document.getElementById("submitBtn").removeAttribute("disabled")
  }else{
      document.getElementById("submitBtn").setAttribute("disabled","true")
  }

}

function userNameValid() {
  return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
  return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
  return userPassword.value == userRePassword.value
}


