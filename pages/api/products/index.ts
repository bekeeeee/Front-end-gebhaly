import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../public/data/products.json";
export default function (req: NextApiRequest, res: NextApiResponse) {
  res.json(products);
}
