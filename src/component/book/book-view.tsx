import {useState} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container, Dialog, DialogActions,
    DialogContent, DialogTitle,
    Grid
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "../../asset/css/book/book-view.css";
import {
    Book,
    CalendarMonth,
    DateRange, Description, Flag,
    NumbersTwoTone,
    Person, Storage
} from "@mui/icons-material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import {config} from "../../config";
import {ManageBook} from "./manage-book";

export const BookView: React.FC<any> = ({selectedBook}) => {
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [snackbar, setSnackbar] = useState<{ type: string; message: string }>({ type: '', message: '' });
    const [loader, setLoader] = useState(false);
    const [manageDialog, setManageDialog] = useState(false);

    const items = [
        { label: 'Title', icon: <Book className={'card-icon'} />, value: selectedBook.title },
        { label: 'Description', icon: <Description className={'card-icon'} />, value: selectedBook.description },
        { label: 'Year', icon: <CalendarMonth className={'card-icon'} />, value: selectedBook.year },
        { label: 'Author', icon: <Person className={'card-icon'} />, value: selectedBook.author },
        { label: 'Origin', icon: <Flag className={'card-icon'} />, value: selectedBook.origin },
        { label: 'Quantity', icon: <Storage className={'card-icon'} />, value: selectedBook.quantity },
        { label: 'Created', icon: <DateRange className={'card-icon'} />, value: new Date(selectedBook.createdDate).toDateString() },
        { label: 'Version', icon: <NumbersTwoTone className={'card-icon'} />, value: selectedBook.version },
    ];

    const deleteBook = () => {
        setConfirmDialog(true);
    };

    const closeDialog = () => {
        setConfirmDialog(false);
    };

    const confirmDelete = () => {
        setLoader(true);

        axios.delete(config.baseUrl + '/' + selectedBook._id)
            .then(res => {
                let apiResponse = res.data;

                if (apiResponse.code === 200) {
                    setSnackbar({ message: apiResponse.message, type: 'success' });
                    closeDialog();
                    setTimeout(() => { window.location.reload() }, 1000);
                } else
                    setSnackbar({ message: apiResponse.message, type: 'error' });
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const updateBook = () => {
        setManageDialog(true);
    };

    return (
        <Container>
            <Box className="view-container">
                <Box className="data-container">
                    <Box sx={{ flexGrow: 1 }}>
                        {items.map((item, index) => (
                            <Card key={index} variant="outlined" className="card" sx={{ marginBottom: '10px' }}>
                                <CardContent className="card-content">
                                    <Grid container>
                                        <Grid item xs={1}>
                                            {item.icon}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography className="card-text card-title">{item.label}</Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography className="card-text card-value">{item.value}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Box className="action-container">
                        <Button variant="contained" className="btn danger-btn" onClick={deleteBook}>Delete</Button>
                        <Button variant="contained" className="btn success-btn update-btn" onClick={updateBook}>Update</Button>
                    </Box>
                </Box>
            </Box>
            <Dialog open={confirmDialog} onClose={closeDialog} className={'dialog'}>
                <DialogTitle className={'dialog-title'}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography className={'confirm-text'}>Do you want to delete the book?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className={'btn danger-btn'} onClick={closeDialog}>Cancel</Button>
                    {!loader ?
                        <Button variant="contained" className={'btn success-btn btn-group'} onClick={confirmDelete}>Confirm</Button> :
                        <Button variant="contained" className={'btn success-btn btn-group'}><CircularProgress size={20}/></Button>
                    }
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin= {{vertical: 'top', horizontal: 'center'}} open={snackbar.type !== ''}>
                <Alert className={'alert'} severity={snackbar.type as 'success' | 'error' | 'info' | 'warning'} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
            {manageDialog && <ManageBook selectedBook ={selectedBook}/>}
        </Container>
    );
};