import { ColorRing } from "react-loader-spinner";
import css from "./Loader.module.css";
import icon from "../../assets/icons/sprite.svg";
import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className={css["loader"]}>
      <svg className={css["loader-icon"]} width="18" height="18">
        <use href={icon + `#icon-logoTablet`} />
      </svg>
      <ColorRing
        visible={true}
        height="160"
        width="160"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#24CCA7", "#4a56e2", "#24CCA7", "#4a56e2", "#24CCA7"]}
      />
    </div>
  );
};
