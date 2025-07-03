/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  People,
  MoreHoriz,
  FavoriteBorder,
} from "@mui/icons-material";

import Modal from "../../../components/common/modal/Modal"; // adjust path if needed
import style from "./EventCard.module.scss";
import modalStyles from "./eventCardModel.module.scss";
import { useDispatch } from "react-redux";
import { userEventActions } from "../../../redux/userStore/user-event-slice"; // adjust path if needed

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  delegateCount: number;
  imageUrl: string;
  description: string;
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const dispatch = useDispatch();
  // const userEvents = useSelector((state: { userEvent: { events: Event[] } }) => state.userEvent.events);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const handleJoinClick = () => {
    modalRef.current?.open();
  };

  const handleConfirmJoin = () => {
    console.log(`User joined: ${event.title}`);
    dispatch(
      userEventActions.addUserEvent({
        id: event.id,
        title: event.title,
        date: event.date,
        status: "joined", // or another appropriate status value
        time: event.time,
        venue: event.venue,
        delegateCount: event.delegateCount,
        imageUrl: event.imageUrl,
        description: event.description,
      })
    );
    modalRef.current?.close();
  };

  const handleCancel = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <Card
        className={style.eventCard}
        elevation={2}
        sx={{ borderRadius: "20px", width:'350px'}}
      >
        <Box className={style.imageContainer}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className={style.eventImage}
          />
        </Box>

        <CardContent className={style.cardContent}>
          <Box className={style.contentHeader}>
            <Typography variant="h6" className={style.eventTitle}>
              {event.title}
            </Typography>

            <Box className={style.headerActions}>
              <IconButton size="small" className={style.actionButton}>
                <FavoriteBorder fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box className={style.eventDetails}>
            <Box className={style.detailRow}>
              <CalendarToday className={style.icon} />
              <Typography variant="body2" className={style.detailText}>
                {formatDate(event.date)}
              </Typography>
            </Box>

            <Box className={style.detailRow}>
              <AccessTime className={style.icon} />
              <Typography variant="body2" className={style.detailText}>
                {event.time}
              </Typography>
            </Box>

            <Box className={style.detailRow}>
              <LocationOn className={style.icon} />
              <Typography variant="body2" className={style.detailText}>
                {event.venue}
              </Typography>
            </Box>

            <Box className={style.detailRow}>
              <People className={style.icon} />
              <Typography variant="body2" className={style.detailText}>
                {event.delegateCount}{" "}
                {event.delegateCount === 1 ? "delegate" : "delegates"}
              </Typography>
            </Box>
          </Box>

          <Box className={style.actionFooter}>
            <Button
              variant="contained"
              className={style.joinButton}
              fullWidth
              onClick={handleJoinClick}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal ref={modalRef}>
        <div className={modalStyles.eventJoinModal}>
          <div className={modalStyles.modalContent}>
            <img
              src={event.imageUrl}
              className={modalStyles.modalImage}
              alt={event.title}
            />
            <h2 className={modalStyles.modalHeader}>{event.title}</h2>

            <div className={modalStyles.modalDetail}>
              <LocationOn className={modalStyles.icon} />
              <span>{event.venue}</span>
            </div>

            <div className={modalStyles.modalDetail}>
              <CalendarToday className={modalStyles.icon} />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className={modalStyles.modalDetail}>
              <AccessTime className={modalStyles.icon} />
              <span>{event.time}</span>
            </div>

            <p style={{ color: "#ffff", fontSize: "0.9rem" }}>
              {event.description}
            </p>

            <div className={modalStyles.modalActions}>
              <button
                className={modalStyles.joinButton}
                onClick={handleConfirmJoin}
              >
                Join now
              </button>
              <button
                className={modalStyles.closeButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EventCard;
