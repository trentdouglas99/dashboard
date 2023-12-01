import { Box } from "@mui/material";
import Header from "../../components/Header";
import InsideTemp from "../../components/InsideTemp";

const InsideTempGraph = () => {
  return (
    <Box m="20px">
      <Header title="Inside Temperatures Graph" text-align="center" />
      <Box height="75vh">
        <InsideTemp />
      </Box>     
    </Box>
  );
};

export default InsideTempGraph;
