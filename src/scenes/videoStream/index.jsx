import React, { useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import Header from "../../components/Header";
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const VideoStream = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState("INSIDE");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getIframeSrc = () => {
    if (selectedOption === "INSIDE") {
      return "http://192.168.0.27:8084/?action=stream";
    }
    else if (selectedOption === "OUTSIDE") {
      return "http://192.168.0.20:8084/?action=stream";
    }
    else if (selectedOption === "GARAGE") {
      return "http://192.168.0.31:8084/?action=stream";
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getIframeSrcControls = () => {
    if (selectedOption === "INSIDE") {
      return "http://192.168.0.27:8084/control.htm";
    }
    else if (selectedOption === "OUTSIDE") {
      return "http://192.168.0.20:8084/control.htm";
    }
    else if (selectedOption === "GARAGE") {
      return "http://192.168.0.31:8084/control.htm";
    }
  };

  return (
    <div style={{ height: '75vh', overflowY: 'auto', margin: '20px' }}>
      <Header title="Live Video Stream" text-align="center" />

      <Select 
        value={selectedOption} 
        onChange={handleChange} 
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "5px",
          bottom: "10px",
        }}
      >
        <MenuItem value="INSIDE">Inside</MenuItem>
        <MenuItem value="OUTSIDE">Outside</MenuItem>
        <MenuItem value="GARAGE">Garage</MenuItem>
      </Select>
      <Button 
        type="submit" 
        variant="contained" 
        onClick={openModal} 
        style={{textTransform: 'none'}}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius:"5px",
          left: "10px",
          height:"52px",
          bottom: "10px",
        }}
      >
        Controls
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Controls"
        style={{
          overlay: {
            backgroundColor: "transparent", // Set overlay background to transparent
          },
          content: {
            left:80,
            padding: '5px', // Adjust the padding as needed
            margin: 'auto', // Center the modal horizontally
            height: '500px'
          },
        }}
      >
        <div style={{ position: 'relative'}}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            Close Controls
          </button>
          <iframe
            title="Camera Controls"
            src={getIframeSrcControls()}
            style={{
              width: '100%',
              height: '500px',
              position: 'absolute',
              top: 20,
              left: 0,
              zIndex: 0,
            }}
          ></iframe>
        </div>
      </Modal>
      <img
          style={{ width: '100%'}}
          id="streamimage"
          className="xform"
          src={getIframeSrc()}
          alt={selectedOption === "liveFeed" ? "LIVE FEED" : "CONTROL"}
      />
    </div>
  );
};

export default VideoStream;
