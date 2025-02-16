import { Phone } from "@/types";
import Link from "next/link";
import styles from "./PhonesList.module.scss";
import PhoneCard from "../PhoneCard/PhoneCard";

interface PhonesListProps {
  phones: Phone[];
}

export default function PhonesList({ phones }: PhonesListProps) {
  return (
    <ul className={styles.PhonesList}>
      {phones.map((phone, index) => (
        <Link href={`/phones/${phone.id}`} key={`${phone.id}-${index}`}>
          <PhoneCard
            name={phone.name}
            price={phone.basePrice}
            image={phone.imageUrl}
            brand={phone.brand}
          />
        </Link>
      ))}
    </ul>
  );
}
