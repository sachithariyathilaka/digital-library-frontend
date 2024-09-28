import {useEffect, useState} from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import "../asset/css/book/book-page.css"
import {Alert, Backdrop, CircularProgress, Grid} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import {BookView} from "../component/book/book-view";
import {EmptyView} from "../component/widget/empty-view";
import {config} from "../config";
import {Column} from "../resource/column";
import {Book} from "../resource/book";

export const BookPage: React.FC = () => {

    const [columns] = useState<Column[]>([
        {id: 'title', label: 'Title', format: (value) => value.toLocaleString()},
        {id: 'author', label: 'Author', format: (value) => value.toLocaleString()},
        {id: 'origin', label: 'Origin', format: (value) => value.toLocaleString()},
        {id: 'quantity', label: 'Quantity', format: (value) => value.toLocaleString()},
        {id: 'version', label: 'Version', format: (value) => value.toLocaleString()},
        {id: 'createdDate', label: 'Created Date', format: (value) => new Date(value).toDateString()},
    ]);

    const [books, setBooks] = useState<Book[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<Book | null>(null);

    const fetchBooks = async () => {
        try {
            const res = await axios.get(config.baseUrl);
            const apiResponse = res.data;

            if (apiResponse.code === 200)
                setBooks(apiResponse.data);
            else
                setError(apiResponse.message);

            setTimeout(() => { setLoaded(true)}, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const onSelectRow = (row: Book) => { setSelectedRow(row);};

    useEffect(() => { fetchBooks()}, []);

    return (
        <Grid container className={'table'}>
            <Grid item xs={36 / 5}>
                <TableContainer className={'table'}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell className={'table-header'} key={column.id} align='left'>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                                  onClick={() => onSelectRow(row)}>
                                            {columns.map((column) => {
                                                // @ts-ignore
                                                const value = row[column.id];
                                                return (
                                                    <TableCell className={'table-data'} key={column.id + row._id}
                                                               align='left'>
                                                        {typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>,
                <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                          open={!loaded}>
                    <CircularProgress color="inherit" size={50}/>
                </Backdrop>,
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                          open={error !== '' && !loaded}>
                    <Alert className={'alert'} severity="error" variant="filled">{error}</Alert>
                </Snackbar>
            </Grid>
            <Grid item xs={24 / 5}>
                {selectedRow === null ? <EmptyView/> : <BookView selectedBook={selectedRow}/>}
            </Grid>
        </Grid>
    );
}