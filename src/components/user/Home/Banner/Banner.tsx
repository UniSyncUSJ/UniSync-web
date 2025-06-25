// Banner.tsx - Updated based on wireframe
import style from "./Banner.module.scss";
import SearchBar from "../SearchBar/SearchBar";

const Banner = () => {
  return (
    <div className={style.container}>
      <div className={style.heroText}>
        <h1 className={style.text_1}>
          Discover, connect, and never <br />
          miss a moment
        </h1>
        <p className={style.text_2}>
          - explore all your university's events in one place.
        </p>
      </div>

      <div className={style.searchContainer}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Banner;
