import db from "./db.js"

await displayItemList()

async function displayItemList() {
  const items = await db.listShoppingItems()

  document.getElementById("uncheckedItemsShoppingmode").innerHTML = items
    .map((item) => {
      return listItem(item.id, item.name, item.amount, item.checked)
    })
    .join("")
}

function listItem(id, name, amount, isChecked) {
  const checked = isChecked ? "checked" : ""
  return `<li class="checklistItem" id='${id}'> 

      <span  id="itemName"> 
      ${name} 
      </span>  
            
        <button  class="listItemBtn" id="itemAmount">  
        x ${amount} 
        </button>
        
       <input  class="checkbox" type="checkbox" name="checkbox" onclick="checkboxChanged('${id}')" id="l_${id}" ${checked}>
  </li>`
}

window.checkboxChanged = checkboxChanged

async function checkboxChanged (id) {
  const checkbox = document.getElementById(`l_${id}`)
  if (checkbox.checked){
    await db.checkItem(id)

  }
  else {
    await db.uncheckItem(id)
  }
  await displayItemList()
}