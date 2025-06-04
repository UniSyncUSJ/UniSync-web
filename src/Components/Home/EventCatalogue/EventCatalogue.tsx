import { Pagination, Stack, type CSSProperties } from "@mui/material";
import EventCard from "../../EventCard/EventCard";
import style from "./EventCatalogue.module.scss";
import { useEffect, useState, type ChangeEvent } from "react";

interface EventData {
  id: string | number;
  // Add other event properties as needed, for example:
  // title: string;
  // date: string;
  // description: string;
  // etc.
}

const EventCatalogue = () => {
  const [page, setPage] = useState<number>(1);
  const [eventData, setEventData] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/events");
      // You can handle the response here if needed
      if (!response.ok) {
        throw new Response(`Error: ${response.status} ${response.statusText}`, {
          status: response.status,
        });
      }
      const data = await response.json();
      setEventData(data);

      // Do something with the fetched data
    };
    fetchData();
  }, []);

  console.log(eventData);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Pagination logic
  const eventsPerPage = 6;
  const startIndex = (page - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = eventData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(eventData.length / eventsPerPage);

  return (
    <div className={style.container}>
      {paginatedEvents.map((event, idx) => (
        <EventCard key={event.id || idx} {...event} />
      ))}

      <Stack spacing={2} sx={paginationStyle}>
        <Pagination
          count={pageCount}
          variant="text"
          showFirstButton
          showLastButton
          page={page}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default EventCatalogue;

const paginationStyle: CSSProperties = {
  marginTop: "1rem",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  borderRadius: "1rem",
};
