import db from "./db.js";
const items = await db.listItems();
console.log(items);


