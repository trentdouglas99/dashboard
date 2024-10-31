import { Box } from "@mui/material";
import Header from "../../components/Header";
import CombinedHumidity from "../../components/CombinedHumidity";
import CombinedTemperature from "../../components/CombinedTemperature";
import CombinedPressure from "../../components/CombinedPressure";

const CombinedGraphs = () => {
  return (
    <div style={{ height: '85vh', overflowY: 'scroll', margin: '20px' }}>
      <Box display="flex" justifyContent="center" textAlign="center">
        <Header title="Combined Weather Graphs" />
      </Box>
      <Box height="30vh" marginBottom="10px">
        <CombinedPressure />
      </Box> 
      <Box height="30vh" marginBottom="10px">
        <CombinedHumidity />
      </Box>     
      <Box height="30vh" marginBottom="10px">
        <CombinedTemperature />
      </Box>
    </div>
  );
};

export default CombinedGraphs;
