const req = require("express/lib/request");
const fs = require("fs");
//const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("timer 1 finished"));
setImmediate(() => console.log("Immidiate 1 finished"));

fs.readFile("text-file.txt", () => {
  setTimeout(() => console.log("timer 2 finished"));
  //setTimeout(() => console.log("timer 3 finished"), 3000);
  setImmediate(() => console.log("Immidiate 2 finished"));
  console.log("I/O finsished");
  console.log("----------");
});
console.log("HEllo from top level code");
