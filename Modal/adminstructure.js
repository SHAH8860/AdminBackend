const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Adminschema = new mongoose.Schema({
  AdminEmail: {
    type: String,
    required: true,
  },
  AdminPassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

Adminschema.methods.generatetoken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameisnirajkumarshahandiamadeveloper"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log("the error is" + error);
  }
};

Adminschema.pre("save", async function (next) {
  try {
    if (this.isModified("AdminPassword")) {
      this.AdminPassword = await bcrypt.hash(this.AdminPassword, 10);
      
    }
    next();
  } catch (error) {
    console.log("Error", error);
  }
});

const AdminData = new mongoose.model("Admin", Adminschema);
module.exports = AdminData;
