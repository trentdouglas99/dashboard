import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CombinedGraphs from "./scenes/combinedWeather";
import VideoStream from "./scenes/videoStream";
import TimeLapses from "./scenes/timeLapses"
import LiveWeather from "./scenes/liveWeather"

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weather" element={<CombinedGraphs />} />
              <Route path="/liveweather" element={<LiveWeather />} />
              <Route path="/videostream" element={<VideoStream />} />
              <Route path="/timelapses" element={<TimeLapses />} />              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
