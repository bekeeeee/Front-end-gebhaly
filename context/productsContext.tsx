import React, { useState, createContext } from "react";
import productsInit from "../public/data/products.json";
import cartInit from "../public/data/cart.json";

export const ProductsContext = createContext(null);

export const ProductsProvider = (props: any) => {
  const [products, setProducts] = useState(productsInit);
  const [cart, setCart] = useState(cartInit);
  const [total, setTotal] = useState(0);
  const [productAvailabe, setProductAvailabe] = useState("in");

  // const getTotalInit = () =>
  //   cart.map((itemProduct) => {
  //     if (itemProduct.productId) {
  //       products.map((product) => {
  //         if (product._id === itemProduct.productId) {
  //           setTotal(total + itemProduct.quantity * product.price);
  //         }
  //       });
  //     }
  //   });

  const increaseQuantity = (productId) => {
    products.map((product) => {
      if (product.quantity > 0 && product._id === productId) {
        cart.map((productItem) => {
          if (productItem.productId === productId)
            productItem.quantity = productItem.quantity + 1;
        });
        product.quantity = product.quantity - 1;
        if (product.quantity === 0) setProductAvailabe("out");
        setTotal(total + product.price);
      }
    });

    setProducts(products);
    setCart(cart);
  };

  const decreaseQuantity = (productId) => {
    products.map((product) => {
      if (product._id === productId) {
        cart.map((productItem) => {
          if (productItem.quantity > 0 && productItem.productId === productId) {
            productItem.quantity = productItem.quantity - 1;
            product.quantity = product.quantity + 1;
            setTotal(total - product.price);
          }
          if (product.quantity > 1) setProductAvailabe("in");
        });
      }
    });

    setProducts(products);
    setCart(cart);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        productAvailabe,
        setProductAvailabe,
        total,
        setTotal,
        increaseQuantity,
        decreaseQuantity,
        cart,
        setCart,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
