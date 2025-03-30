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
  <button class="listItemBtn" id="itemAmount" onclick="openEdit(${index})"> 
        x ${item.amount} 
      </button>


  <input class="checkbox" type="checkbox" name="checkbox" id="${index}"> `
    ul.appendChild(li)
  })
}

await rerenderList()

console.log("end")



let editIndex = null;


window.openEdit=openEdit
console.log("open edit works")
function openEdit(index) {

  amountInput.value= db.listItems(index).amount;

  if (editIndex !== index && editIndex !== null) {
    editIndex = index;
    return
  }

  editIndex = index;
  console.log("edit index=",index)
  const amountEdit = document.getElementById("popUpEdit");
  if (amountEdit.style.display === "none") {
    amountEdit.style.display = "flex";
  } 
  else {
    amountEdit.style.display = "none";
    editIndex = null;
  }
}

const amountInput =document.getElementById("amountInput")

window.sub1=sub1

function sub1() {
  if (getAll()[editIndex].amount <=0) {
    return 0;
    rerenderList();
  }

  else {
    decrement(editIndex)
  
    amountInput.value= get(editIndex).amount;
    rerenderList();
  }
}
window.add1=add1
function add1() {
  increment(editIndex);
  amountInput.value= getAll()[editIndex].amount;
  rerenderList();
}


const searchbar = document.getElementById("searchbar")