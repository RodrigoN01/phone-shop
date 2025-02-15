"use client";

import { use, useState } from "react";
import { usePhone } from "@/hooks/usePhone";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import styles from "./page.module.scss";

const PhoneDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = use(params);
  const { phone, loading } = usePhone(unwrappedParams.id);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const { addToCart } = useCart();

  if (loading) {
    return (
      <section className={styles.PhoneDetailsPage}>
        <div>Loading...</div>
      </section>
    );
  }

  if (!phone) {
    return (
      <section className={styles.PhoneDetailsPage}>
        <div>Phone not found</div>
      </section>
    );
  }

  const setPhoneColor = (hexCode: string) => {
    setSelectedColor(hexCode);
  };

  const getCurrentImage = () => {
    if (!selectedColor) {
      return phone.colorOptions[0].imageUrl;
    }

    const selectedColorOption = phone.colorOptions.find(
      (option) => option.hexCode === selectedColor
    );

    return selectedColorOption?.imageUrl || phone.colorOptions[0].imageUrl;
  };

  const updatePriceAndStorage = (capacity: string) => {
    setSelectedStorage(capacity);

    const selectedOption = phone.storageOptions.find(
      (option) => option.capacity === capacity
    );
    setCurrentPrice(selectedOption?.price || 0);
  };

  const handleAddToCart = () => {
    if (phone && selectedColor && selectedStorage) {
      addToCart(phone, selectedColor, selectedStorage);
    }
  };

  console.log(phone);

  return (
    <section className={styles.PhoneDetailsPage}>
      <div className={styles.PhoneDetailsPage__details}>
        <Image
          src={getCurrentImage()}
          alt={phone.name}
          width={330}
          height={330}
          priority
        />
        <div>
          <div>
            <h2>{phone?.name}</h2>
            <p>
              From {currentPrice ? currentPrice : phone.storageOptions[0].price}{" "}
              EUR
            </p>
            <p>STORAGE. HOW MUCH SPACE DO YOU NEED?</p>
            <ul>
              {phone.storageOptions.map(({ capacity }) => (
                <li key={capacity}>
                  <button onClick={() => updatePriceAndStorage(capacity)}>
                    {capacity}
                  </button>
                </li>
              ))}
            </ul>
            <p>COLOR. PICK YOUR FAVORITE</p>
            <ul>
              {phone.colorOptions.map(({ hexCode, name }) => (
                <li key={hexCode}>
                  <button style={{}} onClick={() => setPhoneColor(hexCode)}>
                    {name}
                  </button>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhoneDetailsPage;
