import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'react-bootstrap';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const sendMessage = () => {
    if (message !== "") {
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });
  }, []);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Message..." value={message} onChange={(event) => { setMessage(event.target.value); }} />
        <Button type="button" onClick={sendMessage}>Enter Message</Button>
      </Form.Group>
      <h1> Messages:</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </Form>
  );
}

export default App;
