import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, Button } from "@mui/material";
import Header from "../../components/Header";
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const TimeLapses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.20:8000/filenames');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render



  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
    
  const [videoURL, setVideoURL] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchVideoUrl = async () => {
    setVideoURL('http://192.168.0.20:8000/get_time_lapse?filename=' + selectedOption);
    console.log(videoURL)
  };

  useEffect(() => {
    if (selectedOption) {
        fetchVideoUrl();
        openModal()
    }
  }, [selectedOption]); // Run the effect whenever selectedOption changes



  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Time Lapses" text-align="center" />

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
        {data.map((fileName, index) => (
            <MenuItem key={index} value={fileName}>
              {fileName}
            </MenuItem>
        ))}
      </Select>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video"
        style={{
          overlay: {
            backgroundColor: "transparent", // Set overlay background to transparent
          },
          content: {
            left:100,
            top: '220px',
            padding: '5px', // Adjust the padding as needed
            height: '40%',
            width: '75%'
          },
        }}
      >
      selectedOption != 0 ? (
        <video controls width="100%" height="100%">
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
      </Modal>
    </Box>
  );
};

export default TimeLapses;

