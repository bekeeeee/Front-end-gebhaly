import { NextApiRequest, NextApiResponse } from "next";
import cart from "../../../public/data/cart.json";
import products from "../../../public/data/products.json";

import editFile from "../../../helper/editFile";
const cartFile = process.cwd() + "/public/data/cart.json";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { cartUpdates, productId } = req.body;

  let productIndex;
  switch (method) {
    case "GET":
      res.status(200).json(cart);
      break;

    case "PUT":
      editFile(cartFile, cartUpdates);
      res.status(201).json(cartUpdates);

      break;

    case "POST":
      productIndex = cart.findIndex(
        (product) => product.productId == productId
      );
      const product = products.find((product) => product._id == productId);
      if (product.quantity > 1) {
        if (productIndex > -1) {
          cart[productIndex].quantity = cart[productIndex].quantity + 1;
        } else {
          cart.push({ productId, quantity: 1 });
        }
        editFile(cartFile, cart);
        res.status(201).json(cart);
      } else {
        res.status(403).send("this product out of stock");
      }

      break;

    case "DELETE":
      productIndex = cart.findIndex(
        (product) => product.productId == productId
      );
      if (productIndex > -1) {
        cart.splice(productIndex, 1);
        editFile(cartFile, cart);
        res.status(202).json(cart);
      } else {
        res.status(403).json({ error: "there is no item with this id" });
      }
      break;
  }
}
