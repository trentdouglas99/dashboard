import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";

const Message = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    sendGetRequest(event.target.value);
  };

  const sendGetRequest = async (message) => {
    try {
      const url = `http://192.168.0.25:8000/message?message=${encodeURIComponent(message)}`;
      await fetch(url, {
        method: 'GET'
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <Box m="20px">
      <Header title="Message" textAlign="center" />
      <TextField
        label="Enter Message"
        variant="outlined"
        value={text}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default Message;
