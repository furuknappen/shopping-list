import PocketBase, { LocalAuthStore } from "../lib/pocketbase.es.mjs"

const pb = new PocketBase("https://db.shopping-list.furuknappen.no", new LocalAuthStore())

async function login(email, password) {
  console.log("Logging in...")
  try {
    const result = await pb.collection("users").authWithPassword(email, password)
    console.log("Logging in succeded")
    return {
      id: result.record.id,
      name: result.record.name,
      email: result.record.email,
    }
  } catch (error) {
    console.error("Logging in failed with error: ", error)
    throw error
  }
}

function getLoggedInUser() {
  return {
    id: pb.authStore.baseModel.id,
    name: pb.authStore.baseModel.name,
    email: pb.authStore.baseModel.email,
  }
}

async function logout() {
  console.log("Loggin out...")
  await pb.authStore.clear()
  console.log("Logged out")
}

async function listItems() {
  try {
    const result = await pb.collection("items").getFullList({
      fields: "id,name,amount,checked",
      expand: "",
      filter: "",
      sort: "checked",
    })
    // console.log("listItems result:")
    // console.table(result)
    return result
  } catch (error) {
    console.error("Getting all items failed with error: ", error)
  }
}

async function listCategories() {
  try {
    const result = await pb.collection("categories").getFullList({
      fields: "id,name,order,color",
      expand: "",
      filter: "",
      sort: "order",
    })
    return result
  } catch (error) {
    console.error("Getting all items failed with error: ", error)
  }
}

async function listShoppingItems() {
  try {
    const date = new Date().toISOString().split("T")[0]
    const result = await pb.collection("items").getList(1, 1000, {
      fields: "id,name,amount,checked,expand.category.name,expand.category.color",
      expand: "category",
      filter: `(checked = false || updated > '${date}')`,
      sort: "checked,category.order",
    })
    const items = result.items.map(({expand,...item}) => ({
      ...item,
      category: expand.category.name,
      categoryColor: expand.category.color,
    }))
    return items
  } catch (error) {
    console.error("Getting all items failed with error: ", error)
  }
}

async function searchItems(text) {
  try {
    const result = await pb.collection("items").getList(1, 1000, {
      fields: "id,name,amount,checked",
      expand: "",
      filter: `name~'${text}'`,
      sort: "checked",
    })
    // console.log("searchItems result:")
    // console.table(result.items)
    return result.items
  } catch (error) {
    console.error("Getting all items failed with error: ", error)
  }
}


async function checkItem(id) {
  console.log(`Checking item with id = "${id}" ...`)

  try {
    await pb.collection("items").update(id, { checked: true })
    console.log(`Checking item with id = "${id}" succeded`)
  } catch (error) {
    console.error(`Checking with id = "${id}" failed with error`, error)
  }
}

async function uncheckItem(id) {
  console.log(`Unchecking item with id = "${id}" ...`)

  try {
    await pb.collection("items").update(id, { checked: false })
    console.log(`Unchecking item with id = "${id}" succeded`)
  } catch (error) {
    console.error(`Unchecking with id = "${id}" failed with error`, error)
  }
}

async function RefreshLogin(){
  await pb.collection("users").authRefresh();
  console.log("Refreshed login")
}

// Refresh the login session on page load
try {
  setTimeout(RefreshLogin, 5000)
} catch (error) {
  console.log("Failed to refresh login")
}

export default {
  login,
  logout,
  getLoggedInUser,
  listItems,
  listCategories,
  listShoppingItems,
  searchItems,
  checkItem,
  uncheckItem,
}
