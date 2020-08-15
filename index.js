// require('dotenv').config(); 
// const port = process.env.PORT || 2020;

const server = require("./server.js");
const port = 2020;


server.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});