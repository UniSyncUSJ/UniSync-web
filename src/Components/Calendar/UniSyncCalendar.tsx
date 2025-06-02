import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react';
import { type CSSProperties } from 'react';
import { Box } from '@mui/material';
import { type event } from '../../Utils/types';

interface Props {
  calendarRef? : React.Ref<FullCalendar> | undefined
  events? : event[];
  handleEventClick? : (clickInfo:any) => void;
}


const UniSyncCalendar = (props : Props) => {
  return <Box component='div' sx={calendarContainer}>
    <FullCalendar
    ref={props.calendarRef}
    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
    initialView='dayGridMonth'
    events={props.events}
    height="auto"
    firstDay={1}
    editable={true}
    selectable={true}
    eventClick={props.handleEventClick}
    />
  </Box>
}

export default UniSyncCalendar;

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