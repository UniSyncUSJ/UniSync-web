/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { type CSSProperties } from "react";
import { Box } from "@mui/material";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

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
const testEvents: Event[] = [
  {
    id: 1,
    title: "Sample Event",
    date: "2025-06-01",
    time: "08:30 am - 04:30 pm",
    venue: "Sumangala Hall, Faculty of Social Sciences",
    delegateCount: 10,
    imageUrl: "https://via.placeholder.com/150",
    start: "2025-06-01T08:30:00",
    end: "2025-06-01T16:30:00",
  },
  {
    id: 2,
    title: "Another Event",
    date: "2025-06-02",
    time: "09:00 am - 05:00 pm",
    venue: "Main Auditorium, Faculty of Arts",
    delegateCount: 5,
    imageUrl: "https://via.placeholder.com/150",
    start: "2025-06-02T09:00:00",
    end: "2025-06-02T17:00:00",
  },
  {
    id: 3,
    title: "Tech Conference",
    date: "2025-06-03",
    time: "10:00 am - 06:00 pm",
    venue: "Innovation Center, Faculty of Engineering",
    delegateCount: 20,
    imageUrl: "https://via.placeholder.com/150",
    start: "2025-06-03T10:00:00",
    end: "2025-06-03T18:00:00",
  },
];
interface Props {
  calendarRef?: React.Ref<FullCalendar> | undefined;
  events?: Event[]; // Use the Event type
  handleEventClick?: (clickInfo: any) => void;
}
const defaultProps: Partial<Props> = {
  events: [], // Default to an empty array
};

const Schedule: React.FC<Props> = ({
  calendarRef,
  events = defaultProps.events,
  handleEventClick,
}) => {
  console.log("Schedule component rendered with events:", events);
  return (
    <Box
      component="div"
      sx={{
        ...calendarContainer,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          borderRadius: "20px",
          pointerEvents: "none",
        },
      }}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          googleCalendarPlugin,
        ]}
        initialView="dayGridMonth"
        eventSources={[
          {
            googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
            googleCalendarId: "primary",
          },
          {
            events:
              events?.map((event) => ({
                id: event.id.toString(),
                title: event.title,
                start: event.start,
                end: event.end,
                extendedProps: {
                  date: event.date,
                  time: event.time,
                  venue: event.venue,
                  delegateCount: event.delegateCount,
                  imageUrl: event.imageUrl,
                },
              })) ?? [],
            color: "#1976d2",
            textColor: "white",
          },
        ]}
        height="auto"
        firstDay={1}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        eventDisplay="block"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dayMaxEvents={3}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        nowIndicator={true}
      />
    </Box>
  );
};

export default Schedule;

const calendarContainer: CSSProperties = {
  // background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(20px)",
  padding: "1.5rem 2rem",
  borderRadius: "20px",
  margin: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  position: "relative",
  overflow: "hidden",
  // Add a subtle inner glow (moved to sx prop in Box)
};
