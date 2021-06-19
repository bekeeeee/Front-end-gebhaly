import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../context/productsContext";

import styles from "../styles/cart.module.scss";
import { url } from "../helper/config";

export default function cart() {
  const {
    products,
    setProducts,
    cart,
    setCart,
    decreaseQuantity,
    increaseQuantity,
    total,
    setTotal,
    productAvailabe,
  } = useContext(ProductsContext);

  const renderCart =
    cart.length > 0
      ? cart.map((item) => {
          const product = products.find(
            (productItem) => productItem._id === item.productId
          );

          return (
            <div className={styles.row} key={item.productId}>
              <div className={styles.colProCont}>
                {product.quantity === 0 ? (
                  <span className={styles.stock}>out of stock</span>
                ) : null}
                <img
                  className={styles.imgProduct}
                  src={product.picture}
                  alt={product.category}
                />
                <p>{product.name}</p>
              </div>

              <div className={styles.colPriceCont}>
                <p>${product.price}</p>
              </div>

              <div className={styles.colQtyCont}>
                <a
                  className={styles.colQtyA}
                  onClick={() => decreaseQuantity(product._id)}
                >
                  -
                </a>
                <input type="numeric" value={item.quantity} />
                <a
                  className={styles.colQtyA}
                  onClick={() => increaseQuantity(product._id)}
                >
                  +
                </a>
              </div>

              <div className={styles.colTotCont}>
                <p> ${item.quantity * product.price}</p>
              </div>
              <div className={styles.colRemoveCont}>
                <a
                  className={styles.removeBtn}
                  onClick={() =>
                    removeProduct(item.productId, product.price, item.quantity)
                  }
                >
                  Remove
                </a>{" "}
              </div>
              <br />
            </div>
          );
        })
      : null;
  const removeProduct = async (productId, price, quantity) => {
    await axios.delete(`${url}/cart/${productId}`); // remove product 
    setTotal(total - price * quantity);
  };
  useEffect(() => {
    getCart(); // get all cart
    getProducts(); // get 
  }, []);
  const getCart = async () => {
    const { data } = await axios.get(`${url}/cart`);
    setCart(data);
  };

  const getProducts = async () => {
    const { data } = await axios.get(`${url}/products`);
    setProducts(data);
  };
  const updateCart = async () => {
    await axios.put(`${url}/cart`, {
      cartUpdates: cart,
      stock: productAvailabe,
    });
    setTotal(total);
  };


  const checkout = async () => {
    await axios.post(`${url}/cart/checkout`, {
      cartConfirmed: cart,
      stock: productAvailabe,
    });
  };
  return (
    <div className={styles.container}>
      <a className={styles.btn} onClick={updateCart}>
        Update cart
      </a>

      <div className={styles.table}>
        <div className={styles.layoutInline}>
          <div className={styles.colPro}>Product</div>
          <div className={styles.colPrice}>Price</div>
          <div className={styles.colQty}>QTY</div>
          <div className={styles.colTot}>Total</div>
          <div className={styles.colRemove}>Remove</div>
        </div>
      </div>
      {renderCart}
      <div className={styles.tf}>
        <div className={styles.row}>
          <div>
            <p>Total</p>
          </div>
          <div className={styles.colQty}></div>
          <div>
            <p>{total}</p>
          </div>
          <div className={styles.colTot}></div>
        </div>
      </div>
      <a className={styles.btn} onClick={checkout}>
        Check out
      </a>
    </div>
  );
}
