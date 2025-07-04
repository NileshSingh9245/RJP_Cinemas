# RJP Cinemas - Fullstack Movie Ticket Booking App

## Project Aim
RJP Cinemas is a fullstack web application for booking movie tickets online. It provides a modern, user-friendly interface for users to select movies, choose time slots, pick seats, and view all bookings. The app prevents overbooking, displays remaining seats, and is designed for easy future enhancements.

---

## Project Structure & Documentation

### Root Directory
- **RJP_Cinema/**: Main project folder containing both backend and frontend code.
- **package.json**: (at root) For managing scripts and dependencies at the workspace level.

### back-end/
- **Purpose**: Node.js/Express server, API endpoints, and MongoDB integration.
- **Files:**
  - `server.js`: Main entry point. Sets up Express, connects to MongoDB, serves the React build, and handles API routing.
  - `dbConnection.js`: Handles MongoDB connection using Mongoose. Easy to update for different DBs or environments.
  - `routes.js`: Defines all API endpoints (booking, fetching bookings, etc.).
  - `schema.js`: Mongoose schema/model for ticket bookings.
  - `package.json`: Backend dependencies and scripts.

### front-end/
- **Purpose**: React app for the user interface, styled with Material UI and custom CSS.
- **Files & Folders:**
  - `public/index.html`: HTML template. Loads Google Fonts and sets app branding.
  - `src/`: Main React source code.
    - `App.js`: Root React component. Wraps the app in context providers.
    - `App.css`: Global styles, theme, and Material UI overrides.
    - `data.js`: Static data (movies, seats, etc.).
    - `index.js`: React entry point.
    - `Pages/Home.js`: Main page. Handles booking flow, displays bookings, and uses Material UI for layout.
    - `Components/`: Reusable UI components:
      - `SelectMovie.js`: Movie selection UI.
      - `TimeShedule.js`: Time slot selection UI.
      - `SelectSeats.js`: Seat selection UI.
      - `SeatsInput.js`: Input for number of seats per type.
      - `ModalComponent.js`: Error/info modal.
      - `LastBookingDetails.js`: Shows last booking summary.
      - `RadioComponent.js`: Custom radio button for selections.
    - `Context/`: React context for global state management:
      - `BsContext.js`: Context definition.
      - `BsState.js`: Context provider, handles API calls and state logic.
    - `Css/`: Component-specific CSS for custom tweaks.
  - `package.json`: Frontend dependencies and scripts.

### scripts/
- **Purpose**: Automation scripts for testing, building, and running the fullstack app.
- `test_fullstack.sh`: Example shell script to automate build, start, and test processes.

---

## How to Extend or Enhance
- **Add new features**: Create new components in `src/Components/` and update context logic in `src/Context/`.
- **Change branding/theme**: Edit `public/index.html` for fonts, `App.css` for colors, and `Home.js` for the main title/logo.
- **API changes**: Update or add endpoints in `back-end/routes.js` and update the schema in `back-end/schema.js`.
- **Database**: Change connection string in `dbConnection.js` for different environments.
- **Testing/CI**: Add scripts to `scripts/` and update root or backend/frontend `package.json` as needed.

---

## Summary
This app is designed to be clean, modern, and easy to maintain or extend. All code is documented and structured for professional development and future enhancements.
