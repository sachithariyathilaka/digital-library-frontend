import {Component} from "react";
import {Column} from "../resource/column";
import axios from "axios";
import {baseurl} from "../resource/api-endpoints";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import "../asset/css/book-table.css"

class BookTable extends Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            columns: [],
            books: []
        }
    }

    loadColumns() {
        let columns = [];
        columns.push(new Column("title", "Title", 'left', (value) => value.toLocaleString('en-US')));
        columns.push(new Column("author", "Author", 'left', (value) => value.toLocaleString('en-US')));
        columns.push(new Column("origin", "Origin", 'left', (value) => value.toLocaleString('en-US')));
        columns.push(new Column("quantity", "Quantity", 'left', (value) => value.toLocaleString('en-US')));
        columns.push(new Column("version", "Version", 'left', (value) => value.toLocaleString('en-US')));
        columns.push(new Column("createdDate", "Created Date", 'left', (value) => new Date(value).toDateString()));

        return columns;
    }

    componentDidMount()
    {
        this.setState({columns: this.loadColumns()})

        axios.get(baseurl)
            .then(res => {
                let apiResponse = res.data;
                if (apiResponse.code === 200)
                    this.setState({books: apiResponse.data})
                else
                    alert(apiResponse.message)
            })
            .catch(error => {
                console.log(error)
            });
    }

    render(){
        return(
            <TableContainer className = {'table'}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {this.state.columns.map((column) => (
                                <TableCell className = {'table-header'} key={column.id} align={column.align}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.books
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {this.state.columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell className = {'table-data'} key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default BookTable;