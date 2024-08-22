import { ResponsiveLine } from "@nivo/line";
import React from "react";

const AdminService = () => {
  const data = [
    {
      id: "통계",
      color: "hsl(107, 70%, 50%)",
      data: [
        {
          x: "8월 22일",
          y: 117,
        },
        {
          x: "8월 23일",
          y: 214,
        },
        {
          x: "8월 24일",
          y: 64,
        },
        {
          x: "8월 25일",
          y: 166,
        },
        {
          x: "8월 26일",
          y: 24,
        },
        {
          x: "8월 27일",
          y: 171,
        },
        {
          x: "8월 28일",
          y: 281,
        },
        {
          x: "8월 29일",
          y: 192,
        },
        {
          x: "8월 30일",
          y: 188,
        },
        {
          x: "8월 31일",
          y: 201,
        },
        {
          x: "9월 01일",
          y: 165,
        },
        {
          x: "9월 02일",
          y: 136,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>📊AdminService (구현 예정인 페이지 입니다.)</h1>
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
            legend: "날짜",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "갯수",
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
