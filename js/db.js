import PocketBase, { LocalAuthStore } from "../lib/pocketbase.es.mjs"

const itemTableName = "items" // Prod: "items". Test: "items_test"

const pb = new PocketBase("https://db.shopping-list.furuknappen.no", new LocalAuthStore())

async function login(email, password) {
  // console.log("Logging in...")
  try {
    const result = await pb.collection("users").authWithPassword(email, password)
    // console.log("Logging in succeded")
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
  await pb.authStore.clear()
}

async function listItems() {
  try {
    const result = await pb.collection(itemTableName).getFullList({
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
async function getItem(id) {
  try {
    const result = await pb.collection(itemTableName).getOne(id)

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

async function listPlanningItems() {
  try {
    const date = new Date().toISOString().split("T")[0]
    const result = await pb.collection(itemTableName).getList(1, 1000, {
      fields: "id,name,amount,checked,expand.category.name,expand.category.color",
      expand: "category",
      filter: "",
      sort: "category.order,name",
    })
    const items = result.items.map(({ expand, ...item }) => ({
      ...item,
      category: expand.category.name,
      categoryColor: expand.category.color,
    }))
    return items
  } catch (error) {
    console.error("Getting all items failed with error: ", error)
  }
}

async function listShoppingItems() {
  try {
    const date = new Date().toISOString().split("T")[0]
    const result = await pb.collection(itemTableName).getList(1, 1000, {
      fields: "id,name,amount,checked,expand.category.name,expand.category.color",
      expand: "category",
      filter: `(checked = false || updated > '${date}')`,
      sort: "checked,category.order",
    })
    const items = result.items.map(({ expand, ...item }) => ({
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
    const result = await pb.collection(itemTableName).getList(1, 1000, {
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

async function addItem(name, categoryId, checked = true, amount = 1 ) {
  try {
    await pb.collection(itemTableName).create({
      name,
      category: categoryId,
      checked,
      amount,
    })
    // console.log(`Adding item with name = "${name}" succeded`)
  } catch (error) {
    console.error(`Adding item with name = "${name}" failed with error`, error)
  }
}

async function checkItem(id) {
  // console.log(`Checking item with id = "${id}" ...`)

  try {
    await pb.collection(itemTableName).update(id, { checked: true })
    // console.log(`Checking item with id = "${id}" succeded`)
  } catch (error) {
    console.error(`Checking with id = "${id}" failed with error`, error)
  }
}

async function uncheckItem(id) {
  // console.log(`Unchecking item with id = "${id}" ...`)

  try {
    await pb.collection(itemTableName).update(id, { checked: false })
    // console.log(`Unchecking item with id = "${id}" succeded`)
  } catch (error) {
    console.error(`Unchecking with id = "${id}" failed with error`, error)
  }
}

async function updateItem(id, name, amount, category, checked = true) {
  try {
    await pb.collection(itemTableName).update(id, {
      name: name,
      checked: checked,
      amount: amount,
      category: category,
    })
  } catch (error) {
    console.error(`Unchecking with id = "${id}" failed with error`, error)
  }
}

async function deleteItem(id) {
  try {
    await pb.collection(itemTableName).delete(id)
  } catch (error) {
    console.error(`Deleting item with id = "${id}" failed with error`, error)
  }
}


async function RefreshLogin(){
  await pb.collection("users").authRefresh();
}

// Refresh the login session on page load
try {
  setTimeout(RefreshLogin, 5000)
} catch (error) {
  console.warn("Failed to refresh login")
}

export default {
  login,
  logout,
  getLoggedInUser,
  listItems,
  listCategories,
  listPlanningItems,
  listShoppingItems,
  searchItems,
  checkItem,
  uncheckItem,
  updateItem,
  getItem,
  addItem,
  deleteItem,
}
