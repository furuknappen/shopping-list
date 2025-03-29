
const hamburgerMenu = document.getElementById("hamburgerMenu")
hamburgerMenu.style.display = "none"
window.openMenu = openMenu
function openMenu() {
  if (hamburgerMenu.style.display === "none") {
    hamburgerMenu.style.display = "grid"
  } else {
    hamburgerMenu.style.display = "none"
  }
}