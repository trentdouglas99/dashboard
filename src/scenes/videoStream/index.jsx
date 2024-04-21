import React, { useState, useEffect } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import Header from "../../components/Header";
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import imageSrc from '../../img/dino16x9.gif';

const VideoStream = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState("NONE");
  const [videoStream, setVideoStream] = useState(null);
  const [fetchController, setFetchController] = useState(null);

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
    if (selectedOption === "INSIDE") {
      return "http://192.168.0.27:8084/?action=stream";
    }
    else if (selectedOption === "OUTSIDE") {
      return "http://192.168.0.20:8084/?action=stream";
    }
    else if (selectedOption === "GARAGE") {
      return "http://192.168.0.29:8084/?action=stream";
    }
    else if (selectedOption === "NONE") {
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
    if (selectedOption === "INSIDE") {
      return "http://192.168.0.27:8084/control.htm";
    }
    else if (selectedOption === "OUTSIDE") {
      return "http://192.168.0.20:8084/control.htm";
    }
    else if (selectedOption === "GARAGE") {
      return "http://192.168.0.29:8084/control.htm";
    }
    else if (selectedOption === "NONE") {
      return imageSrc;
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        <MenuItem value="NONE">None</MenuItem>
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
      {videoStream && (
        <img
          style={{ width: '100%'}}
          src={videoStream}
          alt={selectedOption === "liveFeed" ? "LIVE FEED" : "CONTROL"}
        />
      )}
    </div>
  );
};

export default VideoStream;
