export class Column {
    id: string
    label: string
    format: any

    constructor(id, label, format) {
        this.id = id;
        this.label = label;
        this.format = format;
    }
}