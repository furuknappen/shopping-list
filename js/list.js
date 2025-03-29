import db from "./db.js"

console.log("start")

const hamburgerMenu = document.getElementById("hamburgerMenu")
hamburgerMenu.style.display = "none"
window.openMenu = openMenu
function openMenu() {
  if (hamburgerMenu.style.display === "none") {
    hamburgerMenu.style.display = "grid"
  } else {
    hamburgerMenu.style.display = "none"
  }
}

async function rerenderList() {
  const items = await db.listItems()

  const ul = document.getElementById("uncheckedItemsShoppingmode")

  items.forEach((item, index) => {
    const li = document.createElement("li")
    li.className = "checklistItem"
    li.id = index

    li.innerHTML = `<span id="itemName">
    ${item.name} 
  </span>
  <span id="itemAmount">
   x ${item.amount} 
  </span> 
  <input class="checkbox" type="checkbox" name="checkbox" id="${index}">`

    ul.appendChild(li)
  })
}

await rerenderList()

console.log("end")
