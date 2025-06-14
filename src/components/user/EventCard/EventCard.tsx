import React from "react";
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

import style from "./EventCard.module.scss";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  delegateCount: number;
  imageUrl: string;
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Card
      className={style.eventCard}
      elevation={2}
      sx={{ borderRadius: "20px" }}
    >
      {/* Image at the Top */}
      <Box className={style.imageContainer}>
        <img
          src={event.imageUrl}
          alt={event.title}
          className={style.eventImage}
        />
      </Box>

      {/* Card Content */}
      <CardContent className={style.cardContent}>
        {/* Header */}
        <Box className={style.contentHeader}>
          <Typography variant="h6" className={style.eventTitle}>
            {event.title}
          </Typography>

          <Box className={style.headerActions}>
            <IconButton size="small" className={style.actionButton}>
              <FavoriteBorder fontSize="small" />
            </IconButton>
            <IconButton size="small" className={style.actionButton}>
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Event Details */}
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

        {/* Action Button */}
        <Box className={style.actionFooter}>
          <Button variant="contained" className={style.joinButton} fullWidth>
            Join now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
