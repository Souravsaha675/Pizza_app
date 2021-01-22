const users = require("../../models/user");
const bcrypt = require("bcrypt");

function authController() {
  return {
    signup: (req, res) => {
      res.render("auth/signup");
    },

    login: (req, res) => {
      res.render("auth/login");
    },

    postSignUp: async (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/signup");
      }

      users.exists({ email }, (err, result) => {
        if (result) {
          req.flash("error", "Email alrady exits");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/signup");
        }
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new users({
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

      console.log(req.body);
    },
  };
}

module.exports = authController;
