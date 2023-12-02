import { Box } from "@mui/material";
import Header from "../../components/Header";
import Pressure from "../../components/Pressure";

const PressureGraph = () => {
  return (
    <Box m="20px">
      <Header title="Atmospheric Pressure Graph" text-align="center" />
      <Box height="75vh">
        <Pressure />
      </Box>     
    </Box>
  );
};

export default PressureGraph;
