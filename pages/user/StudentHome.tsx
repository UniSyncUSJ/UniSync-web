// StudentHome.tsx - Updated based on wireframe
import style from "../../styles/Home.module.scss";

import Banner from "../../src/components/user/Home/Banner/Banner";
import Header from "../../src/components/user/Home/Header/Header";
import EventCatalogue from "../../src/components/user/Home/EventCatalogue/EventCatalogue";
import { Outlet, useLocation } from "react-router-dom";

const StudentHome = () => {
  const { pathname } = useLocation();
  const isEventsPage = pathname.includes("my-events");
  return (
    <>
      <div className={style.container}>
        <div className={style.pageContainer}>
          <Header />
          <div className={style.contentArea}>
            {
              isEventsPage ? (
                <Outlet />
              ) : (
                <>
                  <Banner />
                  <EventCatalogue />
                </>
              ) // Render Outlet only if on the calendar page
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
