import db from "./db.js"

console.log("start")
await rerenderList()


// rerender list
async function rerenderList() {
  const items = await db.listItems()

  const ul = document.getElementById("uncheckedItemsPlanning")
  // onclick="openEdit('${item.id}')    "
  items.forEach((item, index) => {
    const li = document.createElement("li")
    li.className = "checklistItem"
    li.id = index
    const checked = item.checked ? "checked" : ""
    li.innerHTML = `<span  id="itemName"> ${item.name} </span>        
    <button data-open-modal class="listItemBtn" id="itemAmount" onclick="document.querySelector('[data-modal]').showModal()"> 
        x ${item.amount} </button>
    <input onclick="selectOutput1(id)" class="checkbox" type="checkbox" name="checkbox" id="l_${item.id}" ${checked}> `
    ul.appendChild(li)
  })
}

//open/close edit modal
const openEditModal = document.querySelector("[data-open-modal]")
const closeEditModal = document.querySelector(".submitPageBtn")
const editModal = document.querySelector("[data-modal]")
closeEditModal.returnValue = "favAnimal"

// need big help
openEditModal.addEventListener("click", () => {
  console.log("modal works")
  document.getElementById("ItemInputname").value = item.name
  //  input.innerHTML.value = ${item.name}
  editModal.showModal()
})

closeEditModal.addEventListener("click", () => {
  editModal.close()
})

// modal test slutt

console.log(editModal)
console.log("hello")


// brukes denne fotsatt? dont think so?
let editId = null

window.openEdit = openEdit
console.log("open edit works")
async function openEdit(id) {
  const items = await db.listItems()
  const item = items.filter((item) => {
    return item.id === id
  })[0]
  // amountInput.value= ;
  amountInput.value = item.amount
  if (editId !== id && editId !== null) {
    editId = id
    return
  }

  editId = id
  console.log("edit id=", id)
  const amountEdit = document.getElementById("popUpEdit")
  if (amountEdit.style.display === "none") {
    amountEdit.style.display = "flex"
  } else {
    amountEdit.style.display = "none"
    editId = null
  }
}


// const categoryOptions = document.querySelectorAll("input[name='categories']")
// const findSelected = () => {
//   const selected =document.querySelector("input[name='categories']:checked").value
// }
// console.log(findSelected());


//  my test, dosent work
// async function getTotalUnchecked () {
//   const items= await db.listItems()
//   const item = items.filter((item) => {
//    return item.checked === true

   
 

    // console.log(item.checked)
  // })
  // const length= unchecked.length 
  // console.log(item) 
  // console.log(checked)
  // return length
 
  // console.log( length)
  
// }
// getTotalUnchecked()
// // totalUnchecked.reduce((item) => {
// // const Unchecked = item.length})


// console.log("it does actually work")





// add amount to list. dosent work
const amountInput = document.getElementById("amountInput")

window.sub1 = sub1

async function sub1() {
  const items = await db.listItems()
  if (items[editId].amount <= 0) {
    return 0
  }
  decrement(editId)
  amountInput.value = get(editId).amount
  rerenderList()
}

window.add1 = add1
function add1() {
  increment(editId)
  amountInput.value = getAll()[editId].amount
  rerenderList()
}

const searchbar = document.getElementById("searchbar")
const searchOutput = document.getElementById("searchOutput")

searchbar.onkeyup = async () => {
  const items = await db.listItems()
  let result = []
  const input = searchbar.value
  if (input.length) {
    result = items.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    console.log(result)
  }
  display(result)
}

//shows list element
function display(result) {
  const content = result.map((item) => {
    const checked = item.checked ? "checked" : ""
    return `<li data-open-modal onclick="selectOutput('${item.id}')">  
    <input  class="checkbox1" type="checkbox" name="checkbox" diasbled id="s_${item.id}" ${checked}> ${item.name}     
  </li>`
  })
  searchOutput.innerHTML = `<ul> ${content.join("")} </ul>`
}

// makes checkmarks comunicate across
window.selectOutput = selectOutput

async function selectOutput(id) {
  const plannerlistCheckbox = document.getElementById(`l_${id}`)
  const searchCheckbox = document.getElementById(`s_${id}`)
  if (searchCheckbox.checked) {
    await db.uncheckItem(id)
    searchCheckbox.checked = false
    plannerlistCheckbox.checked = false
  } else {
    await db.checkItem(id)
    searchCheckbox.checked = true
    plannerlistCheckbox.checked = true
  }
}

window.selectOutput1 = selectOutput1
// fix this: delete and fix the one above
async function selectOutput1(id) {
  const plannerlistCheckbox = document.getElementById(`l_${id}`)
  const searchCheckbox = document.getElementById(`s_${id}`)
  if (plannerlistCheckbox.checked) {
    await db.uncheckItem(id)
    searchCheckbox.checked = false
    plannerlistCheckbox.checked = false
  } else {
    await db.checkItem(id)
    searchCheckbox.checked = true
    plannerlistCheckbox.checked = true
  }
}

searchbar.addEventListener("enter", addToUnchecked)

function addToUnchecked() {}




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
   <input type="radio" id="${id}" name="categories" value="${name}" />
   
   <label for="${id}" style="border-color: ${color}; background-color: ${color};" >${name}</label>`
}
displayCategories()
