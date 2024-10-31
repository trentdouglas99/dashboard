import React, { useState, useEffect } from "react";
import { Select, MenuItem, Button, Box } from "@mui/material";
import Header from "../../components/Header";
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import imageSrc from '../../img/dino16x9.gif';

const VideoStream = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState("none");
  const [videoStream, setVideoStream] = useState(null);
  const [fetchController, setFetchController] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (fetchController) {
      fetchController.abort(); // Cancel the previous fetch request
    }

    const controller = new AbortController();
    setFetchController(controller);

    setVideoStream(getIframeSrc());

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (controller) {
          controller.abort(); // Cancel the fetch request when the page is hidden
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (controller) {
        controller.abort(); // Cancel the fetch request when component unmounts or re-renders
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [selectedOption]); // Fetch new video stream when selectedOption changes

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getIframeSrc = () => {
    if (selectedOption === "inside") {
      return "http://192.168.0.27:8084/?action=stream";
    }
    else if (selectedOption === "Frontyard") {
      return "http://192.168.0.20:8084/?action=stream";
    }
    else if (selectedOption === "Backyard") {
      return "http://192.168.0.25:8084/?action=stream";
    }
    else if (selectedOption === "none") {
      return imageSrc;
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getIframeSrcControls = () => {
    if (selectedOption === "inside") {
      return "http://192.168.0.27:8084/control.htm";
    }
    else if (selectedOption === "Frontyard") {
      return "http://192.168.0.20:8084/control.htm";
    }
    else if (selectedOption === "Backyard") {
      return "http://192.168.0.25:8084/control.htm";
    }
    else if (selectedOption === "none") {
      return imageSrc;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="75vh"
      overflowY="auto"
      margin="20px"
    >
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
          marginBottom: "10px",
          width: '100px', // Set a width for the dropdown
          height: '45px'
        }}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="inside">Inside</MenuItem>
        <MenuItem value="Frontyard">Frontyard</MenuItem>
        <MenuItem value="Backyard">Backyard</MenuItem>
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
          borderRadius:"5px",
          width:"100px",
          height:"45px",
          marginBottom: "10px", // Add space below the button
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
            left: "50%", // Center modal
            top: "50%",
            transform: "translate(-50%, -50%)", // Adjust to truly center
            padding: '5px',
            height: '500px',
            width: '80%', // Set a width for the modal
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

      {videoStream && (
        <img
          style={{ width: '100%', marginTop: '20px' }} // Add some margin on top
          src={videoStream}
          alt={selectedOption === "liveFeed" ? "LIVE FEED" : "CONTROL"}
        />
      )}
    </Box>
  );
};

export default VideoStream;
