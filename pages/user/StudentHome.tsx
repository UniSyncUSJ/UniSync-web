// StudentHome.tsx - Updated based on wireframe
import style from "../../styles/Home.module.scss";

import Banner from "../../src/components/user/Home/Banner/Banner";
import Header from "../../src/components/user/Home/Header/Header";
import EventCatalogue from "../../src/components/user/Home/EventCatalogue/EventCatalogue";

const StudentHome = () => {
  return (
    <div className={style.background}>
      <div className={style.pageContainer}>
        <Header />
        <div className={style.contentArea}>
          <Banner />
          <EventCatalogue />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
