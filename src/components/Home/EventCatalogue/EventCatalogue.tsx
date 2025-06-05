import {
  Pagination,
  Stack,
  Typography,
  type CSSProperties,
} from "@mui/material";
import EventCard from "../../EventCard/EventCard";
import style from "./EventCatalogue.module.scss";
import { useEffect, useState, type ChangeEvent } from "react";

const EventCatalogue = () => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={style.container}>
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />

      <Stack spacing={2} sx={paginationStyle}>
        <Pagination
          count={5}
          variant="text"
          showFirstButton
          showLastButton
          defaultPage={1}
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
