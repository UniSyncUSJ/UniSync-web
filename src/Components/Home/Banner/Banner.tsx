import style from "./Banner.module.scss";
import SearchBar from "../SearchBar/SearchBar";

const Banner = () => {
  return <div className={style.container}>
    <div>
      <p className={style.text_1}>
        Discover, connect, and never <br/>
        miss a moment <br/>
      </p>
      <p className={style.text_2}>
        - explore all your university's events in one place.
      </p>
    </div>

    <SearchBar />
  </div>
}

export default Banner;