import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll(".cart");
let cartCounter = document.querySelector("#counter");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;

      new Noty({
        text: "Item added to cart",
        type: "success",
        timeout: 1000,
        progressBar: false,
      }).show();
    })
    .catch((err) => {
      new Noty({
        text: "Something went wrong",
        type: "error",
        timeout: 1000,
        progressBar: false,
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    //console.log(pizza);
  });
});

const alertMessage = document.querySelector("#success-alert");
if (alertMessage) {
  setTimeout(() => {
    alertMessage.remove();
  }, 2000);
}

initAdmin();
