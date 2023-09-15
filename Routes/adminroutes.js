const express = require("express");
const app = express();
const mongoose = require("mongoose");
const admin = require("../Modal/adminstructure");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  try {
    let token;
    let data = new admin({
      AdminEmail: req.body.AdminEmail,
      AdminPassword: req.body.AdminPassword,
    });
    token = await data.generatetoken();
    // let cookie = res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 30000),
    //   httpOnly: true,
    // });
    await data.save();
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});
router.get("/all", async (req, res, next) => {
  try {
    await admin.find().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    console.log("error", error);
  }
});
router.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let adminemailaddress = await admin.findOne({ AdminEmail: email });
    const ismatch = await bcrypt.compare(
      password,
      adminemailaddress.AdminPassword
    );
    const token = await adminemailaddress.generatetoken();
    if (adminemailaddress.AdminEmail!= null) {
      if (ismatch) {
        res.status(200).json({ token });
      } 
      else {
        res.status(400).json({ error: "Invalid Credientials" });
      }
    } 
    else {
      res.status(500).json({ message: "Invalid user" });
    }
  } catch (error) {}
});
module.exports = router;
