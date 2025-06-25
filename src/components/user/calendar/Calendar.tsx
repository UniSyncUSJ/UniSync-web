/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Styles from "./calendar.module.scss"; // Assuming you have a CSS/SCSS file for styles
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../redux/userStore/user-slice";
import eventImage from "../../../assets/images/eventImage.jpg";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  delegateCount: number;
  imageUrl: string;
};

const ALL_EVENTS: Event[] = [
  {
    id: 1,
    title: "Sample Event",
    date: "2025-10-01",
    time: "08:30 am - 04:30 pm",
    venue: "Sumangala Hall, Faculty of Social Sciences",
    delegateCount: 10,
    imageUrl: eventImage,
  },
  {
    id: 2,
    title: "Another Event",
    date: "2025-10-02",
    time: "09:00 am - 05:00 pm",
    venue: "Main Auditorium, Faculty of Arts",
    delegateCount: 5,
    imageUrl: eventImage,
  },
  {
    id: 3,
    title: "Tech Conference",
    date: "2025-10-03",
    time: "10:00 am - 06:00 pm",
    venue: "Innovation Center, Faculty of Engineering",
    delegateCount: 20,
    imageUrl: eventImage,
  },
  {
    id: 4,
    title: "Cultural Fest",
    date: "2025-10-04",
    time: "11:00 am - 07:00 pm",
    venue: "Cultural Grounds, Faculty of Humanities",
    delegateCount: 15,
    imageUrl: eventImage,
  },
  {
    id: 5,
    title: "Sports Meet",
    date: "2025-10-05",
    time: "09:30 am - 05:30 pm",
    venue: "Sports Complex, Faculty of Physical Education",
    delegateCount: 8,
    imageUrl: eventImage,
  },
  {
    id: 6,
    title: "Green Summit",
    date: "2025-10-06",
    time: "08:00 am - 03:00 pm",
    venue: "Eco Hall, Faculty of Environmental Studies",
    delegateCount: 12,
    imageUrl: eventImage,
  },
  {
    id: 7,
    title: "Business Workshop",
    date: "2025-10-07",
    time: "02:00 pm - 08:00 pm",
    venue: "Business Center, Faculty of Commerce",
    delegateCount: 25,
    imageUrl: eventImage,
  },
  {
    id: 8,
    title: "Art Exhibition",
    date: "2025-10-08",
    time: "10:00 am - 06:00 pm",
    venue: "Art Gallery, Faculty of Fine Arts",
    delegateCount: 18,
    imageUrl: eventImage,
  },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  // Define RootState according to your Redux store structure
  interface RootState {
    user: {
      selectedDate: Date | null;
      // add other user state fields if needed
    };
    // add other slices if needed
  }

  const userSelectedDate = useSelector(
    (state: RootState) => state.user.selectedDate
  );
  // const {
  //   data: events,
  //   error,
  //   loading,
  //   sendRequest,
  // } = useAxios<Event[]>({
  //   method: "GET",
  //   url: "http://localhost:8080/api/events",
  // });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of current month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();

    // Last day of current month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Last day of previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }

    // Add next month's leading days
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return (
      userSelectedDate &&
      date.toDateString() === userSelectedDate.toDateString()
    );
  };

  const handleDateClick = (dayObj: {
    day: number;
    isCurrentMonth: boolean;
    date: Date;
  }) => {
    // setSelectedDate(dayObj.date);
    // if (!dayObj.isCurrentMonth) {
    //   setCurrentDate(new Date(dayObj.date));
    // }
    dispatch(userActions.setSelectedDate(dayObj.date));
    console.log("Selected date:", dayObj.date);
  };

  const days = getDaysInMonth(currentDate);

  useEffect(() => {
    if (userSelectedDate) {
      // sendRequest({
      //   params: {
      //     date: userSelectedDate.toISOString(), // assuming backend expects ISO string
      //   },
      // });
    }
  }, [userSelectedDate]);

  return (
    <>
      <div className={Styles.calendar}>
        <div className={Styles.header}>
          <button
            className={Styles.navButton}
            onClick={() => navigateMonth(-1)}
            type="button"
          >
            <ChevronLeft />
          </button>

          <div className={Styles.monthYear}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>

          <button
            className={Styles.navButton}
            onClick={() => navigateMonth(1)}
            type="button"
          >
            <ChevronRight />
          </button>
        </div>

        <div className={Styles.weekDays}>
          {weekDays.map((day) => (
            <div key={day} className={Styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={Styles.daysGrid}>
          {days.map((dayObj, index) => (
            <div
              key={index}
              className={`${Styles.day} ${
                dayObj.isCurrentMonth ? Styles.currentMonth : Styles.otherMonth
              } ${isToday(dayObj.date) ? Styles.today : ""} ${
                isSelected(dayObj.date) ? Styles.selected : ""
              }`}
              onClick={() => handleDateClick(dayObj)}
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
