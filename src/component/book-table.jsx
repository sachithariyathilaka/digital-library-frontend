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
import {Alert, Backdrop, CircularProgress} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

class BookTable extends Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            columns: [],
            books: [],
            loaded: false,
            error: ''
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
                    this.setState({error: apiResponse.message})

                setTimeout(()=> {this.setState({loaded: true})}, 1000);
            })
            .catch(error => {
                console.log(error)
            });
    }

    render(){
        return(
            [
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
                </TableContainer>,
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!this.state.loaded}>
                    <CircularProgress color="inherit" size={75} />
                </Backdrop>,
                <Snackbar anchorOrigin= {{vertical: 'top', horizontal: 'center'}} open={this.state.error !== '' && !this.state.loaded}>
                    <Alert className={'alert'} severity="error" variant="filled">{this.state.error}</Alert>
                </Snackbar>
            ]
        );
    }
}

export default BookTable;