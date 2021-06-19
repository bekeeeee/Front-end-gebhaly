import Layout from "../components/layout";
import { ProductsProvider } from "../context/productsContext";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </Layout>
  );
}

export default MyApp;
