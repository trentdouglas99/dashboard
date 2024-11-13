import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from 'react';
import { timeFormat } from 'd3-time-format';

const CombinedTemperature = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('http://192.168.0.28:8000/all');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const jsonData = await response.json();
          const updatedData = jsonData.map((entry) => {
            const date = new Date(entry.Current_Time);
            
            // Extract components for the desired format
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            
            const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            
            // Create a new Date object with the formatted date
            const date2 = new Date(formattedDate);
            
            // Set seconds to 0
            date2.setSeconds(0);
            
            // Get ISO string
            const isoString = date2.toISOString();
            
            // Return the updated entry with the new Current_Time
            return {
              ...entry,
              Current_Time: isoString,  // Update the Current_Time key
            };
          });
          setData(updatedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.0.25:8000/all');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const jsonData = await response.json();
            const updatedPlantData = jsonData.map((entry) => {
              const date = new Date(entry.Current_Time);
              date.setSeconds(0);
              
              // Get ISO string
              const isoString = date.toISOString();
              
              // Return the updated entry with the new Current_Time
              return {
                ...entry,
                Current_Time: isoString,  // Update the Current_Time key
              };
            });
            setPlantData(updatedPlantData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);


    const filteredData = data.filter((entry) =>
      plantData.some((plantEntry) => plantEntry.Current_Time === entry.Current_Time)
    );
    
    const filteredPlantData = plantData.filter((entry) =>
      data.some((dataEntry) => dataEntry.Current_Time === entry.Current_Time)
    );

    
    // Function to transform each entry
    const transformEntry_outsideTemp = (entry) => {
      return {
        x: entry.Current_Time,  // Now in "YYYY-MM-DDTHH:mm:ss" format
        y: entry.Outside_Temperature,
      };
  };
  
    let transformEntry_outsideTemp_transformed = filteredData.map(transformEntry_outsideTemp);
  
    const transformEntry_insideTemp = (entry) => {
      return {
        x: entry.Current_Time,  // Now in "YYYY-MM-DDTHH:mm:ss" format
        y: entry.Inside_Temperature,
      };
    };
    
    let transformEntry_insideTemp_transformed = filteredData.map(transformEntry_insideTemp);

    const transformEntry_plantTemp = (entry) => {
      return {
        x: entry.Current_Time,
        y: entry.Temperature,
      };
    };
  
    let transformEntry_plantTemp_transformed = filteredPlantData.map(transformEntry_plantTemp);

    const jsonData_outsideTemp = [
        {
          id: "Inside Temperature",
          color: tokens("dark").greenAccent[500],
          data: transformEntry_insideTemp_transformed
        },
        {
          id: "Outside Temperature",
          color: tokens("dark").greenAccent[500],
          data: transformEntry_outsideTemp_transformed
        },
        {
          id: "Plant Temperature",
          color: tokens("dark").greenAccent[500],
          data: transformEntry_plantTemp_transformed
        }
    ]

    
    
    return (
      <ResponsiveLine
        data={jsonData_outsideTemp}
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
        margin={{ top: 10, right: 10, bottom: 5, left: 50 }}
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
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 20,
          legendOffset: 70,
          legendPosition: "middle",
          legend: isDashboard ? undefined : "Time",
          legendStyle: "bold",
          tickValues: "every 1 hour",  // Specify the interval of ticks
          format: timeFormat("%Y-%m-%dT%H:%M:%S")  // d3.timeFormat to format time
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5, // added
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Temperature (Fahrenheit)", // added
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
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 130,
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

export default CombinedTemperature;
