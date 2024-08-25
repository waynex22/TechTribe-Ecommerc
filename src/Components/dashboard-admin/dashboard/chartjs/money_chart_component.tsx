import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { useGetUserByMonthQuery } from 'src/redux/rtkQuery/user_customers';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
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
    fill: boolean;
    tension: number
  }[];
}

const MoneyLineChart: React.FC = () => {
  const [userJanuary, setUserJanuary] = useState<any>(0)
    const {data:userMonthJanuary} = useGetUserByMonthQuery({year: 2024, month:1})
    const [userFebruary, setUserFebruary] = useState<any>(0)
    const {data:userMonthFebruary} = useGetUserByMonthQuery({year: 2024, month:2})
    const [userMarch, setUserMarch] = useState<any>(0)
    const {data:userMonthMarch} = useGetUserByMonthQuery({year: 2024, month:3})
    const [userApril, setUserApril] = useState<any>(0)
    const {data:userMonthApril} = useGetUserByMonthQuery({year: 2024, month:4})
    const [userMay, setUserMay] = useState<any>(0)
    const {data:userMonthMay} = useGetUserByMonthQuery({year: 2024, month:5})
    const [userJune, setUserJune] = useState<any>(0)
    const {data:userMonthJune} = useGetUserByMonthQuery({year: 2024, month:6})
    const [userJuly, setUserJuly] = useState<any>(0)
    const {data:userMonthJuly} = useGetUserByMonthQuery({year: 2024, month:7})
    const [userAugust, setUserAugust] = useState<any>(0)
    const {data:userMonthAugust} = useGetUserByMonthQuery({year: 2024, month:8})
    const [userSeptember, setUserSeptember] = useState<any>(0)
    const {data:userMonthSeptember} = useGetUserByMonthQuery({year: 2024, month:9})
    const [userOctober, setUserOctober] = useState<any>(0)
    const {data:userMonthOctober} = useGetUserByMonthQuery({year: 2024, month:10})
    const [userNovember, setUserNovember] = useState<any>(0)
    const {data:userMonthNovember} = useGetUserByMonthQuery({year: 2024, month:11})
    const [userDecember, setUserDecember] = useState<any>(0)
    const {data:userMonthDecember} = useGetUserByMonthQuery({year: 2024, month:12})
    useEffect(() => {
        if(userMonthMay && userMonthJune && userMonthJuly && userMonthAugust) {
            setUserMay(userMonthMay)
            setUserJune(userMonthJune)
            setUserJuly(userMonthJuly)
            setUserAugust(userMonthAugust)
        }
        console.log("userMay", userMay);
        console.log("userMonthJune", userMonthJune);
        console.log("userMonthJuly", userMonthJuly);
        console.log("userMonthAugust", userMonthAugust);
    }, [userMonthMay,userMay,userMonthJune,userMonthJuly,userMonthAugust])
  // Định nghĩa dữ liệu của biểu đồ
  const data: ChartData = {
    labels: ['January','February','March','April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Monthly Money',
        data: [20, 40, 10, 0, 33, 12, 50, 90, 5, 23,98,12],
        backgroundColor: 'rgba(255, 90, 31, 0.2)',
        borderColor: 'rgba(255, 90, 31, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
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
    interaction: {
      intersect: false,
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
          text: 'Money',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: function (value: number | string) {
            return typeof value === 'number' ? value.toString() + ' Tr' : value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Line Chart Money</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MoneyLineChart;
