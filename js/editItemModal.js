import db from "./db.js"
import planner from "./planner.js"
export default {
  openEditModal,
  closeEditModal,
  saveEditedItem,
}
const categories = await db.listCategories()

// EDIT MODAL
async function openEditModal(id) {
  const item = await db.getItem(id)
  displayCategories("categoryListEditFieldset")
  document.getElementById("ItemId").value = item.id
  document.getElementById("itemInputnameEdit").value = item.name
  document.getElementById("amountInputEdit").value = item.amount
  document.getElementById(item.category).checked = true
  document.getElementById("checkboxEditModal").checked = item.checked
  document.querySelector("[data-edit-modal]").showModal()
}

window.deleteItem = deleteItem
  async function deleteItem() {
    const id = document.getElementById("ItemId").value 
    await db.deleteItem(id)
  
    closeEditModal()
    await planner.displayItemList()
  }

function closeEditModal() {
  document.querySelector("[data-edit-modal]").close()
}

window.openEditModal = openEditModal
window.closeEditModal = closeEditModal

window.saveEditedItem = saveEditedItem

async function saveEditedItem() {
  const id = document.getElementById("ItemId").value
  const name = document.getElementById("itemInputnameEdit").value
  const amount = document.getElementById("amountInputEdit").value
  const category = document.querySelector("input[name='categories']:checked").value
  const checkbox = document.getElementById("checkboxEditModal").checked

  await db.updateItem(id, name, amount, category, checkbox)
  await planner.displayItemList()
  closeEditModal()
}
// EDIT MODAL STOP

// ADD MODAL
window.openAddModal = openAddModal
window.closeAddModal = closeAddModal

function openAddModal() {
  document.querySelector("[data-add-modal]").showModal()
  displayCategories("categoryListAddFieldset")
}

function closeAddModal() {
  document.querySelector("[data-add-modal]").close()
}

window.newItemSubmit = newItemSubmit

async function newItemSubmit() {  
  const isChecked = document.getElementById("checkbox").checked
  const name = document.getElementById("itemInputnameAdd").value
  const amount = document.getElementById("amountInputAdd").value
  const categoryId = document.querySelector("input[name='categories']:checked").value
  await db.addItem (name, categoryId, isChecked,amount)
  closeAddModal()
  document.getElementById("checkbox").checked = false
  document.getElementById("itemInputnameAdd").value = ""
  document.getElementById("amountInputAdd").value = 1
  document.querySelector("input[name='categories']:checked").value = false
  await planner.displayItemList()
}

// ADD MODAL STOP

// SUB AND ADD AMOUNT
window.sub = sub

async function sub(inputId) {
  const inputAmount = document.getElementById(inputId)
 if (inputAmount.value <= 0) {
  return
 }
 inputAmount.value--
}

window.add = add

function add(inputId) {
const inputAmount = document.getElementById(inputId)
 inputAmount.value++

}

// SUB AND ADD AMOUNT

//  CATEGORIES


function displayCategories(divId) {
  const fieldset = document.getElementById(divId)
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
//  CATEGORIES STOP