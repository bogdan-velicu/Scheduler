import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScheduleCalendar from "./components/ScheduleCalendar";
import AdminPage from "./pages/AdminPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bogdan's Schedule</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ScheduleCalendar />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
