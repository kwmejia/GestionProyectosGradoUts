import ReactApexChart from "react-apexcharts";

export const Metrics = () => {

  const series = [44, 55, 67, 83]
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total Ideas',
            formatter: function (w: any) {
              return 249
            }
          }
        }
      }
    },
    labels: ['Desarrollo Tecnologico', 'Monografia', 'Investigación', 'Emprendimiento'],
    colors: ["#0B4A75", "#c3d730", "#8E989D", "#FF4633"]
  }
  return (
    <div>
      <ReactApexChart
        options={options as any}
        series={series}
        type="donut"
        height={230}
        className="apex-charts"
      />
    </div>
  )
}
