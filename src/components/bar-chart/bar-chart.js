import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const GroupedBarChart = ({ data }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 600,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: 20,
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 8,
        colors: ["transparent"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
    },
  });

  useEffect(() => {
    // Update series and categories when data changes
    setChartState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Oscar Nominations",
          data: data?.map((d) => d.oscar_nominations) || [],
        },
        {
          name: "Oscar Wins",
          data: data?.map((d) => d.oscar_winning) || [],
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: data?.map((d) => d.title) || [],
        },
      },
    }));
  }, [data]);

  return (
    <Chart
      options={chartState.options}
      series={chartState.series}
      type="bar"
      height={900}
    />
  );
};

export default GroupedBarChart;
