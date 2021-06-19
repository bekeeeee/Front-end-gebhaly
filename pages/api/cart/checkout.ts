import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../public/data/products.json";

import editFile from "../../../helper/editFile";
const cartFile = process.cwd() + "/public/data/cart.json";
const productsFile = process.cwd() + "/public/data/products.json";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { cartConfirmed, stock } = req.body;

  switch (method) {
    case "POST":
      if (!(stock === "on"))
        res.send({ err: "there are at least one product out of stock" });
      cartConfirmed.map((productCart) => {
        products.map((product) => {
          product.quantity =
            product._id === productCart.productId
              ? product.quantity - productCart.quantity
              : product.quantity;
        });
      });

      editFile(cartFile, []);
      editFile(productsFile, products);

      res.status(201).json(cartConfirmed);

      break;
  }
}
