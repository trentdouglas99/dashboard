import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const TimeLapses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [frontyardData, setFrontyardData] = useState([]);
  const [backyardData, setBackyardData] = useState([]);
  const [selectedFrontYardOption, setSelectedFrontYardOption] = useState(0);
  const [selectedBackYardOption, setSelectedBackYardOption] = useState(0);

  useEffect(() => {
    const fetchFrontYardData = async () => {
      try {
        const response = await fetch('http://192.168.0.20:8000/filenames');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setFrontyardData(jsonData);
      } catch (error) {
        console.error('Error fetching front yard data:', error);
      }
    };

    fetchFrontYardData();
  }, []);

  useEffect(() => {
    const fetchBackyardData = async () => {
      try {
        const response = await fetch('http://192.168.0.20:8000/filenamesPlants');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setBackyardData(jsonData);
      } catch (error) {
        console.error('Error fetching backyard data:', error);
      }
    };

    fetchBackyardData();
  }, []);

  const handleFrontYardChange = (event) => {
    setSelectedFrontYardOption(event.target.value);
  };

  const handleBackYardChange = (event) => {
    setSelectedBackYardOption(event.target.value);
  };

  const [videoURL, setVideoURL] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchVideoUrl = async () => {
    if (selectedFrontYardOption) {
      setVideoURL('http://192.168.0.20:8000/get_time_lapse?filename=' + selectedFrontYardOption);
      console.log(videoURL);
    }
  };

  const fetchVideoUrlPlants = async () => {
    if (selectedBackYardOption) {
      setVideoURL('http://192.168.0.20:8000/get_time_lapse_plants?filename=' + selectedBackYardOption);
      console.log(videoURL);
    }
  };

  useEffect(() => {
    if (selectedFrontYardOption) {
      fetchVideoUrl();
      openModal();
    } else if (selectedBackYardOption) {
      fetchVideoUrlPlants();
      openModal();
    }
  }, [selectedFrontYardOption, selectedBackYardOption]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="center" mb={2}>
        <Header title="Time Lapses" />
      </Box>

      {/* Front Yard Dropdown */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Front Yard
        </Typography>
        <Select
          value={selectedFrontYardOption}
          onChange={handleFrontYardChange}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "5px",
            bottom: "10px",
            width: '200px', // Set a width for the dropdown
          }}
        >
          {frontyardData.map((fileName, index) => (
            <MenuItem key={index} value={fileName}>
              {fileName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Backyard Dropdown */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Back Yard
        </Typography>
        <Select
          value={selectedBackYardOption}
          onChange={handleBackYardChange}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "5px",
            bottom: "10px",
            width: '200px', // Set a width for the dropdown
          }}
        >
          {backyardData.map((fileName, index) => (
            <MenuItem key={index} value={fileName}>
              {fileName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video"
        style={{
          overlay: {
            backgroundColor: "transparent",
          },
          content: {
            left: 100,
            top: '220px',
            padding: '5px',
            height: '40%',
            width: '75%'
          },
        }}
      >
        {(selectedFrontYardOption || selectedBackYardOption) ? (
          <video controls width="100%" height="100%">
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </Modal>
    </Box>
  );
};

export default TimeLapses;
