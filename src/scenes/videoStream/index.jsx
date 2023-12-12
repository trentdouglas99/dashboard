import { Box } from "@mui/material";
import Header from "../../components/Header";

const VideoStream = () => {
  return (
    <Box m="20px">
      <Header title="Live Video Stream" text-align="center" />
      <Box height="720px" width="1280px">
        <iframe width="1280" height="720" title="LIVE FEED"
            src="http://192.168.0.28:8084/?action=stream">
        </iframe>
      </Box>     
      <Box height="50vh">
        <iframe width="500px" height="400px" title="CONTROL"
            src="http://192.168.0.28:8084/control.htm">
        </iframe>
      </Box>     
    </Box>
  );
};

export default VideoStream;
