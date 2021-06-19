import Link from "next/link";
import styles from "../styles/Layout.module.scss";
import styles2 from "../styles/Home.module.css";
export default function Layout({ children }) {
  return (
    <>
      <header className={styles2.header}>
        <nav className={styles.navbar}>
          <Link href="/">
            <a className={styles.navlogo}>Euro2020</a>
          </Link>
          <ul className={styles.navmenu}>
            <li className={styles.navitem}>
              <Link href="/products">
                <a
                  className={styles.navlink}
                  // onClick={() => console.log("click")}
                >
                  Products
                </a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/cart">
                <a
                  className={styles.navlink}
                  // onClick={() => console.log("click")}
                >
                  Cart
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <div className={styles2.container}>
        <footer className={styles.footer}>
          <a>
            <img src="/img/logo.jpg" alt="Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </>
  );
}
