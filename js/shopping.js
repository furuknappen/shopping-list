import db from "./db.js"

console.log("start")

async function rerenderList() {
  const items = await db.listShoppingItems()

  const ul = document.getElementById("uncheckedItemsShoppingmode")

  items.forEach((item, index) => {
    const li = document.createElement("li")
    li.className = "checklistItem"
    li.id = index
    const checked = item.checked ? "checked" : ""

    li.innerHTML = `<span id="itemName">
    ${item.name}
  </span>
  <span id="itemAmount">
   x ${item.amount} 
  </span> 

  <input class="checkbox" type="checkbox" name="checkbox" id="${index}" ${checked}> `
    ul.appendChild(li)
  })
}
//  - ${item.category} - ${item.categoryColor}
await rerenderList()

console.log("end")
