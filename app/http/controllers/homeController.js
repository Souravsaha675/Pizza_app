const Menu = require("../../models/menu");

function homeController() {
  return {
    index: async (req, res) => {
      const pizzas = await Menu.find();
      //console.log(pizzas);
      res.render("home", { pizzas });
    },
  };
}

module.exports = homeController;
