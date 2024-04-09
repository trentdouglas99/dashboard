import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CombinedTemperature from "../../components/CombinedTemperature";
import CombinedHumidity from "../../components/CombinedHumidity";
import CombinedPressure from "../../components/CombinedPressure";
import LiveWeather from "../liveWeather";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid container spacing={2} style={{ height: "80vh", overflowY: "auto" }}>
      <Grid item xs={6}>
        <div style={{ border: '1px solid #ccc', maxWidth: '100%', height:'230px'}}>
          <LiveWeather />
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '100%', overflowY:'auto'}}>
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
      <Grid item xs={6}>
        <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '100%', maxHeight:'100%', overflowY:'scroll'}}>
          <img
              style={{ width: '100%'}}
              id="streamimage"
              className="xform"
              src={"http://192.168.0.27:8084/?action=stream"}
          />
          <img
              style={{ width: '100%'}}
              id="streamimage"
              className="xform"
              src={"http://192.168.0.20:8084/?action=stream"}
          />
          <img
              style={{ width: '100%'}}
              id="streamimage"
              className="xform"
              src={"http://192.168.0.31:8084/?action=stream"}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
