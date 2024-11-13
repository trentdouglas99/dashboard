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
    else if (selectedOption === "Plants") {
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
    else if (selectedOption === "Plants") {
      return "http://192.168.0.25:8084/control.htm";
    }
    else if (selectedOption === "none") {
      return imageSrc;
    }
  };

  return (
    <Box m="10px" display="flex" flexDirection="column" alignItems="center">
      <Box mb={2}>
        <Header title="Live Video Stream" />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={3}>
        <Select 
          value={selectedOption} 
          onChange={handleChange} 
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "5px",
            width: '150px', // Adjust width for better alignment
            height: '45px',
          }}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="inside">Inside</MenuItem>
          <MenuItem value="Frontyard">Frontyard</MenuItem>
          <MenuItem value="Plants">Plants</MenuItem>
        </Select>
  
        <Button 
          type="submit" 
          variant="contained" 
          onClick={openModal} 
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "5px",
            width: "150px",
            height: "45px",
          }}
        >
          Controls
        </Button>
      </Box>
  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Controls"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Slight overlay for better focus
          },
          content: {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: '5px',
            height: '500px',
            width: '80%',
          },
        }}
      >
        <Box display="flex" justifyContent="center" mb={2} position="relative">
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
        </Box>
      </Modal>
  
      {videoStream && (
        <Box mt={3} width="100%" display="flex" justifyContent="center">
          {/* Center video with margin at top */}
          <img
            style={{ width: '100%' }}
            src={videoStream}
            alt={selectedOption === "liveFeed" ? "LIVE FEED" : "CONTROL"}
          />
        </Box>
      )}
    </Box>
  );  
};

export default VideoStream;
