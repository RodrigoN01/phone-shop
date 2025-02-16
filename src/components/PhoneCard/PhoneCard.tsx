import React from "react";
import Image from "next/image";
import styles from "./PhoneCard.module.scss";

interface PhoneCardProps {
  name: string;
  image: string;
  price: number;
  brand: string;
}

const PhoneCard = ({ name, price, image, brand }: PhoneCardProps) => {
  return (
    <li className={styles.PhoneCard}>
      <Image
        className={styles.PhoneCard__image}
        src={image}
        alt={name}
        width={220}
        height={220}
        priority
      />
      <p className={styles.PhoneCard__brand}>{brand}</p>
      <div className={styles.PhoneCard__info}>
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </li>
  );
};
export default PhoneCard;
