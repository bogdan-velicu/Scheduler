import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:3001/api/schedule")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/schedule", { title, start, end })
      .then((response) => {
        console.log("Event added:", response.data);
        setTitle("");
        setStart("");
        setEnd("");
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/schedule/${id}`)
      .then((response) => {
        console.log("Event deleted:", response.data);
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End:</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>

      <h2>Current Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} ({new Date(event.start).toLocaleString()} -{" "}
            {new Date(event.end).toLocaleString()})
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
