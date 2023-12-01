import { Box } from "@mui/material";
import Header from "../../components/Header";
import OutsideTemp from "../../components/OutsideTemp";

const OutsideTempGraph = () => {
  return (
    <Box m="20px">
      <Header title="Outside Temperatures Graph" text-align="center" />
      <Box height="75vh">
        <OutsideTemp />
      </Box>     
    </Box>
  );
};

export default OutsideTempGraph;
