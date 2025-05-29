import '../styles/EventCard.module.scss';

type EventCardProps = {
  title: string;
  category: string;
  duration: string;
  attendees: string[];
};

const EventCard = ({ title, category, duration, attendees }: EventCardProps) => (
  <div className="event-card">
    <img src="https://via.placeholder.com/300x150" alt="Event preview" />

    <h3>{title}</h3>
    <p>{category}</p>

    <div className="event-meta">
      <span>⏱ {duration}</span>
      <div className="attendees">
        {attendees.slice(0, 5).map((att, i) => (
          <div key={i} className="attendee-avatar" title={att}></div>
        ))}
      </div>
    </div>

    <div className="event-actions">
      <button className="remind">Remind me</button>
      <button className="join">Join ⬇</button>
    </div>
  </div>
);

export default EventCard;
