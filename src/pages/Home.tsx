import style from '../styles/Home.module.scss'

import Banner from '../Components/Home/Banner/Banner';
import Header from '../Components/Home/Header/Header';
import EventCatalogue from '../Components/Home/EventCatalogue/EventCatalogue';

const Home = () => {
  return <div className={style.background}>
    <Header />
    <Banner />
    <EventCatalogue />

  </div>
};

export default Home;