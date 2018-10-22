const passport = require("passport");
const keys = require("../../config/keys");
module.exports = app => {
  // Social Media Login
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: keys.redirectDomain,
      failureRedirect: `${keys.redirectDomain}/login`
    })

    // (req, res) => {
    //   res.redirect("http://localhost:3000");
    // }
  );

  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    req.logout();
    // req.session = null;

    res.redirect("/");
    // res.send("logout");
    // req.session.destroy(function(err) {
    //   res.clearCookie("connect.sid");
    //   console.log("Authenticated " + req.isAuthenticated());
    //   res.redirect("/");
    // });

    // if (req.session) {
    //   req.session = null;
    //   // Delete Session
    //   // req.session.destroy(function(err) {
    //   //   if (err) {
    //   //     return next(err);
    //   //   } else {

    //   //     return res.redirect("/");
    //   //   }
    //   // });
    // }
  });
};
