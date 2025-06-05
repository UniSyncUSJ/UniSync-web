import style from "./EventCard.module.scss";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import ShareIcon from "@mui/icons-material/Share";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
  p: 4,
};

const EventCard = () => {
  const [like, setLike] = useState<boolean>(false);
  const [join, setJoin] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [participantCount, setParticipantCount] = useState<number>(103);

  const handleLikeButtonClick = () => {
    setLike(!like);
  };

  const handleLikeButtonColor = () => {
    if (like) {
      return "error";
    }
    return "disabled";
  };

  const handleJoinButtonClick = () => {
    setJoin(!join);
    if (join) {
      setParticipantCount(participantCount + 1);
    } else {
      setParticipantCount(participantCount - 1);
    }
  };

  const handleJoinButtonColor = () => {
    if (join) {
      return "success";
    }
    return "primary";
  };

  const handleJoinButtonText = () => {
    if (join) {
      return "Joined";
    }
    return "Join";
  };

  const handleModalButtonClick = () => {
    setModalOpen(!modalOpen);
    console.log(modalOpen);
  };

  const AdditionalInfoModal = () => {
    return (
      <Modal
        open={modalOpen}
        onClose={handleModalButtonClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: "rgba(105, 109, 163, 0.2)",
          backdropFilter: "blur(0.5rem)",
        }}
        closeAfterTransition
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sample Event Title
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Organized by Sample club
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            iaculis ut neque eu aliquet.
          </Typography>
          <Box
            component="div"
            sx={{
              margin: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {" "}
              <CalendarMonthOutlinedIcon fontSize="small" /> 3rd May, 2025{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {" "}
              <AccessTimeOutlinedIcon fontSize="small" /> 08:30 am - 04:30 pm{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {" "}
              <PlaceOutlinedIcon fontSize="small" /> Sumangala Hall, Faculty of
              Social Sciences{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "rgba(247, 160, 0, 0.9)",
              padding: "0.5rem",
              borderRadius: "0.3rem",
              color: "red",
              marginBottom: "1rem",
            }}
          >
            Special notice: <br />
            Please come sharp at 8am.
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {" "}
              <WhatsAppIcon fontSize="small" /> Delegates Group
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {" "}
              <GroupsIcon fontSize="small" /> Club page
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {" "}
              <ShareIcon fontSize="small" /> share
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <div>
      <Card
        sx={{ maxWidth: 345, borderRadius: "1rem", padding: "0.2rem" }}
        className={style.container}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          width="100%"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          sx={{ borderRadius: "0.8rem" }}
        />
        <CardContent>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                flexGrow: "1",
                flexWrap: "wrap",
              }}
            >
              Sample Event Title
            </Typography>
            <Typography
              variant="overline"
              sx={{
                color: "text.secondary",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <PeopleAltRoundedIcon fontSize="small" /> {participantCount}
            </Typography>
          </Box>

          <Box
            component="div"
            sx={{
              color: "text.secondary",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.3rem",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {" "}
              <CalendarMonthIcon fontSize="small" /> 3rd May, 2025{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {" "}
              <AccessTimeFilledIcon fontSize="small" /> 08:30 am - 04:30 pm{" "}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              color: "text.secondary",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.3rem",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {" "}
              <LocationOnIcon fontSize="small" /> Sumangala Hall, Faculty of
              Social Sciences{" "}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ borderRadius: "0.8rem" }}
            variant="contained"
            color="inherit"
            size="medium"
            onClick={handleLikeButtonClick}
          >
            {" "}
            <FavoriteRoundedIcon color={handleLikeButtonColor()} />{" "}
          </Button>
          <Button
            sx={{
              borderRadius: "0.8rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.3rem",
            }}
            variant="contained"
            color={handleJoinButtonColor()}
            size="medium"
            onClick={handleJoinButtonClick}
          >
            {handleJoinButtonText()}
          </Button>
          <Button
            sx={{ borderRadius: "0.8rem" }}
            variant="contained"
            color="inherit"
            size="medium"
            onClick={handleModalButtonClick}
          >
            {" "}
            <MoreHorizIcon />{" "}
          </Button>
        </CardActions>
      </Card>

      {AdditionalInfoModal()}
    </div>
  );
};

export default EventCard;
