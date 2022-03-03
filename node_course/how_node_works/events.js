const eventEmitter = require("events");

const myEmitter = new eventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Costmer name: Ram");
});
myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items`);
});
myEmitter.emit("newSale", 9);
