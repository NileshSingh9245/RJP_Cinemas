import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SeatsInput = ({
  changeNoOfSeats,
  noOfSeat,
  changeSeats,
  seat,
  text,
  index,
}) => {
  //changing the seats according to user input
  const change_seats = (e) => {
    changeNoOfSeats({ ...noOfSeat, [e.target.name]: Number(e.target.value) });

    //setting seats in localsorage
    window.localStorage.setItem(
      "seats",
      JSON.stringify({
        ...noOfSeat,
        [e.target.name]: Number(e.target.value),
      })
    );
  };

  //highlighting the seat
  const handleChecked = (text) => {
    changeSeats(text);
  };

  return (
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      <span style={{ minWidth: 30, fontWeight: 500 }}>{text}</span>
      <TextField
        type="number"
        size="small"
        variant="outlined"
        name={text}
        inputProps={{ min: 0, max: 30, style: { width: 60 } }}
        onChange={change_seats}
        value={noOfSeat[text]}
        label="Seats"
      />
    </Box>
  );
};

export default SeatsInput;