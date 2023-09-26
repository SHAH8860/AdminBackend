
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const port=process.env.PORT||8000
var admindata=require("./Routes/adminroutes");
require('./connect');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use("/admin",admindata)
app.listen(port,()=>{
    console.log(`Connected on port${port}`)

})
