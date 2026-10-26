let restaurants = [];
let menu;

async function fetchRestaurants() {
  try {
    const response = await fetch(
      "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants",
    );
    if (!response.ok) throw new Error("Invalid input!");
    const data = await response.json();

    for (let restaurant of data) {
      restaurants.push(restaurant);
    }

    displaySortedRestaurants();
    addRestaurantClickListeners();
  } catch (error) {
    const table = document.querySelector("table tbody");
    table.innerHTML =
      "<tr><td class='error'>Restaurant load failed. Try again.</td></tr>";
    console.log(error.message);
  }
}

async function displaySortedRestaurants() {
  restaurants.sort((a, b) => {
    let nameA = a.name;
    let nameB = b.name;

    if (nameA > nameB) {
      return 1;
    } else if (nameB > nameA) {
      return -1;
    } else {
      return 0;
    }
  });

  let table = document.querySelector("table tbody");
  let html = "";

  for (let restaurant of restaurants) {
    html +=
      "<tr><td>" +
      restaurant.name +
      "</td><td>" +
      restaurant.address +
      "</td></tr>";
  }

  table.insertAdjacentHTML("beforeend", html);
}

fetchRestaurants();

function removeHighlight(element) {
  element.classList.remove("highlight");
}

async function addRestaurantClickListeners() {
  let allTrElements = document.querySelectorAll("tr");

  allTrElements.forEach(function (tr) {
    tr.addEventListener("click", async function (evt) {
      allTrElements.forEach(removeHighlight);

      tr.classList.add("highlight");

      let html = "";

      let name = tr.firstElementChild.textContent;

      for (let restaurant of restaurants) {
        if (restaurant.name == name) {
          const id = restaurant._id;

          menu = await getMenu(id);

          if (menu == null) {
            return;
          }

          html += "<h1>" + restaurant.name + "</h1>";
          html +=
            "<h3 class='restaurant-address'>" + restaurant.address + "</h3>";

          html += "<h2> Daily menu </h2>";
          if (menu.courses.length == 0) {
            html += "No daily menu available.";
          } else {
            for (let i = 0; i < menu.courses.length; i++) {
              html += "<h3> Option " + (i + 1) + " </h3>";
              html += "<p>Food: " + menu.courses[i].name + "</p>";
              html += "<p>Price: " + menu.courses[i].price + "</p>";
              html +=
                "<p>Dietary restrictions: " + menu.courses[i].diets + "</p>";
            }
          }
        }
      }

      let dialog = document.querySelector("dialog");

      dialog.innerHTML = html;

      dialog.showModal();

      dialog.addEventListener("click", function (evt) {
        if (evt.target == dialog) {
          dialog.close();
        }
      });
    });
  });
}

async function getMenu(id) {
  try {
    const response = await fetch(
      "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/" +
        id +
        "/fi",
    );
    if (!response.ok) throw new Error("Invalid input!");
    const answer = await response.json();
    return answer;
  } catch (error) {
    let dialog = document.querySelector("dialog");
    dialog.innerHTML =
      '<h1 class="error">The menu fetch failed. Try again.</h1>';
    dialog.showModal();
    dialog.addEventListener("click", function (evt) {
      if (evt.target == dialog) {
        dialog.close();
      }
    });
    console.log(error.message);
    return null;
  }
}
