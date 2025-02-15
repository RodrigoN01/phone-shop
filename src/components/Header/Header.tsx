"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const { getCartCount } = useCart();
  const pathname = usePathname();
  const cartCount = getCartCount();

  return (
    <nav className={styles.Header}>
      <Link href='/'>
        <Image
          src='/svgs/logo.svg'
          alt='logo'
          width={74}
          height={24}
          priority
        />
      </Link>
      {pathname !== "/cart" && (
        <Link href='/cart' className={styles.Header__cart}>
          <Image
            src={
              cartCount > 0
                ? "/svgs/bag-icon-active.svg"
                : "/svgs/bag-icon-inactive.svg"
            }
            alt='bag'
            width={33}
            height={26}
            priority
          />
          {cartCount > 0 && (
            <span className={styles.Header__cart__count}>{cartCount}</span>
          )}
        </Link>
      )}
    </nav>
  );
};

export default Header;
