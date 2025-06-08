/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// EventCatalogue.tsx - Updated based on wireframe
import { Pagination, Stack } from "@mui/material";
import EventCard from "../../EventCard/EventCard";
import style from "./EventCatalogue.module.scss";
import { useEffect, useState, type ChangeEvent } from "react";

const EventCatalogue = () => {
  const [page, setPage] = useState<number>(1);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Implement pagination logic here
  };

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading events
    setEvents([1, 2, 3, 4, 5, 6]); // Replace with actual event data
  }, [page]);

  return (
    <div className={style.container}>
      {events.length > 0 ? (
        <>
          {/* Event Cards Grid */}
          <div className={style.eventGrid}>
            {events.map((event, index) => (
              <div key={index} className={style.eventCard}>
                <EventCard />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className={style.paginationContainer}>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Pagination
                count={5}
                page={page}
                variant="text"
                showFirstButton
                showLastButton
                color="primary"
                onChange={handlePageChange}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "& .MuiPaginationItem-root": {
                    color: "white",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                      },
                    },
                  },
                }}
              />
            </Stack>
          </div>
        </>
      ) : (
        <div className={style.noEventsMessage}>
          <h3>No events found</h3>
          <p>
            Try adjusting your search criteria or check back later for new
            events.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCatalogue;
