import db from "./db.js"

console.log("loading login.js")

window.userLogin = userLogin

 function userLogin(event) {
  event.preventDefault()
  console.log("works")
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

