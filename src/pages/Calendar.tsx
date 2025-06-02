import { useRef, useState } from 'react';
import Header from "../Components/Home/Header/Header";
import { BACKGROUND_IMAGE } from "../Utils/constants";
import  { type event } from '../Utils/types';
import { StringToDateObject } from "../Utils/helpers";
import FullCalendar from '@fullcalendar/react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, type CSSProperties } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import UniSyncCalendar from "../Components/Calendar/UniSyncCalendar";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState([
    { id: '1', title: 'Meeting', start: '2025-06-10T02:00:00', end: '2025-06-10T03:00:00' },
    { id: '2', title: 'Birthday Party', start: '2025-06-10T04:00:00', end: '2025-06-10T05:00:00' },
    { id: '3', title: 'Conference', start: '2025-06-11T06:00:00', end: '2025-06-11T07:00:00' }
  ]);
  const [selectedEvent, setSelectedEvent] = useState<event>({
    id : '', title :'', start : '', end : ''
  });
  const [currentView, setCurrentView] = useState<string>('dayGridMonth');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleClendarView = () => {
    const api = calendarRef.current?.getApi();
    const nextView = currentView === 'timeGridWeek' ? 'dayGridMonth' : 'timeGridWeek';
    if (api) {
      api.changeView(nextView);
      setCurrentView(nextView);
    }
  };

  const handleEventClick = (clickInfo:any) => {
    setSelectedEvent({ ...clickInfo.event.extendedProps, id: clickInfo.event.id, title: clickInfo.event.title, start: clickInfo.event.start, end: clickInfo.event.end });
    setModalOpen(true);
  };

  const handleSave = () => {
    setEvents((prev) =>
      prev.map((e) => (e.id === selectedEvent.id ? selectedEvent : e))
    );
    setModalOpen(false);
  };

  const handleDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== selectedEvent!.id));
    setModalOpen(false);
  };

  const EventModal = () => {
    return <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={selectedEvent?.title || ''}
          onChange={(e) =>
            setSelectedEvent({ ...selectedEvent, title: e.target.value })
          }
        />
        <DateTimePicker
          label="Start"
          value={StringToDateObject(selectedEvent?.start)}
          onChange={(newValue) =>
            setSelectedEvent({ ...selectedEvent, start: newValue?newValue.toString() : '' })
          }
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
            },
          }}
        />
        <DateTimePicker
          label="End"
          value={StringToDateObject(selectedEvent?.end)}
          onChange={(newValue) =>
            setSelectedEvent({ ...selectedEvent, end: newValue ? newValue.toString() : '' })
          }
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)}>Discard</Button>
        <Button onClick={handleDelete} color="error">Delete</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  }


  return <Box component='div' sx={background}>
    <Header />
    <Box sx={CalendarViewToggler}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:'0.5rem'}}>
        <SettingsIcon /> Change View :
      </Box>
      <Button variant="contained" size="small" color="success" onClick={toggleClendarView}> Switch to {currentView === 'timeGridWeek' ? 'Month' : 'Week'} View </Button>
    </Box>
    
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UniSyncCalendar calendarRef={calendarRef} events={events} handleEventClick={handleEventClick} ></UniSyncCalendar>
      {EventModal()}
    </LocalizationProvider> 
  </Box>
}

export default Calendar;

const CalendarViewToggler:CSSProperties = {
  display: 'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'rgba(255, 255, 255, 0.6)',
  gap: '1rem',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
};

const background : CSSProperties = {
  backgroundImage: `url(${BACKGROUND_IMAGE})`,
  minHeight: '100vh',
  width: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display:'flex',
  flexDirection:'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
}