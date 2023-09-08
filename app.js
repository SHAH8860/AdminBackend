const express = require('express');
const app = express();
var cors = require('cors');
var admindata=require("./Routes/adminroutes");
require('./connect');
var bodyParser = require('body-parser');
const port=process.env.PORT||8000
app.use(bodyParser.json());
app.use(cors());
app.use("/admin",admindata)





app.listen(port,()=>{
    console.log(`Connected on port${port}`)

})