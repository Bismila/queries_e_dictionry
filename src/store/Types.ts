export type Word = {
    id: number;
    word: string;
}

export type Datasets = {
    label: string;
    data: number[];
    backgroundColor: string | Array<string>;
}
export type ChartType = {
    labels: string[];
    datasets: Datasets[];
}