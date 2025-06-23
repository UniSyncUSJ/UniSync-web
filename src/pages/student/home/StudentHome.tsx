import style from "./StudentHome.module.scss";
import Banner from "../../../components/user/Home/Banner/Banner";
import Header from "../../../components/user/Home/Header/Header";
import EventCatalogue from "../../../components/user/Home/EventCatalogue/EventCatalogue";
import { Outlet, useLocation } from "react-router-dom";

const StudentHome = () => {
  const { pathname } = useLocation();
  const isEventsPage = pathname.includes("my-events");
  const isSchedulePage = pathname.includes("my-schedule");
  const isAcademicsPage = pathname.includes("academics");
  const isMarketplacePage = pathname.includes("marketplace");
  const isMyCartPage = pathname.includes("my-cart");
  return (
    <>
      <div className={style.container}>
        <div className={style.pageContainer}>
          <Header />
          <div className={style.contentArea}>
            {isEventsPage ? (
              <Outlet />
            ) : isSchedulePage ? (
              <Outlet />
            ) : isAcademicsPage ? (
              <Outlet />
            ) : isMarketplacePage ? (
              <Outlet />
            ) : isMyCartPage ? (
              <Outlet />
            ) : (
              <>
                <Banner />
                <EventCatalogue />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
