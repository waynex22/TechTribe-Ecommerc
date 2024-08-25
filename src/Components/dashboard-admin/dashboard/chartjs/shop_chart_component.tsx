import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useGetShopByMonthQuery } from 'src/redux/rtkQuery/admin';

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

const ShopBarChart: React.FC = () => {
    const [shopJanuary, setshopJanuary] = useState<any>(0)
    const {data:shopMonthJanuary} = useGetShopByMonthQuery({year: 2024, month:1})
    const [shopFebruary, setshopFebruary] = useState<any>(0)
    const {data:shopMonthFebruary} = useGetShopByMonthQuery({year: 2024, month:2})
    const [shopMarch, setshopMarch] = useState<any>(0)
    const {data:shopMonthMarch} = useGetShopByMonthQuery({year: 2024, month:3})
    const [shopApril, setshopApril] = useState<any>(0)
    const {data:shopMonthApril} = useGetShopByMonthQuery({year: 2024, month:4})
    const [shopMay, setshopMay] = useState<any>(0)
    const {data:shopMonthMay} = useGetShopByMonthQuery({year:2024, month: 5})
    const [shopJune, setshopJune] = useState<any>(0)
    const {data:shopMonthJune} = useGetShopByMonthQuery({year: 2024, month:6})
    const [shopJuly, setshopJuly] = useState<any>(0)
    const {data:shopMonthJuly} = useGetShopByMonthQuery({year: 2024, month:7})
    const [shopAugust, setshopAugust] = useState<any>(0)
    const {data:shopMonthAugust} = useGetShopByMonthQuery({year: 2024, month:8})
    const [shopSeptember, setshopSeptember] = useState<any>(0)
    const {data:shopMonthSeptember} = useGetShopByMonthQuery({year: 2024, month:9})
    const [shopOctober, setshopOctober] = useState<any>(0)
    const {data:shopMonthOctober} = useGetShopByMonthQuery({year: 2024, month:10})
    const [shopNovember, setshopNovember] = useState<any>(0)
    const {data:shopMonthNovember} = useGetShopByMonthQuery({year: 2024, month:11})
    const [shopDecember, setshopDecember] = useState<any>(0)
    const {data:shopMonthDecember} = useGetShopByMonthQuery({year: 2024, month:12})
    useEffect(() => {
        if(shopMonthMay && shopMonthJune && shopMonthJuly && shopMonthAugust) {
            setshopMay(shopMonthMay)
            setshopJune(shopMonthJune)
            setshopJuly(shopMonthJuly)
            setshopAugust(shopMonthAugust)
        }
        console.log("shopMay", shopMay);
        console.log("shopMonthJune", shopMonthJune);
        console.log("shopMonthJuly", shopMonthJuly);
        console.log("shopMonthAugust", shopMonthAugust);
    }, [shopMonthMay,shopMonthJune,shopMonthJuly,shopMonthAugust])
  // Định nghĩa dữ liệu của biểu đồ
  const data: ChartData = {
    labels: ['January','February','March','April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [shopJanuary,shopFebruary,shopMarch,shopApril,shopMay, shopJune, shopJuly,shopAugust,shopSeptember,shopOctober,shopNovember,shopDecember],
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
        borderRadius: 5,
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
          text: 'Shop',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          callback: function (value: number | string) {
            return typeof value === 'number' ? value.toString() + ' Shop' : value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart Shop</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ShopBarChart;
