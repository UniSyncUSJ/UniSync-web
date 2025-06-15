/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
//import { BACKGROUND_IMAGE } from "../Utils/constants";
// import { StringToDateObject } from "../Utils/helpers";
import FullCalendar from "@fullcalendar/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  type CSSProperties,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Schedule from "../../../pages/user/schedule/Schedule";
import type { EventClickArg } from "@fullcalendar/core";
import { useAxios } from "../../../hooks/useAxios";
import Styles from "./masterCalendar.module.scss"; // Updated import path

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

const Calendar = () => {
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
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event>>({
    id: 0,
    title: "",
    start: "",
    end: "",
  });
  const [currentView, setCurrentView] = useState<string>("dayGridMonth");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    data: localEvents,
    loading: loadingLocal,
    error: errorLocal,
    sendRequest: fetchLocalEvents,
  } = useAxios<Event[]>({
    url: "http://localhost:8080/api/events",
    method: "GET",
  });

  const {
    data: googleEvents,
    loading: loadingGoogle,
    error: errorGoogle,
    sendRequest: fetchGoogleEvents,
  } = useAxios<Event[]>({
    url: "http://localhost:8080/api/events/google",
    method: "GET",
  });

  useEffect(() => {
    fetchLocalEvents();
    fetchGoogleEvents();
  }, [fetchLocalEvents, fetchGoogleEvents]);
  const allEvents = [...(localEvents || []), ...(googleEvents || [])];

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
      ...clickInfo.event.extendedProps,
      id: Number(clickInfo.event.id),
      title: clickInfo.event.title,
      start: clickInfo.event.start ? clickInfo.event.start.toISOString() : "",
      end: clickInfo.event.end ? clickInfo.event.end.toISOString() : "",
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === selectedEvent.id
          ? {
              ...e,
              ...selectedEvent,
              id: e.id, // ensure id is string
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
    setModalOpen(false);
  };

  const handleDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== selectedEvent!.id));
    setModalOpen(false);
  };

  const EventModal = () => {
    return (
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(20, 20, 40, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            color: "rgba(255, 255, 255, 0.9)",
          },
        }}
      >
        <DialogTitle sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
          Edit Event
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={selectedEvent?.title || ""}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, title: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "rgba(255, 255, 255, 0.9)",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "rgba(255, 255, 255, 0.9)",
              },
            }}
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
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "rgba(255, 255, 255, 0.9)",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "rgba(255, 255, 255, 0.9)",
                  },
                },
              },
            }}
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
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "rgba(255, 255, 255, 0.9)",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "rgba(255, 255, 255, 0.9)",
                  },
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Discard</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
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
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.15)",
            },
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
        {EventModal()}
      </LocalizationProvider>
    </Box>
  );
};

export default Calendar;

const CalendarViewToggler: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  gap: "1rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "1rem",
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: "500",
};

const background: CSSProperties = {
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
