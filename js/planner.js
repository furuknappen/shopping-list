import db from "./db.js"

console.log("start")

async function rerenderList() {
  const items = await db.listItems()

  const ul = document.getElementById("uncheckedItemsPlanning")

  items.forEach((item, index) => {
    const li = document.createElement("li")
    li.className = "checklistItem"
    li.id = index

    li.innerHTML = `<span id="itemName">
    ${item.name} 
  </span>        
  <button class="listItemBtn" id="itemAmount" onclick="openEdit('${item.id}')"> 
        x ${item.amount} 
      </button>


  <input class="checkbox" type="checkbox" name="checkbox" id="${index}"> `
    ul.appendChild(li)
  })
}

await rerenderList()

console.log("end")

let editId = null
document.getElementById("popUpEdit").style.display = "none"

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
// searchOutput.innerHTML = "";

function display(result) {
  const content = result.map((item) => {
    return `<li> ${item.name} </li>`
  })
  // searchOutput.innerHTML = `<ul> <li> Brød </li> </ul>`
  searchOutput.innerHTML = `<ul> ${content.join("")} </ul>`
}
