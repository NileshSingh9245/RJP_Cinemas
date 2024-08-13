import LastBookingDetails from "../Components/LastBookingDetails";
import SelectMovie from "../Components/SelectMovie";
import SelectSeats from "../Components/SelectSeats";
import TimeShedule from "../Components/TimeShedule";
import Modal from "../Components/ModalComponent";
import "../Css/Home.css";
import BsContext from "../Context/BsContext";
import { useContext } from "react";

const Home = (props) => {
  const context = useContext(BsContext);
  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
  } = context;

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
      <div className="container">
        <h1 className="cinema-title">RJP Cinema</h1>
        <div className="selection_container">
          <div className="wrapper">
            <div className="select_movie_component">
              <SelectMovie />
            </div>
            <div className="last_booking_details_container">
              <LastBookingDetails />
            </div>
          </div>
          <div className="time_seats_container">
            <TimeShedule />
            <SelectSeats />
            <button onClick={handleBookNow} className="BN-btn">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
