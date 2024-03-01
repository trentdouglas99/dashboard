import { Box, CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";

const LiveWeather = () => {
    const [data, setData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.0.28:8000/current');
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
      }, []);

    if (data == 0) {
    // Display spinner while data is being fetched
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress color="secondary" size={100}/>
        </Box>
    );
    }
  return (
    <Box m="20px">
      <Header title="Current Weather" text-align="center" />
      <Box height="75vh">
      <div>{"Inside Temperature:  " + data.Inside_Temperature} deg</div>
      <div>{"Outside Temperature: " + data.Outside_Temperature} deg</div>
      <div>{"Inside Humidity:     " + data.Inside_Humidity}%</div>
      <div>{"Outside Humidity:    " + data.Outside_Humidity}%</div>
      <div>{"Pressure:            " + data.Inside_Pressure} hPa</div>
      </Box>     
    </Box>
  );
};

export default LiveWeather;
