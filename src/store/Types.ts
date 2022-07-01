export type Word = {
    id: number;
    name: string;
}

export type Datasets = {
    label: string;
    data: number[];
    backgroundColor: string;
}
export type ChartType = {
    labels: string[];
    datasets: Datasets[];
}