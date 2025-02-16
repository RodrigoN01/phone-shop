"use client";

import { use, useState } from "react";
import { usePhone } from "@/hooks/usePhone";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import clsx from "clsx";
import styles from "./page.module.scss";
import Button from "@/components/Button/Button";
import BackButton from "@/components/BackButton/BackButton";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import Link from "next/link";

const PhoneDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = use(params);
  const { phone, loading } = usePhone(unwrappedParams.id);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const { addToCart } = useCart();

  const {
    battery,
    mainCamera,
    os,
    processor,
    resolution,
    screen,
    screenRefreshRate,
    selfieCamera,
  } = phone?.specs || {};

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

  const setPhoneColor = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const getCurrentImage = () => {
    if (!selectedColor) {
      return phone.colorOptions[0].imageUrl;
    }

    const selectedColorOption = phone.colorOptions.find(
      (option) => option.name === selectedColor
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
    if (phone && selectedColor && selectedStorage && currentPrice) {
      addToCart(phone, selectedColor, selectedStorage, currentPrice);
    }
  };

  return (
    <>
      <BackButton />
      <div className={styles.PhoneDetailsPage}>
        <section>
          <div className={styles.PhoneDetailsPage__details}>
            <Image
              className={styles.PhoneDetailsPage__details__image}
              src={getCurrentImage()}
              alt={phone.name}
              width={330}
              height={330}
              priority
            />
            <div className={styles.PhoneDetailsPage__details__options}>
              <h2>{phone?.name}</h2>
              <p>
                From{" "}
                {currentPrice ? currentPrice : phone.storageOptions[0].price}{" "}
                EUR
              </p>
              <p>STORAGE. HOW MUCH SPACE DO YOU NEED?</p>
              <ul
                className={styles.PhoneDetailsPage__details__options__storage}
              >
                {phone.storageOptions.map(({ capacity }) => (
                  <li key={capacity}>
                    <button
                      className={clsx(
                        styles.PhoneDetailsPage__details__options__storage__btn,
                        {
                          [`${styles.PhoneDetailsPage__details__options__storage__btn}--active`]:
                            selectedStorage === capacity,
                        }
                      )}
                      onClick={() => updatePriceAndStorage(capacity)}
                    >
                      {capacity}
                    </button>
                  </li>
                ))}
              </ul>
              <p>COLOR. PICK YOUR FAVORITE</p>
              <ul
                className={
                  styles.PhoneDetailsPage__details__options__colorPicker
                }
              >
                {phone.colorOptions.map(({ hexCode, name: colorName }) => (
                  <li key={hexCode}>
                    <button
                      className={clsx(
                        styles.PhoneDetailsPage__details__options__colorPicker__btn,
                        {
                          [`${styles.PhoneDetailsPage__details__options__colorPicker__btn}--active`]:
                            selectedColor === colorName,
                        }
                      )}
                      style={{ backgroundColor: hexCode }}
                      onClick={() => setPhoneColor(colorName)}
                    />
                    <span
                      className={
                        styles.PhoneDetailsPage__details__options__colorPicker__colorName
                      }
                    >
                      {colorName}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href='/cart'>
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedColor || !selectedStorage}
                >
                  Add
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.PhoneDetailsPage__specs}>
          <table className={styles.PhoneDetailsPage__specs__table}>
            <thead>
              <tr>
                <th>Specifications</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Brand</th>
                <td>{phone.brand}</td>
              </tr>
              <tr>
                <th scope='row'>NAME</th>
                <td>{phone.name}</td>
              </tr>
              <tr>
                <th scope='row'>Description</th>
                <td>{phone.description}</td>
              </tr>
              <tr>
                <th scope='row'>Screen</th>
                <td>{screen}</td>
              </tr>
              <tr>
                <th scope='row'>Resolution</th>
                <td>{resolution}</td>
              </tr>
              <tr>
                <th scope='row'>Processor</th>
                <td>{processor}</td>
              </tr>
              <tr>
                <th scope='row'>Main Camera</th>
                <td>{mainCamera}</td>
              </tr>
              <tr>
                <th scope='row'>Selfie Camera</th>
                <td>{selfieCamera}</td>
              </tr>
              <tr>
                <th scope='row'>Battery</th>
                <td>{battery}</td>
              </tr>
              <tr>
                <th scope='row'>OS</th>
                <td>{os}</td>
              </tr>
              <tr>
                <th scope='row'>Screen Refresh Rate</th>
                <td>{screenRefreshRate}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.PhoneDetailsPage__similarItems}>
          <h2>Similar Items</h2>
          <ul className={styles.PhoneDetailsPage__similarItems__list}>
            {phone.similarProducts.map((item, index) => (
              <Link href={`/phones/${phone.id}`} key={`${item.id}-${index}`}>
                <PhoneCard
                  name={item.name}
                  price={item.basePrice}
                  image={item.imageUrl}
                  brand={item.brand}
                />
              </Link>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default PhoneDetailsPage;
