/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
//import { BACKGROUND_IMAGE } from "../Utils/constants";
// import { StringToDateObject } from "../Utils/helpers";
import FullCalendar from "@fullcalendar/react";

import { Box, Button, TextField } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";

import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Schedule from "../../../components/user/schedule/Schedule";

import type { EventClickArg } from "@fullcalendar/core";

import Modal from "../../../components/common/modal/Modal";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  delegateCount: number;
  imageUrl: string;
  start: string;
  end: string;
};

export const StringToDateObject = (value: unknown): Date | null => {
  if (!value) return null;
  return value instanceof Date
    ? value
    : new Date(value as string | number | Date);
};

const MasterCalendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Meeting",
      date: "2025-06-10",
      time: "02:00:00",
      venue: "Conference Room A",
      delegateCount: 10,
      imageUrl: "",
      start: "2025-06-10T02:00:00",
      end: "2025-06-10T03:00:00",
    },
    {
      id: 2,
      title: "Birthday Party",
      date: "2025-06-10",
      time: "04:00:00",
      venue: "Banquet Hall",
      delegateCount: 20,
      imageUrl: "",
      start: "2025-06-10T04:00:00",
      end: "2025-06-10T05:00:00",
    },
    {
      id: 3,
      title: "Conference",
      date: "2025-06-30",
      time: "06:00:00",
      venue: "Auditorium",
      delegateCount: 100,
      imageUrl: "",
      start: "2025-06-30T06:00:00",
      end: "2025-06-30T07:00:00",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event>>({});
  const [currentView, setCurrentView] = useState<string>("dayGridMonth");

  // modal ref
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  //  const {
  //   data: localEvents,
  //   loading: loadingLocal,
  //   error: errorLocal,
  //   sendRequest: fetchLocalEvents,
  // } = useAxios<Event[]>({
  //   url: "http://localhost:8080/api/events",
  //   method: "GET",
  // });

  // const {
  //   data: googleEvents,
  //   loading: loadingGoogle,
  //   error: errorGoogle,
  //   sendRequest: fetchGoogleEvents,
  // } = useAxios<Event[]>({
  //   url: "http://localhost:8080/api/events/google",
  //   method: "GET",
  // });

  // useEffect(() => {
  //   fetchLocalEvents();
  //   fetchGoogleEvents();
  // }, [fetchLocalEvents, fetchGoogleEvents]);
  // const allEvents = [...(localEvents || []), ...(googleEvents || [])];
  console.log("Events loaded in MasterCalendar component.", events);

  const toggleClendarView = () => {
    const api = calendarRef.current?.getApi();
    const nextView =
      currentView === "timeGridWeek" ? "dayGridMonth" : "timeGridWeek";

    if (api) {
      api.changeView(nextView);
      setCurrentView(nextView);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: Number(clickInfo.event.id),
      title: clickInfo.event.title,
      start: clickInfo.event.start ? clickInfo.event.start.toISOString() : "",
      end: clickInfo.event.end ? clickInfo.event.end.toISOString() : "",
      date: clickInfo.event.start
        ? clickInfo.event.start.toISOString().split("T")[0]
        : "",
      time: clickInfo.event.start
        ? clickInfo.event.start.toISOString().split("T")[1].substring(0, 5)
        : "",
      venue: clickInfo.event.extendedProps.venue || "",
      delegateCount: clickInfo.event.extendedProps.delegateCount || 0,
      imageUrl: clickInfo.event.extendedProps.imageUrl || "",
    });
    modalRef.current?.open();
  };

  const handleSave = () => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === selectedEvent!.id
          ? {
              ...e,
              ...selectedEvent,
              id: e.id, // retain id
              title: selectedEvent.title ?? e.title,
              date: selectedEvent.date ?? e.date,
              time: selectedEvent.time ?? e.time,
              venue: selectedEvent.venue ?? e.venue,
              delegateCount: selectedEvent.delegateCount ?? e.delegateCount,
              imageUrl: selectedEvent.imageUrl ?? e.imageUrl,
              start: selectedEvent.start ?? e.start,
              end: selectedEvent.end ?? e.end,
            }
          : e
      )
    );
    modalRef.current?.close();
  };

  const handleDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== selectedEvent!.id));
    modalRef.current?.close();
  };

  return (
    <Box component="div" sx={background}>
      <Box sx={CalendarViewToggler}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <SettingsIcon /> Change View :
        </Box>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={toggleClendarView}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid #fff3",
            borderRadius: "8px",
          }}
        >
          {" "}
          Switch to {currentView === "timeGridWeek"
            ? "Month"
            : "Week"} View{" "}
        </Button>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Schedule
          calendarRef={calendarRef}
          events={events}
          handleEventClick={handleEventClick}
        ></Schedule>

        {/* Reusable Modal for event details */}
        <Modal ref={modalRef}>
          <h2>Edit Event</h2>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={selectedEvent?.title || ""}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, title: e.target.value })
            }
          />

          <DateTimePicker
            label="Start"
            value={StringToDateObject(selectedEvent?.start)}
            onChange={(newValue) =>
              setSelectedEvent({
                ...selectedEvent,
                start: newValue ? newValue.toString() : "",
              })
            }
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />

          <DateTimePicker
            label="End"
            value={StringToDateObject(selectedEvent?.end)}
            onChange={(newValue) =>
              setSelectedEvent({
                ...selectedEvent,
                end: newValue ? newValue.toString() : "",
              })
            }
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </LocalizationProvider>
    </Box>
  );
};

export default MasterCalendar;

// Styles
const CalendarViewToggler = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  // background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  gap: "1rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgb(0 0 0 / 0.3)",
  border: "1px solid rgb(255 255 255 / 0.1)",
  marginBottom: "1rem",
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: "500",
};

const background = {
  //   backgroundImage: `url(${BACKGROUND_IMAGE})`,
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "2rem",
};
