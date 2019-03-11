const calc = require("./calc");
const PORT = 3000;

calc.calcServer(PORT, (s) => console.log("Server started"));