const inputEl = document.getElementById("input-data");
const btnEl = document.getElementById("button-data");
const unorder = document.getElementById("ul");
const noImage = document.getElementById("no-list");
const foodListStatistics = document.querySelector(".foodListStatistics");

function loadItems() {
  const items = JSON.parse(localStorage.getItem("foodItems")) || [];
  unorder.innerHTML = ""; // Clear previous list

  items.forEach((foodName) => {
    let li = document.createElement("li");
    li.className =
      "list-group-item rounded-3 mt-2 d-flex border-top shadow-sm justify-content-between align-items-center";

    let divValue = document.createElement("div");
    divValue.textContent =
      foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase();
    li.append(divValue);

    let icon = document.createElement("i");
    icon.className = "fa-solid fa-trash";
    icon.setAttribute("onclick", "deleteLi(event)");
    li.append(icon);

    unorder.append(li);
  });

  refresh();
}

function saveItems() {
  const items = Array.from(unorder.children).map((li) => li.firstChild.textContent);
  localStorage.setItem("foodItems", JSON.stringify(items));
}

function tolistSubmit() {
  if (inputEl.value.trim() === "") {
    alert("Enter food");
    return;
  }

  let li = document.createElement("li");
  li.className =
    "list-group-item rounded-3 mt-2 d-flex border-top shadow-sm justify-content-between align-items-center";

  let divValue = document.createElement("div");
  divValue.textContent =
    inputEl.value.charAt(0).toUpperCase() +
    inputEl.value.slice(1).toLowerCase();
  li.append(divValue);

  let icon = document.createElement("i");
  icon.className = "fa-solid fa-trash";
  icon.setAttribute("onclick", "deleteLi(event)");
  li.append(icon);

  unorder.append(li);
  saveItems();
  inputEl.value = "";
  refresh();
}

function deleteLi(event) {
  event.target.parentNode.remove();
  saveItems();
  refresh();
}

function refresh() {
  let count = unorder.children.length;
  foodListStatistics.innerText = `You have ${count} items`;
  noImage.hidden = count > 0;
  unorder.hidden = count === 0;
  foodListStatistics.hidden = count === 0;
}

btnEl.addEventListener("click", tolistSubmit);

inputEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    tolistSubmit();
  } else if (event.ctrlKey && event.key.toLowerCase() === "z") {
    inputEl.value = "";
  }
});

loadItems();