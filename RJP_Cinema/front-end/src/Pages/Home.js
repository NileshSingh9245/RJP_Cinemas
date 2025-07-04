import LastBookingDetails from "../Components/LastBookingDetails";
import SelectMovie from "../Components/SelectMovie";
import SelectSeats from "../Components/SelectSeats";
import TimeShedule from "../Components/TimeShedule";
import Modal from "../Components/ModalComponent";
import "../Css/Home.css";
import BsContext from "../Context/BsContext";
import { useContext, useEffect } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Alert } from '@mui/material';

const Home = (props) => {
  const context = useContext(BsContext);
  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
    allBookings,
    remainingSeats,
    fetchAllBookings
  } = context;

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const checkNegativeSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) < 0) {
        return true;
      }
    }
    return false;
  };

  const checkZeroSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) > 0) {
        return false;
      }
    }
    return true;
  };

  const handleBookNow = () => {
    if (!movie) {
      setErrorPopup(true);
      setErrorMessage("Please select a movie!");
    } else if (!time) {
      setErrorPopup(true);
      setErrorMessage("Please select a time slot!");
    } else if (
      checkNegativeSeatsValidity(noOfSeat) ||
      checkZeroSeatsValidity(noOfSeat)
    ) {
      setErrorPopup(true);
      setErrorMessage("Invalid Seats!");
    } else {
      handlePostBooking();
    }
  };

  return (
    <>
      <Modal />
      {/* Navbar/Header */}
      <div className="navbar">
        <span>RJP Cinemas</span>
        <span style={{ color: '#00BFFF', fontWeight: 400, fontSize: '1rem' }}>Book Your Show</span>
      </div>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
        {/*
          Main App Title. To change the app name or style, edit here.
          For future enhancements, update the Typography variant, color, or add a logo.
        */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 2 }}>
          <span className="highlight">RJP Cinemas</span>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Card sx={{ flex: 1, minWidth: 250, bgcolor: '#23242B' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Remaining Seats
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {Object.entries(remainingSeats).map(([seat, count]) => (
                  <Alert key={seat} severity={count > 0 ? 'info' : 'error'} sx={{ minWidth: 80, justifyContent: 'center', background: '#FFD700', color: '#1C1C1E', fontWeight: 600 }}>
                    {seat}: {count}
                  </Alert>
                ))}
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ flex: 2, minWidth: 350, bgcolor: '#23242B' }}>
            <CardContent>
              <SelectMovie />
              <TimeShedule />
              <SelectSeats />
              <Button onClick={handleBookNow} variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Card sx={{ mb: 3, bgcolor: '#23242B' }}>
          <CardContent>
            <LastBookingDetails />
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#23242B' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>All Bookings</Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Movie</TableCell>
                    <TableCell>Slot</TableCell>
                    <TableCell>Seats</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No bookings yet.</TableCell>
                    </TableRow>
                  ) : (
                    allBookings.map((b, idx) => (
                      <TableRow key={b._id || idx}>
                        <TableCell>{b.movie}</TableCell>
                        <TableCell>{b.slot}</TableCell>
                        <TableCell>
                          {Object.entries(b.seats).map(([seat, count]) => count > 0 && `${seat}: ${count}`).filter(Boolean).join(", ")}
                        </TableCell>
                        <TableCell>{b._id ? new Date(parseInt(b._id.substring(0,8), 16)*1000).toLocaleString() : ''}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
      {/* Footer */}
      <div className="footer">
        &copy; {new Date().getFullYear()} RJP Cinemas &mdash; Inspired by BookMyShow UI. All rights reserved.
      </div>
    </>
  );
};

export default Home;
