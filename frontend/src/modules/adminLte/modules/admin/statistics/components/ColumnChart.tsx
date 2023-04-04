import ReactApexChart from "react-apexcharts"


const ColumnChart = () => {

  const periodData = [
    {
      name: "Desarrollo tecnologico",
      data: [44, 55, 41, 67, 12, 76, 16, 43, 18, 24, 33, 45]
    },
    {
      name: "Emprendimiento",
      data: [3, 12, 34, 7, 27, 18, 14, 23, 11, 13, 25, 21]
    },
    {
      name: "Investigación",
      data: [10, 11, 7, 15, 21, 12, 8, 9, 18, 12, 20, 17]
    },
    {
      name: "Mogografía",
      data: [10, 11, 7, 15, 21, 12, 8, 9, 18, 12, 20, 17]
    },
  ]
  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: 1
      },
      zoom: {
        enabled: !0
      }
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "15%",
        endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: !1
    },
    xaxis: {
      show: true,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      labels: {
        show: true
      }
    },
    colors: ["#0B4A75", "#c3d730", "#8E989D", "#FF4633"],
    legend: {
      position: "bottom"
    },
    fill: {
      opacity: 1
    }
  }

  return (
    <>
      <ReactApexChart
        options={options as any}
        series={[...periodData]}
        type="bar"
        height="359"
        className="apex-charts"
      />
    </>
  )
}

export default ColumnChart;