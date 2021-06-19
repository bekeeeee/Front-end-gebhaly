import { useContext, useEffect } from "react";
import axios from "axios";

import { ProductsContext } from "../context/productsContext";
import styles from "../styles/products.module.scss";
import { url } from "../helper/config";

export default function ProductsPage() {
  const { products, setProducts, total, setTotal } =
    useContext(ProductsContext);

  useEffect(() => {
    // Get all products
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data } = await axios.get(`${url}/products`);
    setProducts(data);
  };

  const addToCart = async (productId, price) => {
    await axios.post(`${url}/cart`, {
      productId,
    });
    setTotal(total + price); // set total price
  };
  // render all products
  const renderProducts =
    products.length > 0
      ? products.map((product) => {
          return (
            <div className={styles.card} key={product._id}>
              <img
                src={product.picture}
                alt={product.name}
                className={styles.imgProduct}
              />
              <h1>{product.name}</h1>
              <p className={styles.price}>${product.price}</p>
              {product.quantity < 1 && (
                <p className={styles.outStock}> out of stock</p>
              )}{" "}
              <p>
                <button onClick={() => addToCart(product._id, product.price)}>
                  Add to Cart
                </button>
              </p>
            </div>
          );
        })
      : null;
  return <div className={styles.products}>{renderProducts}</div>;
}
