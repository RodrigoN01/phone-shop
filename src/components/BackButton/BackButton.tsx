import React from "react";
import styles from "./BackButton.module.scss";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  return (
    <div className={styles.BackButton}>
      <Link href='/' className={styles.BackButton__inner}>
        <ChevronLeft size={16} /> <span>Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
