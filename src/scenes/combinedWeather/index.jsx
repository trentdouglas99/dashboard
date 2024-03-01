import { Box } from "@mui/material";
import Header from "../../components/Header";
import CombinedHumidity from "../../components/CombinedHumidity";
import CombinedTemperature from "../../components/CombinedTemperature";
import CombinedPressure from "../../components/CombinedPressure";

const CombinedGraphs = () => {
  return (
    <div style={{ height: '85vh', overflowY: 'scroll', margin:'20px' }}>
      <Header title="Combined Weather Graphs" text-align="center" />
      <Box height="30vh">
        <CombinedPressure />
      </Box> 
      <Box height="30vh">
        <CombinedHumidity />
      </Box>     
      <Box height="30vh">
        <CombinedTemperature />
      </Box>
    </div>
  );
};

export default CombinedGraphs;
