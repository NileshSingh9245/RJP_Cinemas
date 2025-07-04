import React, { useState, useEffect } from "react";
import BsContext from "./BsContext";

const BsState = (props) => {
  
  const [errorPopup, setErrorPopup] = useState(false);

  //error message
  const [errorMessage, setErrorMessage] = useState("");

  // time slot which the user selects.
  const [time, changeTime] = useState("");

 
  const [movie, changeMovie] = useState("");

  // No of seats which the user selects.
  const [noOfSeat, changeNoOfSeats] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });

  // Last movie booking details.
  const [lastBookingDetails, setLastBookingDetails] = useState(null);
  // All bookings and remaining seats
  const [allBookings, setAllBookings] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState({
    A1: 10, A2: 10, A3: 10, A4: 10, D1: 10, D2: 10
  });

  // handling post request to save booking details on the backend
  const handlePostBooking = async () => {
    const response = await fetch(
      `/api/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movie, slot: time, seats: noOfSeat }),
      }
    );
    const data = await response.json();
    setErrorPopup(true);
    setErrorMessage(data.message);
    if (response.status === 200) {
      changeTime("");
      changeMovie("");
      changeNoOfSeats({
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        D1: "",
        D2: "",
      });
      setLastBookingDetails(data.data);
      window.localStorage.clear();
      await fetchAllBookings();
    }
    if (response.status === 400) {
      await fetchAllBookings();
    }
  };

  // Fetch all bookings and remaining seats
  const fetchAllBookings = async () => {
    const response = await fetch(`/bookings`);
    const data = await response.json();
    setAllBookings(data.bookings || []);
    setRemainingSeats(data.remaining || { A1: 10, A2: 10, A3: 10, A4: 10, D1: 10, D2: 10 });
  };

  //handle get request to get the last booking details from backend
  const handleGetLastBooking = async () => {
    if (allBookings.length > 0) {
      setLastBookingDetails(allBookings[0]);
    } else {
      setLastBookingDetails(null);
    }
  };

  useEffect(() => {
    //getting movies, slot and seats from localstorage and updating state (useful when page refreshes)
    const movie = window.localStorage.getItem("movie");
    const slot = window.localStorage.getItem("slot");
    const seats = JSON.parse(window.localStorage.getItem("seats"));
    if(movie){
      changeMovie(movie);
    }
    if(slot){
      changeTime(slot);
    }
    if(seats){
      changeNoOfSeats(seats);
    }
    fetchAllBookings();
  }, []);

  return (
    // providing all the required data to app
    <BsContext.Provider
      value={{
        handlePostBooking,
        handleGetLastBooking,
        fetchAllBookings,
        movie,
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        changeNoOfSeats,
        lastBookingDetails,
        allBookings,
        remainingSeats,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}>
      {props.children}
    </BsContext.Provider>
  );
};
export default BsState;