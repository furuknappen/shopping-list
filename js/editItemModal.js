import db from "./db.js"
import planner from "./planner.js"
export default {
  openEditModal,
  closeEditModal,
  saveEditedItem,
}

async function openEditModal(id) {
  const item = await db.getItem(id)
  document.getElementById("ItemId").value = item.id
  document.getElementById("ItemInputname").value = item.name
  document.getElementById("amountInput").value = item.amount
  document.getElementById(item.category).checked = true

  document.querySelector("[data-modal]").showModal()
}

function closeEditModal() {
  document.querySelector("[data-modal]").close()
}

window.openEditModal = openEditModal
window.closeEditModal = closeEditModal

window.saveEditedItem = saveEditedItem

async function saveEditedItem() {
  const id = document.getElementById("ItemId").value
  const name = document.getElementById("ItemInputname").value
  const amount = document.getElementById("amountInput").value
  const category = document.querySelector("input[name='categories']:checked").value

  await db.updateItem(id, name, amount, category)
  await planner.displayItemList()
  closeEditModal()
}



//  CATEGORIES

const categories = await db.listCategories()
console.table(categories)

function displayCategories() {
  const fieldset = document.getElementById("categoryListFieldset")
  fieldset.innerHTML = categories
    .map((category) => {
      return createCategoryItem(category.name, category.id, category.color)
    })
    .join("")
}

function createCategoryItem(name, id, color) {
  return `
   <input type="radio" id="${id}" name="categories" value="${id}" />
   
   <label for="${id}" style="border-color: ${color}; background-color: ${color};" >${name}</label>`
}
displayCategories()