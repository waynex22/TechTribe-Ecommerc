import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useGetProductByMonthQuery } from 'src/redux/rtkQuery/admin';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderRadius: number
  }[];
}

const ProductBarChart: React.FC = () => {
    const [productJanuary, setproductJanuary] = useState<any>(0)
    const {data:productMonthJanuary} = useGetProductByMonthQuery({year: 2024, month:1})
    const [productFebruary, setproductFebruary] = useState<any>(0)
    const {data:productMonthFebruary} = useGetProductByMonthQuery({year: 2024, month:2})
    const [productMarch, setproductMarch] = useState<any>(0)
    const {data:productMonthMarch} = useGetProductByMonthQuery({year: 2024, month:3})
    const [productApril, setproductApril] = useState<any>(0)
    const {data:productMonthApril} = useGetProductByMonthQuery({year: 2024, month:4})
    const [productMay, setproductMay] = useState<any>(0)
    const {data:productMonthMay} = useGetProductByMonthQuery({year:2024, month: 5})
    const [productJune, setproductJune] = useState<any>(0)
    const {data:productMonthJune} = useGetProductByMonthQuery({year: 2024, month:6})
    const [productJuly, setproductJuly] = useState<any>(0)
    const {data:productMonthJuly} = useGetProductByMonthQuery({year: 2024, month:7})
    const [productAugust, setproductAugust] = useState<any>(0)
    const {data:productMonthAugust} = useGetProductByMonthQuery({year: 2024, month:8})
    const [productSeptember, setproductSeptember] = useState<any>(0)
    const {data:productMonthSeptember} = useGetProductByMonthQuery({year: 2024, month:9})
    const [productOctober, setproductOctober] = useState<any>(0)
    const {data:productMonthOctober} = useGetProductByMonthQuery({year: 2024, month:10})
    const [productNovember, setproductNovember] = useState<any>(0)
    const {data:productMonthNovember} = useGetProductByMonthQuery({year: 2024, month:11})
    const [productDecember, setproductDecember] = useState<any>(0)
    const {data:productMonthDecember} = useGetProductByMonthQuery({year: 2024, month:12})
    useEffect(() => {
        if(productMonthMay && productMonthJune && productMonthJuly && productMonthAugust) {
            setproductMay(productMonthMay)
            setproductJune(productMonthJune)
            setproductJuly(productMonthJuly)
            setproductAugust(productMonthAugust)
        }
        console.log("productMay", productMay);
        console.log("productMonthJune", productMonthJune);
        console.log("productMonthJuly", productMonthJuly);
        console.log("productMonthAugust", productMonthAugust);
    }, [productMonthMay,productMonthJune,productMonthJuly,productMonthAugust])
  // Định nghĩa dữ liệu của biểu đồ
  const data: ChartData = {
    labels: ['January','February','March','April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [productJanuary,productFebruary,productMarch,productApril,productMay, productJune, productJuly,productAugust,productSeptember,productOctober,productNovember,productDecember],
        backgroundColor: 'rgba(14 ,159 ,110, 0.2)',
        borderColor: 'rgba(14 ,159 ,110, 1)',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };

  // Định nghĩa các tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'product',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          callback: function (value: number | string) {
            return typeof value === 'number' ? value.toString() + ' product' : value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart product</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductBarChart;
