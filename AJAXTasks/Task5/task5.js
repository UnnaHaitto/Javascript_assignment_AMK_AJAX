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

    console.log(restaurants);

    displaySortedRestaurants();
    addRestaurantClickListeners();
  } catch (error) {
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
    tr.addEventListener("click", function (evt) {
      allTrElements.forEach(removeHighlight);

      tr.classList.add("highlight");

      let html = "";

      let name = tr.firstElementChild.textContent;

      for (let restaurant of restaurants) {
        if (restaurant.name == name) {
          /*
          const id = restaurant._id;

          getMenu(id);

          console.log(menu.courses[1].name);

          let html = "";

          html += "<h3> Daily menu </h3>";
          html += "<p></p>";

          let dialog = document.querySelector("dialog");

          dialog.innerHTML = html;*/
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
    menu = answer;
  } catch (error) {
    console.log(error.message);
  }
}
