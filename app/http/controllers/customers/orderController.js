const orders = require("../../../models/order");
const Order = require("../../../models/order");

function orderController() {
  return {
    store: (req, res) => {
      //console.log(req.body);
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All Fields are required");
        return res.redirect("/cart");
      }

      const order = new Order({
        coustomerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed successfully");
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Sometthing went wrong");
          return res.redirect("/cart");
        });
    },

    index: async (req, res) => {
      const orders = await Order.find({
        coustomerId: req.user._id,
      });
      res.render("customers/orders", { orders });
      //console.log(orders);
    },
  };
}

module.exports = orderController;
