const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/////////////////
// function--creating jwt token
const createToken = (id) => {
  return jwt.sign({ id }, "jwt secret key"); //jwt.sign
};

////////////////////////////////////////////////
//////ROUTES//////////////////////
//////////////////////////////////
router.get("/signup", (req, res) => {
  res.render("signup");
});
//
router.get("/login", (req, res) => {
  res.render("login");
});
//
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({
      email: email,
      password: password,
    });
    //
    const token = createToken(user._id);
    //
    res.cookie("jwt", token);
    // // Create token
    // const token = jwt.sign({ user_id: user._id }, "jwt password");
    //
    // user.tokens = user.tokens.concat({ token });
    await user.save();
    res.status(200).send();
    // res.send();
  } catch (e) {
    res.send(e);
  }
});

//
router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    const user = await User.login(email, password);
    //
    const token = createToken(user._id);
    console.log(token, "from login/post");

    //
    //
    res.cookie("jwt", token);

    // res.send({ user: newUser, token });
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

//logout
router.get("/logout", (req, res) => {
  //here ''- empty string is the cookie value
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});
//
module.exports = router;
