import EventCard from '../../EventCard/EventCard';
import style from './EventCatalogue.module.scss'

const EventCatalogue = () => {
  return <div className={style.container}>
    <EventCard />
    <EventCard />
    <EventCard />
    <EventCard />
    <EventCard />
    <EventCard />



  </div>
}

export default EventCatalogue;