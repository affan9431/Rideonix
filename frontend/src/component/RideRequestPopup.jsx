// RideRequestPopup.jsx
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { socket } from "../service/socket.io";
import { jwtDecode } from "jwt-decode";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function RideRequestPopup({
  open,
  handleClose,
  incomingRide,
  driverInfo,
  setIncomingRide,
  setShowRidePopup,
}) {
  const handleAccept = () => {
    socket.emit("ride_accepted", {
      driverData: driverInfo,
      rideData: incomingRide,
    });
    setIncomingRide(null);
    setShowRidePopup(false);
    handleClose();
  };


  const handleReject = () => {
    // const riderToken = localStorage.getItem("riderToken");
    // const decoded = riderToken && jwtDecode(riderToken);
    socket.emit("ride_rejected", {
      driverId: driverInfo.driverId,
      riderId: incomingRide.riderId,
    });
    setShowRidePopup(false);
    setIncomingRide(null);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {}} // Disable close on outside click
      disableEscapeKeyDown
      aria-labelledby="ride-modal-title"
      aria-describedby="ride-modal-description"
    >
      <Box sx={style}>
        <Typography id="ride-modal-title" variant="h6" component="h2">
          Incoming Ride Request
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>From:</strong> {incomingRide?.pickUpLocationName || "Unknown"}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>To:</strong> {incomingRide?.dropLocationName || "Unknown"}
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="success" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="contained" color="error" onClick={handleReject}>
            Reject
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
