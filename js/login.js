import db from "./db.js"

window.userLogin = userLogin

 function userLogin(event) {
  event.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

 db.login(email, password) 
 .then(() => {
  window.location.href="/"
 }
 )
 .catch(() => {
  alert("Wrong Email or password :(")
 })

}

