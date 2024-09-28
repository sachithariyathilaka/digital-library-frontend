export interface Column {
    id: string;
    label: string;
    format: (value: any) => any;
}