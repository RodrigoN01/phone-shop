"use client";

import { useState, useTransition, useDeferredValue } from "react";
import styles from "./page.module.scss";
import PhonesList from "@/components/PhonesList/PhonesList";
import SearchBar from "@/components/SearchBar/SearchBar";
import { usePhones } from "@/hooks/usePhones";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [isPending, startTransition] = useTransition();
  const { phones, loading, error } = usePhones(deferredSearchQuery);

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={(e) =>
          startTransition(() => {
            setSearchQuery(e.target.value);
          })
        }
        resultsCount={phones.length}
      />
      <section className={styles.Home__content}>
        {isPending || loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.toString()}</p>
        ) : (
          <PhonesList phones={phones} />
        )}
      </section>
    </>
  );
}
