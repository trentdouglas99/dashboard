import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme"; // Adjust the path as necessary

const LiveWeather = () => {
    const [data, setData] = useState(null);

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

    if (data === null) {
        // Display spinner while data is being fetched
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="secondary" size={100} />
            </Box>
        );
    }

    // Custom gradient background CSS
    const linearProgressStylesTemp = {
        background: 'linear-gradient(to right, #2196f3, #4caf50, #ffeb3b, #f44336)',
        height: 50,
        borderRadius: 0,
        overflow: 'hidden',
    };

    const linearProgressStylesHum = {
        background: 'linear-gradient(to right, white, blue)', // Adjust gradient colors here
        height: 50,
        borderRadius: 0,
        overflow: 'hidden',
    };
    
    const linearProgressStylesPres = {
        background: 'linear-gradient(to right, transparent, darkgrey)', // Adjust gradient colors here
        height: 50,
        borderRadius: 0,
        overflow: 'hidden',
    };

    // Render the weather data with gradient bars
    return (
        <Box m="20px">
            {/* Centering Box for Header */}
            <Box display="flex" justifyContent="center" mb={0}>
                <Header title="Current Weather" />
            </Box>
            <Box height="75vh">
                <div>
                    <Typography variant="body1" sx={{ color: tokens.grey }}>
                        Inside Temperature: {data.Inside_Temperature} deg
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={data.Inside_Temperature + 100} // Adjust max value as needed
                        style={{ ...linearProgressStylesTemp, width: '100%', marginTop: 5 }}
                    />
                </div>
                <div>
                    <Typography variant="body1" sx={{ color: tokens.grey }}>
                        Outside Temperature: {data.Outside_Temperature} deg
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={data.Outside_Temperature + 100} // Adjust max value as needed
                        style={{ ...linearProgressStylesTemp, width: '100%', marginTop: 1 }}
                    />
                </div>
                <div>
                    <Typography variant="body1" sx={{ color: tokens.grey }}>
                        Inside Humidity: {data.Inside_Humidity}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={data.Inside_Humidity + 100}
                        style={{ ...linearProgressStylesHum, width: '100%', marginTop: 5 }}
                    />
                </div>
                <div>
                    <Typography variant="body1" sx={{ color: tokens.grey }}>
                        Outside Humidity: {data.Outside_Humidity}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={data.Outside_Humidity + 100}
                        style={{ ...linearProgressStylesHum, width: '100%', marginTop: 5 }}
                    />
                </div>
                <div>
                    <Typography variant="body1" sx={{ color: tokens.grey }}>
                        Pressure: {data.Inside_Pressure} hPa
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={((data.Inside_Pressure - 790) / 30) * 100 + 100} // Adjust max value as needed
                        style={{ ...linearProgressStylesPres, width: '100%', marginTop: 5 }}
                    />
                </div>
            </Box>
        </Box>
    );
};

export default LiveWeather;
