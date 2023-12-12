import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import InsideTempGraph from "./scenes/insideTemp";
import OutsideTempGraph from "./scenes/outsideTemp";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import InsideHumidityGraph from "./scenes/insideHumidity";
import OutsideHumidityGraph from "./scenes/outsideHumidity";
import PressureGraph from "./scenes/pressure";
import CombinedGraphs from "./scenes/combinedWeather";
import VideoStream from "./scenes/videoStream";

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
              <Route path="/insideTemps" element={<InsideTempGraph />} />
              <Route path="/outsideTemps" element={<OutsideTempGraph />} />
              <Route path="/insideHumidity" element={<InsideHumidityGraph />} />
              <Route path="/outsideHumidity" element={<OutsideHumidityGraph />} />
              <Route path="/pressure" element={<PressureGraph />} />
              <Route path="/combined" element={<CombinedGraphs />} />
              <Route path="/videostream" element={<VideoStream />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
