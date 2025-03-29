import secrets from "./secrets.js"

const pb = new PocketBase("https://db.shopping-list.furuknappen.no")

async function login(email, password) {
  console.log("Logging in...")
  try {
    await pb.collection("users").authWithPassword(email, password)
    console.log("Logging in succeded")
  } catch (error) {
    console.error("Logging in failed with error: ", error)
  }
  console.log("Is user logged in: ", pb.authStore.isValid)
}

async function logout() {
  console.log("Loggin out...")
  await pb.authStore.clear()
  console.log("Logged out")
}

async function listItems() {
  console.log("Getting all items...")
  try {
    const result = await pb.collection("items").getFullList()
    console.log("Getting all items succeded")

    return result.map((item, index) => ({
      id: item.id,
      name: item.Name,
      checked: item.Checked,
      amount: item.Amount,
      updated: item.updated,
      index: index,
    }))
  } catch (error) {
    console.error("Getting all items failed with error: ", error)
  }
}

async function checkItem(id) {
  console.log(`Checking item with id = "${id}" ...`)

  try {
    await pb.collection("items").update(id, { Checked: true })
    console.log(`Checking item with id = "${id}" succeded`)
  } catch (error) {
    console.error(`Checking with id = "${id}" failed with error`, error)
  }
}

async function uncheckItem(id) {
  console.log(`Unchecking item with id = "${id}" ...`)

  try {
    await pb.collection("items").update(id, { Checked: false })
    console.log(`Unchecking item with id = "${id}" succeded`)
  } catch (error) {
    console.error(`Unchecking with id = "${id}" failed with error`, error)
  }
}

await login(secrets.email, secrets.password)

export default {
  login,
  logout,
  listItems,
  checkItem,
  uncheckItem,
}
