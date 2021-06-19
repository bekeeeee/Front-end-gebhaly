import { NextApiRequest, NextApiResponse } from "next";
// import products, { Product } from "../../../data/products";
import products from "../../../public/data/products.json";
import editFile from "../../../helper/editFile";
const productsFile = process.cwd() + "/public/data/products.json";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const id = req.query.id;

  interface Product {
    id: string;
    name: string;
    category: string;
    picture: string;
    price: number;
  }

  const productUpdate = req.body;

  switch (method) {
    case "PUT":
      const productIndex = products.findIndex(
        (product) => product._id == parseInt(id[0])
      );
      if (productIndex > -1) {
        products[productIndex] = { id, ...productUpdate };
        editFile(productsFile, products);
      }
  }

  res.json(productUpdate);
}
