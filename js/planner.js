import db from "./db.js"
export default {
  displayItemList
}

await displayItemList()

async function displayItemList() {
  const items = await db.listPlanningItems()

  document.getElementById("uncheckedItemsPlanning").innerHTML = items
    .map((item) => {
      return listItem(item.id, item.name, item.amount, item.checked)
    })
    .join("")
}


function listItem(id, name, amount, isChecked) {
  const checked = isChecked ? "checked" : ""
  return `<li class="checklistItem" id='${id}'> 

      <span onclick="openEditModal('${id}')" id="itemName"> 
      ${name} 
      </span>  
            
        <button onclick="openEditModal('${id}')" class="listItemBtn" id="itemAmount">  
        x ${amount} 
        </button>
        
       <input onclick="selectOutputList('${id}')" class="checkbox" type="checkbox" name="checkbox" id="l_${id}" ${checked}>
  </li>`
}



// const categoryOptions = document.querySelectorAll("input[name='categories']")
// const findSelected = () => {
//   const selected =document.querySelector("input[name='categories']:checked").value
// }

//  my test, dosent work
// async function getTotalUnchecked () {
//   const items= await db.listItems()
//   const item = items.filter((item) => {
//    return item.checked === true

// })
// const length= unchecked.length
// return length

// }
// getTotalUnchecked()
// // totalUnchecked.reduce((item) => {
// // const Unchecked = item.length})


// add amount to list. dosent work

// let editId = null
// const amountInput = document.getElementById("amountInput")

// window.sub1 = sub1

// async function sub1() {
//   const items = await db.listItems()
//   if (items[editId].amount <= 0) {
//     return 0
//   }
//   decrement(editId)
//   amountInput.value = get(editId).amount
//   rerenderList()
// }

// window.add1 = add1
// function add1() {
//   increment(editId)
//   amountInput.value = getAll()[editId].amount
//   rerenderList()
// }




const searchbar = document.getElementById("searchbar")
const searchList = document.getElementById("searchList");

searchbar.onkeyup = async () => {
  const items = await db.listItems()
  let result = []
  const input = searchbar.value
  if (input.length) {
    result = items
      .filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase())
      })
      .sort((a,b) => {
        return b.checked - a.checked
      })
    // console.log(result)
  }
  display(result)
}

//shows list element
function display(result) {
  const content = result.map((item) => {
    const checked = item.checked ? "checked" : ""
    return `<li data-open-modal onclick="selectOutputSearch('${item.id}')">  
    <input  class="checkbox1" type="checkbox" name="checkbox" diasbled id="s_${item.id}" ${checked}> ${item.name}     
  </li>`
  })
  searchList.innerHTML = content.join("")
}

// makes checkmarks comunicate across
window.selectOutputSearch = selectOutputSearch
async function selectOutputSearch(id) {
  const plannerlistCheckbox = document.getElementById(`l_${id}`)
  const searchCheckbox = document.getElementById(`s_${id}`)
  if (searchCheckbox.checked) {
    await db.uncheckItem(id)
    plannerlistCheckbox.checked = false
    searchCheckbox.checked = false
  } else {
    await db.checkItem(id)
    plannerlistCheckbox.checked = true
    searchCheckbox.checked = true
  }
}

window.selectOutputList = selectOutputList
async function selectOutputList(id) {
  const plannerlistCheckbox = document.getElementById(`l_${id}`)
  const searchCheckbox = document.getElementById(`s_${id}`)
  if (plannerlistCheckbox.checked) {
    await db.checkItem(id)
    plannerlistCheckbox.checked = true
    if (searchCheckbox){
      searchCheckbox.checked = true
    }
  } else {
    await db.uncheckItem(id)
    plannerlistCheckbox.checked = false
    if (searchCheckbox){
      searchCheckbox.checked = false
    }
  }
}


searchbar.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const isChecked = searchList.firstElementChild.firstElementChild.checked

    if (!isChecked){
      searchbar.value = "";
      return;
    }

    const id = searchList.firstElementChild.firstElementChild.id
    const cleanId = id.replace("s_", "")

    document.getElementById(`l_${cleanId}`).checked = false
    await db.uncheckItem(cleanId)

    searchbar.value = "";
  }
})

