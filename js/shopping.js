import db from "./db.js"

await displayItemList()

// TODO: Offset this page so that the top item is not behind the header.

async function displayItemList() {
  const items = await db.listShoppingItems()
  getItemsInCart(items)

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


// shoppingStats inCart  itemsToGo

async function getItemsInCart (items) {

const numberChecked = items.filter((item) => {
  return item.checked 
}).length

const numberUnChecked = items.filter((item) => {
  return !item.checked 
}).length
// console.log(numberUnChecked)
//    console.log(numberChecked)
document.getElementById("inCart").innerHTML =numberChecked
document.getElementById("itemsToGo").innerHTML =numberUnChecked 
}

// shopping cart animation
window.startAnimation = startAnimation
function startAnimation() {
    
  console.log("animation should start")
  document.getElementById("shoppingcartSvgBtn").classList.toggle('shoppingcartSvgBtn')
  setTimeout(shoppingcartSvgBtn, 3500) 
}

function shoppingcartSvgBtn(){
console.log("animation should stop")
  document.getElementById("shoppingcartSvgBtn").classList.toggle('shoppingcartSvgBtn')
}

// refresh button
window.startRefresh = startRefresh

async function startRefresh() {
  await displayItemList()
  console.log("animation should start")
  document.getElementById("refreshSvg")
  .classList.toggle('refreshBtn')
  setTimeout(refreshBtn, 1000) 
}

function refreshBtn(){
console.log("animation should stop")
  document.getElementById("refreshSvg").classList.toggle('refreshBtn')
}