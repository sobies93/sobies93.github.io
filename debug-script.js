const { argv } = require("node:process");

const [, , client] = argv;

console.log(client);