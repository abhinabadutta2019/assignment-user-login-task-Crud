const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  //for browser cookie-it is correct
  // let token = req.cookies.jwt;

  // for postman
  let token = req.headers.jwt;

  //check if jwt exist and verify
  if (token) {
    jwt.verify(token, "jwt secret key", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        //
        res.redirect("/login");
      } else {
        console.log(decodedToken, "decodedToken-parameter");
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//
module.exports = { requireAuth };
