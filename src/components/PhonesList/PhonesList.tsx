import { Phone } from "@/types";
import Link from "next/link";
// import Image from "next/image";
import styles from "./PhonesList.module.scss";
import Image from "next/image";

interface PhonesListProps {
  phones: Phone[];
}

export default function PhonesList({ phones }: PhonesListProps) {
  return (
    <ul className={styles.PhonesList}>
      {phones.map((phone, index) => (
        <Link href={`/phones/${phone.id}`} key={`${phone.id}-${index}`}>
          <li className={styles.PhonesList__card}>
            <Image
              className={styles.PhonesList__card__image}
              src={phone.imageUrl}
              alt={phone.name}
              width={220}
              height={220}
              priority
            />
            <p className={styles.PhonesList__card__brand}>{phone.brand}</p>
            <div className={styles.PhonesList__card__info}>
              <p>{phone.name}</p>
              <p>${phone.basePrice}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
