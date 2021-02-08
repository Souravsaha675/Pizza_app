const { populate } = require("../../../models/order");
const orders = require("../../../models/order");

function orderController() {
  return {
    index: (req, res) => {
      orders
        .find({ status: { $ne: "completed" } }, null, {
          sort: { createdAt: -1 },
        })
        .populate("coustomerId", "-password")
        .exec((err, orders) => {
          if (req.xhr) {
            return res.json(orders);
          } else {
            return res.render("admin/orders");
          }
        });
    },
  };
}

module.exports = orderController;
