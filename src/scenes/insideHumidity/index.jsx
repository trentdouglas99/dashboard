import { Box } from "@mui/material";
import Header from "../../components/Header";
import InsideHumidity from "../../components/InsideHumidity";

const InsideHumidityGraph = () => {
  return (
    <Box m="20px">
      <Header title="Inside Humidity Graph" text-align="center" />
      <Box height="75vh">
        <InsideHumidity />
      </Box>     
    </Box>
  );
};

export default InsideHumidityGraph;
