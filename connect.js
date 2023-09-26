const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/AdminName", {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).catch((e) => {
    console.log("error",e)
}).then(() => {
    console.log("Connection succesful")
})