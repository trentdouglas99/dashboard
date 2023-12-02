import { Box } from "@mui/material";
import Header from "../../components/Header";
import OutsideHumidity from "../../components/OutsideHumidity";

const OutsideHumidityGraph = () => {
  return (
    <Box m="20px">
      <Header title="Outside Humidity Graph" text-align="center" />
      <Box height="75vh">
        <OutsideHumidity />
      </Box>     
    </Box>
  );
};

export default OutsideHumidityGraph;
