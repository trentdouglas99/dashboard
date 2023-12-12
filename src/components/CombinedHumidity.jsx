import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from 'react';

const CombinedHumidity = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.28:8000/limited');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // Function to transform each entry
  const transformEntry_insideTemperature = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Inside_Temperature,
    };
  };
  const transformEntry_insideHumidity = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Inside_Humidity,
    };
  };
  const transformEntry_outsideTemperature = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Outside_Temperature,
    };
  };
  const transformEntry_outsideHumidity = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Outside_Humidity,
    };
  };
  const transformEntry_pressure = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Inside_Pressure,
    };
  };

  const transformEntry_insideTemperature_transformed = data.map(transformEntry_insideTemperature);
  const transformEntry_insideHumidity_transformed = data.map(transformEntry_insideHumidity);
  const transformEntry_outsideTemperature_transformed = data.map(transformEntry_outsideTemperature);
  const transformEntry_outsideHumidity_transformed = data.map(transformEntry_outsideHumidity);
  const transformEntry_pressure_transformed = data.map(transformEntry_pressure);

  const jsonData_all_humidity = [
    {
      id: "Inside Humidity",
      color: tokens("dark").greenAccent[500],
      data: transformEntry_insideHumidity_transformed,
    },
    {
      id: "Outside Humidity",
      color: tokens("dark").greenAccent[500],
      data: transformEntry_outsideHumidity_transformed,
    }
    
    // id: "insideTemperature",
    // color: tokens("dark").greenAccent[500],
    // data: transformEntry_insideTemperature_transformed,
    // id: "outsideHumidity",
    // color: tokens("dark").greenAccent[500],
    // data: transformEntry_outsideTemperature_transformed,
    // id: "pressure",
    // color: tokens("dark").greenAccent[500],
    // data: transformEntry_pressure_transformed,
  ]
  
  return (
    <ResponsiveLine
      data={jsonData_all_humidity}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: 'category10' }} // added
      margin={{ top: 10, right: 150, bottom: 10, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "0",
        max: "100",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={null} 
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Percent Humidity", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default CombinedHumidity;
