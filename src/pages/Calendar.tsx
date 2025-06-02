import Header from "../Components/Home/Header/Header";
import style from '../styles/Calendar.module.scss'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Button, type CSSProperties } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface event {
  title : string,
  start : string,
  end : string
}

const Calendar = () => {
  const [events, setEvents] = useState<event[]>([
    { title: 'Meeting', start: '2025-06-10T02:00:00', end: '2025-06-10T03:00:00' },
    { title: 'Birthday Party', start: '2025-06-10T04:00:00', end: '2025-06-10T05:00:00' },
    { title: 'Conference', start: '2025-06-11T06:00:00', end: '2025-06-11T07:00:00' }
  ]);
  const [selectedEvent, setSelectedEvent] = useState<event>();
  const [openModal, setOpenModal] = useState<boolean>(false);


  return <div className={style.background}>
    <Header />
    <Box sx={options}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:'0.5rem'}}>
        <SettingsIcon /> Manage Events :
      </Box>
      <Button variant="contained" size="small" color="success"> Add Event</Button>

    </Box>
    <Box component='div' sx={calendarContainer}>
      <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      height="auto"
      firstDay={1}
      events={events}
      />
    </Box>
    
  </div>
}

export default Calendar;

const options:CSSProperties ={
  display: 'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'rgba(255, 255, 255, 0.6)',
  gap: '1rem',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
}

const calendarContainer:CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  padding: '1rem 2rem 1rem 2rem',
  borderRadius: '0.5rem',
  margin:'0.5rem',
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'

}