import { Box } from "@mui/material";
import Header from "../../components/Header";
import CombinedHumidity from "../../components/CombinedHumidity";
import CombinedTemperature from "../../components/CombinedTemperature";
import CombinedPressure from "../../components/CombinedPressure";

const CombinedGraphs = () => {
  return (
    <Box m="20px">
      <Header title="Combined Weather Graphs" text-align="center" />
      <Box height="22vh">
        <CombinedPressure />
      </Box> 
      <Box height="22vh">
        <CombinedHumidity />
      </Box>     
      <Box height="30vh">
        <CombinedTemperature />
      </Box>
    </Box>
  );
};

export default CombinedGraphs;
