import { useEffect, useState } from "react";
import EventCard from "../../EventCard/EventCard";
import style from "./EventCatalogue.module.scss";
import eventImage from "../../../../assets/images/eventImage.jpg";
import { useSelector } from "react-redux";
import Pagination from "../../../common/pagination/Pagination";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  delegateCount: number;
  imageUrl: string;
  description: string;
};

const ALL_EVENTS: Event[] = [
  {
    id: 1,
    title: "Sample Event",
    date: "2025-10-01",
    time: "08:30 am - 04:30 pm",
    venue: "Sumangala Hall, Faculty of Social Sciences",
    delegateCount: 10,
    imageUrl: eventImage,
    description:
      "This is a sample event description. It provides an overview of the event, including its purpose, activities, and any notable speakers or guests.",
  },
  {
    id: 2,
    title: "Another Event",
    date: "2025-10-02",
    time: "09:00 am - 05:00 pm",
    venue: "Main Auditorium, Faculty of Arts",
    delegateCount: 5,
    imageUrl: eventImage,
    description:
      "This is another event description. It highlights the key aspects of the event and what attendees can expect.",
  },
  {
    id: 3,
    title: "Tech Conference",
    date: "2025-10-03",
    time: "10:00 am - 06:00 pm",
    venue: "Innovation Center, Faculty of Engineering",
    delegateCount: 20,
    imageUrl: eventImage,
    description: "This is a sample event description for the Tech Conference.",
  },
  {
    id: 4,
    title: "Cultural Fest",
    date: "2025-10-04",
    time: "11:00 am - 07:00 pm",
    venue: "Cultural Grounds, Faculty of Humanities",
    delegateCount: 15,
    imageUrl: eventImage,
    description: "This is a sample event description for the Cultural Fest.",
  },
  {
    id: 5,
    title: "Sports Meet",
    date: "2025-10-05",
    time: "09:30 am - 05:30 pm",
    venue: "Sports Complex, Faculty of Physical Education",
    delegateCount: 8,
    imageUrl: eventImage,
    description:
      "This is a sample event description for the Sports Meet. It includes details about the sports activities and competitions.",
  },
  {
    id: 6,
    title: "Green Summit",
    date: "2025-10-06",
    time: "08:00 am - 03:00 pm",
    venue: "Eco Hall, Faculty of Environmental Studies",
    delegateCount: 12,
    imageUrl: eventImage,
    description: "This is a sample event description for the Green Summit.",
  },
  {
    id: 7,
    title: "Business Workshop",
    date: "2025-10-07",
    time: "02:00 pm - 08:00 pm",
    venue: "Business Center, Faculty of Commerce",
    delegateCount: 25,
    imageUrl: eventImage,
    description:
      "This is a sample event description for the Business Workshop.",
  },
  {
    id: 8,
    title: "Art Exhibition",
    date: "2025-10-08",
    time: "10:00 am - 06:00 pm",
    venue: "Art Gallery, Faculty of Fine Arts",
    delegateCount: 18,
    imageUrl: eventImage,
    description: "This is a sample event description for the Art Exhibition.",
  },
  {
    id: 9,
    title: "Music Festival",
    date: "2025-06-15",
    time: "01:00 pm - 11:00 pm",
    venue: "Open Air Stage, Faculty of Performing Arts",
    delegateCount: 30,
    imageUrl: eventImage,
    description: "This is a sample event description for the Music Festival.",
  },
  {
    id: 10,
    title: "Science Fair",
    date: "2025-06-18",
    time: "09:00 am - 05:00 pm",
    venue: "Science Building, Faculty of Science",
    delegateCount: 22,
    imageUrl: eventImage,
    description: "This is a sample event description for the Science Fair.",
  },
  {
    id: 11,
    title: "Literature Symposium",
    date: "2025-06-15",
    time: "10:00 am - 04:00 pm",
    venue: "Literature Hall, Faculty of Literature",
    delegateCount: 16,
    imageUrl: eventImage,
    description:
      "This is a sample event description for the Literature Symposium.",
  },
  {
    id: 13,
    title: "Literature Symposium",
    date: "2025-06-15",
    time: "10:00 am - 04:00 pm",
    venue: "Literature Hall, Faculty of Literature",
    delegateCount: 16,
    imageUrl: eventImage,
    description:
      "This is a sample event description for the Literature Symposium.",
  },
];

const EVENTS_PER_PAGE = 4;

const EventCatalogue = () => {
  const [paginatedEvents, setPaginatedEvents] = useState<Event[]>(ALL_EVENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("This week");

  const selectedDate = useSelector(
    (state: { user: { selectedDate: Date | null } }) => state.user.selectedDate
  );

  useEffect(() => {
    if (selectedDate) {
      // Filter events based on selected date. show all the events that match the selected date and events that are in the same week or month
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Set to the start of the week (Sunday)
      const endOfWeek = new Date(selectedDate);
      endOfWeek.setDate(selectedDate.getDate() + (6 - selectedDate.getDay())); // Set to the end of the week (Saturday)
      const startOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ); // Last day of the month
      const filteredEvents = ALL_EVENTS.filter((event) => {
        const eventDate = new Date(event.date);
        if (selectedFilter === "This week") {
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        } else if (selectedFilter === "This month") {
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        }
        return false; // Default case, no filter applied
      });

      setPaginatedEvents(filteredEvents);
    }
  }, [selectedDate, selectedFilter]);

  // const handleFilterChange = (filter: string) => {
  //   setSelectedFilter(filter);
  //   setCurrentPage(1); // Reset to first page when filter changes
  //   //show events based on the selected filter
  //   if (filter === "All Events") {
  //     setPaginatedEvents(ALL_EVENTS.slice(0, EVENTS_PER_PAGE));
  //     return;
  //   }
  //   // If the filter is "This week" or "This month", we can filter the events accordingly
  //   const filteredEvents = ALL_EVENTS.filter((event) => {
  //     const eventDate = new Date(event.date);
  //     if (filter === "This week") {
  //       const startOfWeek = new Date();
  //       startOfWeek.setDate(new Date().getDate() - new Date().getDay());
  //       const endOfWeek = new Date();
  //       endOfWeek.setDate(new Date().getDate() + (6 - new Date().getDay()));
  //       return eventDate >= startOfWeek && eventDate <= endOfWeek;
  //     } else if (filter === "This month") {
  //       const startOfMonth = new Date(
  //         new Date().getFullYear(),
  //         new Date().getMonth(),
  //         1
  //       );
  //       const endOfMonth = new Date(
  //         new Date().getFullYear(),
  //         new Date().getMonth() + 1,
  //         0
  //       );
  //       return eventDate >= startOfMonth && eventDate <= endOfMonth;
  //     } else if (filter === "Next Week") {
  //       const startOfNextWeek = new Date();
  //       startOfNextWeek.setDate(new Date().getDate() + 7 - new Date().getDay());
  //       const endOfNextWeek = new Date();
  //       endOfNextWeek.setDate(new Date().getDate() + 13 - new Date().getDay());
  //       return eventDate >= startOfNextWeek && eventDate <= endOfNextWeek;
  //     }
  //     return false; // Default case, no filter applied
  //   });
  //   setPaginatedEvents(filteredEvents.slice(0, EVENTS_PER_PAGE));
  // };

  const totalPages = Math.ceil(ALL_EVENTS.length / EVENTS_PER_PAGE);

  return (
    <div className={style.pageContainer}>
      {/* Left Sidebar - Calendar */}
      <div className={style.leftSidebar}>
        {/* <div className={style.calendarContainer}>
          <Calendar />
        </div> */}

        {/* Filter Buttons */}
        {/* <div className={style.filterButtons}>
          <ButtonGroup
            orientation="vertical"
            variant="outlined"
            fullWidth
            className={style.buttonGroup}
          >
            <Button
              variant={
                selectedFilter === "This week" ? "contained" : "outlined"
              }
              onClick={() => handleFilterChange("This week")}
              className={style.filterButton}
            >
              This week
            </Button>
            <Button
              variant={
                selectedFilter === "This month" ? "contained" : "outlined"
              }
              onClick={() => handleFilterChange("Next Week")}
              className={style.filterButton}
            >
              Next Week
            </Button>
            <Button
              variant={
                selectedFilter === "This month" ? "contained" : "outlined"
              }
              onClick={() => handleFilterChange("This month")}
              className={style.filterButton}
            >
              This month
            </Button>

            <Button
              variant={
                selectedFilter === "This month" ? "contained" : "outlined"
              }
              onClick={() => handleFilterChange("All Events")}
              className={style.filterButton}
            >
              All Events
            </Button>
          </ButtonGroup>
        </div> */}
      </div>

      {/* Main Content Area */}
      <div className={style.mainContent}>
        {/* Events Section */}
        <div className={style.eventsSection}>
          {paginatedEvents.length > 0 ? (
            <div className={style.eventsGrid}>
              {paginatedEvents
                .slice(
                  (currentPage - 1) * EVENTS_PER_PAGE,
                  currentPage * EVENTS_PER_PAGE
                )
                .map((event) => (
                  <div key={event.id} className={style.eventCardWrapper}>
                    <EventCard event={event} />
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.noEventsMessage}>
              <h3>No events found</h3>
              <p>Please check back later for new events.</p>
            </div>
          )}

          {paginatedEvents.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventCatalogue;
