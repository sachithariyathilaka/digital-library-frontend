import {Component} from "react";
import {Column} from "../resource/column";
import axios from "axios";
import {loadBooksUrl} from "../resource/api-endpoints";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {Header} from "./header";

class BookTable extends Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            books: []
        }

        this.loadConfig();
    }

    loadConfig() {
        this.columns = [];
        this.columns.push(new Column("title", "Title", 'left', (value) => value.toLocaleString('en-US')));
        this.columns.push(new Column("author", "Author", 'left', (value) => value.toLocaleString('en-US')));
        this.columns.push(new Column("origin", "Origin", 'left', (value) => value.toLocaleString('en-US')));
        this.columns.push(new Column("quantity", "Quantity", 'left', (value) => value.toLocaleString('en-US')));
        this.columns.push(new Column("version", "Version", 'left', (value) => value.toLocaleString('en-US')));
        this.columns.push(new Column("createdDate", "Created Date", 'left', (value) => value.toString()));
    }

    componentDidMount()
    {
        axios.get(loadBooksUrl)
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: window.innerHeight }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}>
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
                                            {this.columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}

export default BookTable;