import style from "../styles/Home.module.scss";

import Banner from "../components/Home/Banner/Banner";
import Header from "../components/Home/Header/Header";
import EventCatalogue from "../components/Home/EventCatalogue/EventCatalogue";

const StudentHome = () => {
  return (
    <div className={style.background}>
      <Header />
      <Banner />
      <EventCatalogue />
    </div>
  );
};

export default StudentHome;
