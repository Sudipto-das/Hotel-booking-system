
require('dotenv').config()
const app = require("./src/app.js");
const connectToDb = require("./src/config/database.js");
const dns = require("dns")

dns.setServers(['1.1.1.1','8.8.8.8'])

connectToDb()
app.listen(3000,()=>{
    console.log("Server is running at port 3000");
});