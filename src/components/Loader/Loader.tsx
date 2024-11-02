import React, { FC } from "react";
import { ColorRing } from "react-loader-spinner";
import styles from "./Loader.module.css";
import sprite from "../../assets/icons/sprite.svg";

interface LoaderProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const LOADER_SIZES = {
  small: 80,
  medium: 120,
  large: 160,
};

const LOADER_COLORS: [string, string, string, string, string] = [
  "#24CCA7",
  "#4a56e2",
  "#24CCA7",
  "#4a56e2",
  "#24CCA7",
];

export const Loader: FC<LoaderProps> = ({
  className = "",
  size = "large",
}) => {
  const loaderSize = LOADER_SIZES[size];

  return (
    <div className={`${styles.loader} ${className}`}>
      <svg
        className={styles.loader__icon}
        width="18"
        height="18"
        aria-hidden="true"
      >
        <use href={`${sprite}#icon-logoTablet`} />
      </svg>

      <ColorRing
        visible={true}
        height={loaderSize}
        width={loaderSize}
        ariaLabel="Loading content"
        wrapperStyle={{}}
        wrapperClass={styles.loader__wrapper}
        colors={LOADER_COLORS}
      />
    </div>
  );
};
