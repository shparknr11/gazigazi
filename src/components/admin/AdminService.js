import { ResponsiveLine } from "@nivo/line";
import React from "react";

const AdminService = () => {
  const data = [
    {
      id: "norway",
      color: "hsl(107, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 117,
        },
        {
          x: "helicopter",
          y: 214,
        },
        {
          x: "boat",
          y: 64,
        },
        {
          x: "train",
          y: 166,
        },
        {
          x: "subway",
          y: 24,
        },
        {
          x: "bus",
          y: 171,
        },
        {
          x: "car",
          y: 281,
        },
        {
          x: "moto",
          y: 192,
        },
        {
          x: "bicycle",
          y: 188,
        },
        {
          x: "horse",
          y: 201,
        },
        {
          x: "skateboard",
          y: 165,
        },
        {
          x: "others",
          y: 136,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>📉📈📊AdminService</h1>
      <div style={{ width: "1000px", height: "400px" }}>
        <ResponsiveLine
          data={data}
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
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          lineWidth={3}
          pointSize={5}
          pointColor={{ theme: "background" }}
          pointBorderWidth={4}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          areaOpacity={0}
          enableTouchCrosshair={true}
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
      </div>
    </div>
  );
};

export default AdminService;
