const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/AdminName", {
    useNewUrlParser: true,

    useUnifiedTopology: true

}).then(() => {
    console.log("Connection succesful")
}).catch((e) => {
    console.log("error",e)
})