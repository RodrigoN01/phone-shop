import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  variant?: string;
  disabled?: boolean;
  children: string;
}

const Button = ({ onClick, variant, disabled, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.Button, {
        [`${styles.Button}--outline`]: variant === "outline",
        [`${styles.Button}--disabled`]: disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
