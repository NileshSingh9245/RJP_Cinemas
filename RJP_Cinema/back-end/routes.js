const express = require("express");
const router = express.Router();
const Ticket = require("./schema"); // Import the Ticket schema
const cors = require("cors");
const app = express();

// Middleware setup
router.use(express.json()); // Parse incoming JSON data
router.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Total seats available for each seat type
const TOTAL_SEATS = { A1: 10, A2: 10, A3: 10, A4: 10, D1: 10, D2: 10 };

// Helper to calculate remaining seats
async function getRemainingSeats() {
  const allBookings = await Ticket.find();
  const remaining = { ...TOTAL_SEATS };
  allBookings.forEach(b => {
    for (const seat in b.seats) {
      remaining[seat] -= Number(b.seats[seat] || 0);
    }
  });
  return remaining;
}

// Endpoint for creating a new booking and adding it to the database.
router.post("/booking", async (req, res) => {
  const { movie, slot, seats } = req.body;
  try {
    // Check for overbooking
    const remaining = await getRemainingSeats();
    for (const seat in seats) {
      if (Number(seats[seat]) > remaining[seat]) {
        return res.status(400).json({
          data: null,
          message: `Not enough seats available for ${seat}. Remaining: ${remaining[seat]}`
        });
      }
    }
    // Create and save booking
    const myData = new Ticket({ movie, slot, seats });
    await myData.save();
    res.status(200).json({ data: myData, message: "Booking successful!" });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Something went wrong! Please try again.",
    });
  }
});

// Endpoint for getting all bookings and remaining seats
router.get("/bookings", async (req, res) => {
  try {
    const allBookings = await Ticket.find().sort({ _id: -1 });
    const remaining = await getRemainingSeats();
    res.status(200).json({ bookings: allBookings, remaining });
  } catch (error) {
    res.status(500).json({
      bookings: [],
      remaining: {},
      message: "Something went wrong! Please try again.",
    });
  }
});

module.exports = router;
