"use client";

import { useCart } from "@/context/CartContext";
import MediaQuery from "react-responsive";
import Button from "@/components/Button/Button";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

const CartPage = () => {
  const { cart, getCartCount, removeFromCart, getCartTotal } = useCart();
  const cartCount = getCartCount();

  console.log(cart);

  if (cart.length === 0) {
    return (
      <section className={styles.CartPage}>
        <div>
          <h2>Cart ({cartCount})</h2>
        </div>
        <div className={styles.CartPage__summary}>
          <Link href='/'>
            <Button variant='outline'>Continue Shopping</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.CartPage}>
      <div>
        <h2>Cart ({cartCount})</h2>
      </div>

      {cart.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className={styles.CartPage__phoneDetails}
        >
          <div className={styles.CartPage__phoneDetails__image}>
            <Image
              src={
                item.colorOptions.find(
                  ({ name }) => name === item.selectedColor
                )?.imageUrl || ""
              }
              alt={item.name}
              width={350}
              height={350}
            />
          </div>
          <div className={styles.CartPage__phoneDetails__specs}>
            <div className={styles.CartPage__phoneDetails__specs__content}>
              <p>{item.name}</p>
              <p>
                {item.selectedStorage} | <span>{item.selectedColor}</span>
              </p>
              <p
                className={styles.CartPage__phoneDetails__specs__content__price}
              >
                {item.basePrice} EUR
              </p>
            </div>
            <button
              className={styles.CartPage__phoneDetails__specs__removeBtn}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className={styles.CartPage__summary}>
        <MediaQuery minWidth={680}>
          {(matches) =>
            matches ? (
              <>
                <Link href='/'>
                  <Button variant='outline'>Continue Shopping</Button>
                </Link>
                <div className={styles.CartPage__summary__checkout}>
                  <p className={styles.CartPage__summary__checkout__total}>
                    Total {getCartTotal()} EUR
                  </p>
                  <Button>Pay</Button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.CartPage__summary__checkout__total}>
                  <span>Total</span>
                  <span>{getCartTotal()} EUR</span>
                </p>
                <div
                  className={styles.CartPage__summary__checkout__btnContainer}
                >
                  <Link href='/'>
                    <Button variant='outline'>Continue Shopping</Button>
                  </Link>
                  <Link href=''>
                    <Button>Pay</Button>
                  </Link>
                </div>
              </>
            )
          }
        </MediaQuery>
      </div>
    </section>
  );
};

export default CartPage;
