import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import EditIcon from '@mui/icons-material/Edit';

const Topbar = () => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" p={2} bgcolor={theme.palette.background.default}>
      {/* Centered Icons */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Tooltip title="Dashboard">
          <IconButton href="/">
            <HomeOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Live Weather">
          <IconButton href="/liveweather">
            <ThermostatIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Combined Weather">
          <IconButton href="/weather">
            <WbSunnyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video Stream">
          <IconButton href="/videostream">
            <CameraAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Time Lapses">
          <IconButton href="/timelapses">
            <HistoryIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Message">
          <IconButton href="/message">
            <EditIcon />
          </IconButton>
        </Tooltip> */}
      </Box>
    </Box>
  );
};

export default Topbar;
