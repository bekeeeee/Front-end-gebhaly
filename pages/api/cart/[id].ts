import { NextApiRequest, NextApiResponse } from "next";
import cart from "../../../public/data/cart.json";
import editFile from "../../../helper/editFile";
const cartFile = process.cwd() + "/public/data/cart.json";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  let productIndex;
  switch (method) {
    case "DELETE":
      productIndex = cart.findIndex(
        (product) => product.productId.toString() == id
      );
      if (productIndex > -1) {
        cart.splice(productIndex, 1);
        editFile(cartFile, cart);
        res.status(202).json(cart);
      } else {
        res.status(402).json({ error: "there is no item with this id" });
      }
      break;
  }
}
