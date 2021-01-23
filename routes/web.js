const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require("../app/http/middleware/guest");

function initRoutes(app) {
  app.get("/", homeController().index);

  app.get("/login", guest, authController().login);

  app.post("/login", authController().postLogin);

  app.get("/signup", guest, authController().signup);

  app.post("/signup", authController().postSignUp);

  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index);

  app.post("/update-cart", cartController().update);
}

module.exports = initRoutes;
