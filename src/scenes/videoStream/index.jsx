import React, { useState } from "react";
import { Box, Select, MenuItem, Button } from "@mui/material";
import Header from "../../components/Header";
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const VideoStream = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState("CAMERA 1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getIframeSrc = () => {
    if (selectedOption === "CAMERA 1") {
      return "http://192.168.0.20:8084/?action=stream";
    }
    else if (selectedOption === "CAMERA 2") {
      return "http://192.168.0.20:8085/?action=stream";
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
    if (selectedOption === "CAMERA 1") {
      return "http://192.168.0.20:8084/control.htm";
    }
    else if (selectedOption === "CAMERA 2") {
      return "http://192.168.0.20:8085/control.htm";
    }
  };

  return (
    <Box m="20px">
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
        <MenuItem value="CAMERA 1">Camera 1</MenuItem>
        <MenuItem value="CAMERA 2">Camera 2</MenuItem>
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
      <Box height="100vh" width="100vw">
        <img
          style={{ width: '75%'}}
          id="streamimage"
          className="xform"
          src={getIframeSrc()}
          alt={selectedOption === "liveFeed" ? "LIVE FEED" : "CONTROL"}
        />
      </Box>

      
    </Box>
  );
};

export default VideoStream;

