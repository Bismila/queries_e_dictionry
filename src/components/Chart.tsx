import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import styled from '@emotion/styled';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChartType } from '../store/Types';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Container = styled.div`
    padding: 1rem 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem 0.5rem;
    align-items: center;
    justify-content: center;
`;

const ButtonPosition = styled.div`
    flex-grow: 0;
    padding: 0 .25rem
`;

const Button = styled.button`
    width: 6rem;
    padding: 0.5rem 1rem;
    border: rgba(83, 92, 83);
    border-radius: 3px;
    background-color: rgba(83, 92, 83, .65);
    color: #ffffff;
`;

const Text = styled.span`
    padding: 0 0.5rem;
`;

const ChartWrapperBar = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const ChartWrapperDiagram = styled.div`
    max-width: 500px;
    margin: 0 auto;
    
    @media (max-width: 650px) {
        transform: scale(.9);

    }
`;

interface IChartProps {
    data: number[];
}

const Chart: React.FC<IChartProps> = (props) => {
    
    const [isBarChartVisible, setIsBarChartVisible] = useState(true)

    const options = () => {
        return {
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
                backgroundColor: [
                    'rgba(83, 92, 83, .65)',
                    'rgba(154,205,50, .85)',
                    'rgba(34, 139, 143, .65)',
                    'rgba(60, 179, 113, .35)',
                    'rgba(173,255,47, .65)'
                ],
                
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
        <Container>
            <ButtonWrapper>
                {/* <Text>Select chart type:</Text> */}
                {!isBarChartVisible && <Text>Start checking</Text>}
                <ButtonPosition>
                    <Button onClick={() => setIsBarChartVisible(true)}>Bar</Button>
                </ButtonPosition>
                <ButtonPosition>
                    <Button onClick={() => setIsBarChartVisible(false)}>Diagram</Button>
                </ButtonPosition>
            </ButtonWrapper>
            {
                !isBarChartVisible ? (
                    <ChartWrapperDiagram>
                        <Doughnut data={chart} />
                    </ChartWrapperDiagram>
                ) : (
                    <ChartWrapperBar>
                        <Bar options={chartOptions} data={chart} />
                    </ChartWrapperBar>
                )
            }
        </Container>
    )
} 

export default Chart;