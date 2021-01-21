function authController() {
  return {
    signup: (req, res) => {
      res.render("auth/signup");
    },

    login: (req, res) => {
      res.render("auth/login");
    },
  };
}

module.exports = authController;
