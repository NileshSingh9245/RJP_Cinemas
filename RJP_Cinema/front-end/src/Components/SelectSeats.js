import React, { useState, useContext } from "react";
import { seats } from "../data";
import BsContext from "../Context/BsContext";
import SeatsInput from "./SeatsInput";
import { Typography, Box } from '@mui/material';

const SelectSeats = () => {
  const [seat, changeSeats] = useState([]);
  const context = useContext(BsContext);
  const { noOfSeat, changeNoOfSeats } = context;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        Select Seats
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {seats.map((el, index) => (
          <SeatsInput
            seat={seat}
            key={index}
            index={index}
            changeSeats={changeSeats}
            noOfSeat={noOfSeat}
            text={el}
            changeNoOfSeats={changeNoOfSeats}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectSeats;