import { Box, Grid, useTheme, Checkbox } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CombinedTemperature from "../../components/CombinedTemperature";
import CombinedHumidity from "../../components/CombinedHumidity";
import CombinedPressure from "../../components/CombinedPressure";
import LiveWeather from "../liveWeather";
import React, { useState } from "react";
import imageSrc from '../../img/dino16x9.gif';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [videoStreamInside, setVideoStreamInside] = useState(imageSrc);
  const [videoStreamOutside, setVideoStreamOutside] = useState(imageSrc);
  const [videoStreamGarage, setVideoStreamGarage] = useState(imageSrc);
  const [showVideoFeed, setShowVideoFeed] = useState(true); // State variable to toggle video feed

  const handleToggleVideoFeed = () => {
    setShowVideoFeed(!showVideoFeed);
    if (!showVideoFeed) {
      setVideoStreamInside(imageSrc);
      setVideoStreamOutside(imageSrc);
      setVideoStreamGarage(imageSrc);
    } else {
      setVideoStreamInside("http://192.168.0.27:8084/?action=stream");
      setVideoStreamOutside("http://192.168.0.20:8084/?action=stream");
      setVideoStreamGarage("http://192.168.0.25:8084/?action=stream");
    }
  };

  return (
    <Grid container spacing={2} style={{ height: "90vh", padding: '5px', overflowY: "auto" }}>
      {/* Live Weather Section */}
      <Grid item xs={12}>
        <div style={{ maxWidth: '100%', height:'500px', textAlign:'center' }}>
          <LiveWeather />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ width: '100%' }}>
          <Header title="Combined Weather Graphs" style={{ textAlign: 'center' }} />
          <Box height="20vh">
            <CombinedPressure />
          </Box>
          <Box height="20vh">
            <CombinedHumidity />
          </Box>
          <Box height="20vh">
            <CombinedTemperature />
          </Box>
        </div>
      </Grid>
      {/* Video Streams Section */}
      <Grid item xs={12}>
      <Box display="flex" justifyContent="center" textAlign="center">
        <Header title="Video Stream" />
      </Box>
        <div style={{ padding: '0px', maxWidth: '100%', maxHeight: '100%', overflowY: 'scroll' }}>
          <img style={{ width: '100%' }} id="streamimage" className="xform" src={videoStreamInside} />
          <img style={{ width: '100%' }} id="streamimage" className="xform" src={videoStreamOutside} />
          <img style={{ width: '100%' }} id="streamimage" className="xform" src={videoStreamGarage} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Checkbox
            checked={showVideoFeed}
            onChange={handleToggleVideoFeed}
            inputProps={{ 'aria-label': 'Hide Video Feed' }}
            style={{ color: colors.secondary }}
            sx={{
              '&.Mui-checked': {
                color: colors.greenAccent[500],
              },
            }}
          />
          <span>Hide Video Feed</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
