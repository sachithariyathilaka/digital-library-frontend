export class Column {
    id: string
    label: string
    align: string
    format: any


    constructor(id, label, align, format) {
        this.id = id;
        this.label = label;
        this.align = align;
        this.format = format;
    }
}