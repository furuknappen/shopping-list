// import db from "./db.js"

function openEditModal(name){
  document.getElementById("ItemInputname").value = name
  document.querySelector("[data-modal]").showModal()
}


function closeEditModal(){
  document.querySelector("[data-modal]").close()
}


window.openEditModal = openEditModal
window.closeEditModal = closeEditModal

export default {
  openEditModal,
  closeEditModal, 
}

