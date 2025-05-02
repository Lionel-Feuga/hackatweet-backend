var express = require("express");
var router = express.Router();
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/signup", async function (req, res) {
  const { firstname, username, password } = req.body;

  if (firstname !== "" && username !== "" && password !== "") {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ result: false, error: "Nom d'utilisateur déjà pris." });
    }

    const hash = bcrypt.hashSync(password, 10);
    const token = uid2(32);
    const newUser = new User({
      firstname,
      username,
      password: hash,
      token: token,
    });

    await newUser.save();
    return res.json({ result: true, token, username, firstname });
  } else {
    return res.json({ result: false, error: "Champ(s) manquant(s)" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (username !== "" && password !== "") {
    const existingUser = await User.findOne({ username });

    if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
      return res.json({
        result: true,
        token: existingUser.token,
        username: existingUser.username,
        firstname: existingUser.firstname,
      });
    } else {
      return res.json({
        result: false,
        error: "Utilisateur non existant ou mauvais mot de passe",
      });
    }
  } else {
    return res.json({ result: false, error: "Champ(s) manquant(s)" });
  }
});

module.exports = router;
