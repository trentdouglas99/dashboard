import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from 'react';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
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

  console.log(data)
  
  // Function to transform each entry
  const transformEntry_insideTemp = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Inside_Temperature,
    };
  };
  const transformEntry_outsideTemp = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Outside_Temperature,
    };
  };
  const transformEntry_insideHumidity = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Inside_Humidity,
    };
  };
  const transformEntry_outsideHumidity = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Outside_Temperature,
    };
  };
  const transformEntry_insidePressure = (entry) => {
    return {
      x: entry.Current_Time,
      y: entry.Inside_Pressure,
    };
  };

  const transformEntry_insideTemp_transformed = data.map(transformEntry_insideTemp);
  const transformEntry_outsideTemp_transformed = data.map(transformEntry_outsideTemp);
  const transformEntry_insideHumidity_transformed = data.map(transformEntry_insideHumidity);
  const transformEntry_outsideHumidity_transformed = data.map(transformEntry_outsideHumidity);
  const transformEntry_insidePressure_transformed = data.map(transformEntry_insidePressure);

  const jsonData_insideTemp = {
    id: "insideTemp",
    color: tokens("dark").greenAccent[500],
    data: transformEntry_insideTemp_transformed
  }
  const jsonData_outsideTemp = {
    id: "outsideTemp",
    color: tokens("dark").redAccent[200],
    data: transformEntry_outsideTemp_transformed
  }
  const jsonData_insideHumidity = {
    id: "insideHumidity",
    color: tokens("dark").greenAccent[500],
    data: transformEntry_insideHumidity_transformed
  }
  const jsonData_outsideHumidity = {
    id: "outsideHumidity",
    color: tokens("dark").greenAccent[500],
    data: transformEntry_outsideHumidity_transformed
  }
  const jsonData_insidePressure = {
    id: "insidePressure",
    color: tokens("dark").greenAccent[500],
    data: transformEntry_insidePressure_transformed
  }

  const finalData = [
    jsonData_insideTemp,
    jsonData_outsideTemp,
    jsonData_insideHumidity,
    jsonData_outsideHumidity,
    jsonData_insidePressure,
  ]
  
  return (
    <ResponsiveLine
      data={finalData}
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
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
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

export default LineChart;
