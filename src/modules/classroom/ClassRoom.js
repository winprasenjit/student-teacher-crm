import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from "@fullcalendar/timeline"
import BootstrapModal from "../_shared/components/BootstrapModal";
import AddStudent from "../student/AddStudent";

export default function ClassRoom({view}) {
  const events = [
    {
      title: "Example Event",
      start: "2024-11-17T11:15:30.762Z",
      end: "2024-11-17T11:50:15.762Z",
    },
  ];
  const [config, setConfig] = useState();
  const calendarRef = useRef(null);

  useEffect(() => {
    console.log(view);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (["timeGridDay", "dayGridWeek", "dayGridMonth"].includes(view)) {
        calendarApi.changeView(view);
      }
    }
  }, [view]);

  const handleDateClick = (arg) => {
    console.log(arg.dateStr)
  }

  const handleEventClick = ({event}) => {
    // openAppointment is a function I wrote to open a form to edit that appointment
    console.log(event)
    setConfig({open: true});
  }

  return (
    <div id={view === "dayGridMonth" ? "month" : view === 'dayGridWeek' ? 'week' : "day"}>
      <BootstrapModal config={config} type="add">
        <AddStudent/>
      </BootstrapModal>
      <FullCalendar
        ref={calendarRef}
        firstDay={1}
        slotLabelFormat={{
          hour: "numeric",
          hour12: true,
        }}
        slotMinTime={"10:00AM"}
        slotMaxTime={"19:00PM"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialEvents={events}
        initialView={view}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
    </div>
  )
}
