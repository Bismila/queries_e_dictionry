import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from '@emotion/styled';
import { Bar } from 'react-chartjs-2';
import { ChartType } from '../store/Types';
import { observer } from 'mobx-react-lite';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface IChartProps {
    data: number[];
}

const ChartWrapper = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const Chart: React.FC<IChartProps> = (props) => {

    const options = () => {
        return {
            type: 'bar',
            responsive: true,
            plugins: {
                    legend: {
                        position: 'bottom' as const,
                },
                title: {
                    display: true,
                    text: 'Dictionary count of words',
                }
            },
        }
    };

    const chartData = () => {
        return {
            labels: [
                'start letter',
                'start letters',
                'end letter',
                'letter times',
                'repeat letters',
            ],
            datasets: [{
                label: 'Search letters into the Dictionary',
                data: props.data,
                backgroundColor: 'rgba(83, 92, 83, .65)',
                
            }],
        }
    }

    const [chartOptions, setChartOptions] = useState({});
    const [chart, setChart] = useState<ChartType>(chartData());
    
    useEffect(() => {
        setChartOptions(options)
    }, []);

    useEffect(() => {
        setChart(chartData);
    },[props.data]);
    
    return (
        <ChartWrapper>
            <Bar options={chartOptions} data={chart} />
        </ChartWrapper>
    )
} 

export default observer(Chart);