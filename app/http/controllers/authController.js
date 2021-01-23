const Users = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authController() {
  return {
    signup: (req, res) => {
      res.render("auth/signup");
    },

    postSignUp: async (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/signup");
      }

      Users.exists({ email }, (err, result) => {
        if (result) {
          req.flash("error", "Email alrady exits");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/signup");
        }
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new Users({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went Wrong");
          return res.redirect("/signup");
        });

      //console.log(req.body);
    },

    login: (req, res) => {
      res.render("auth/login");
    },

    postLogin: (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return res.redirect("/");
        });
      })(req, res, next);
    },

    logout: (req, res) => {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authController;
