import { Box } from "@mui/material";
import Header from "../../components/Header";
import InsideTemp from "../../components/InsideTemp";

const InsideTempGraph = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <InsideTemp />
      </Box>
    </Box>
  );
};

export default InsideTempGraph;
