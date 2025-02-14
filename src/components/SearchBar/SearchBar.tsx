"use client";

import React from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resultsCount: number;
}

export default function SearchBar({
  value,
  onChange,
  resultsCount,
}: SearchBarProps) {
  return (
    <div className={styles.SearchBar}>
      <input
        type='text'
        placeholder='Search for smartphones...'
        value={value}
        onChange={onChange}
        className={styles.SearchBar__input}
      />
      <span className={styles.SearchBar__resultsCount}>
        {resultsCount} RESULTS
      </span>
    </div>
  );
}
