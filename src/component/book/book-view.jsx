import {Component} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Stack, TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "../../asset/css/book/book-view.css";
import {
    AddCircle,
    Book,
    CalendarMonth,
    DateRange, DeleteRounded,
    Description, EditRounded,
    Flag,
    NumbersTwoTone,
    Person, RemoveCircle, Storage
} from "@mui/icons-material";
import axios from "axios";
import {baseurl} from "../../resource/api-endpoints";
import Snackbar from "@mui/material/Snackbar";
import {ManageBook} from "./manage-book";

export class BookView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedBook: props.selectedBook,
            confirmDialog: false,
            items: [
                {
                    label: 'Title',
                    icon: <Book className={'card-icon'}/>,
                    value: props.selectedBook.title
                },
                {
                    label: 'Description',
                    icon: <Description className={'card-icon'}/>,
                    value: props.selectedBook.description
                },
                {
                    label: 'Year',
                    icon: <CalendarMonth className={'card-icon'}/>,
                    value: props.selectedBook.year
                },
                {
                    label: 'Author',
                    icon: <Person className={'card-icon'}/>,
                    value: props.selectedBook.author
                },
                {
                    label: 'Origin',
                    icon: <Flag className={'card-icon'}/>,
                    value: props.selectedBook.origin
                },
                {
                    label: 'Quantity',
                    icon:  <Storage className={'card-icon'}/>,
                    value: props.selectedBook.quantity
                },
                {
                    label: 'Created',
                    icon:  <DateRange className={'card-icon'}/>,
                    value: new Date(props.selectedBook.createdDate).toDateString()
                },
                {
                    label: 'Version',
                    icon:   <NumbersTwoTone className={'card-icon'}/>,
                    value: props.selectedBook.version
                }
            ],
            snackbar: {
                type: '',
                message: ''
            },
            loader: false,
            manageDialog: false
        }
    }

    deleteBook = () => {
        this.setState({confirmDialog: true});
    }

    closeDialog = () => {
        this.setState({confirmDialog: false});
    }

    confirmDelete = () => {
        this.setState({loader: true})

        axios.delete(baseurl + "?id=" + this.state.selectedBook._id)
            .then(res => {
                let apiResponse = res.data;
                if (apiResponse.code === 200) {
                    this.setState({snackbar: {message: apiResponse.message, type: 'success'}})
                    this.closeDialog()
                    setTimeout(() => {window.location.reload()}, 1)
                } else
                    this.setState({snackbar: {message: apiResponse.message, type: 'error'}})
            })
            .catch(error => {
                console.log(error)
            });
    }

    updateBook = () => {
        this.setState({manageDialog: true})
    }

    render() {
        return(
            <Container>
                <Box className="view-container">
                    <Box className="data-container">
                        <Box sx={{ flexGrow: 1 }}>
                            {this.state.items.map((item, index) => (
                                <Card key={index} variant="outlined" className="card" sx={{ marginBottom: '10px' }}>
                                    <CardContent className="card-content">
                                        <Grid container>
                                            <Grid item xs={0.5}>
                                                {item.icon}
                                            </Grid>
                                            <Grid item xs={1.75}>
                                                <Typography className="card-text card-title">{item.label}</Typography>
                                            </Grid>
                                            <Grid item xs={9.75}>
                                                <Typography className="card-text card-value">{item.value}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                        <Box className="action-container">
                            <Button variant="contained" className="btn danger-btn" onClick={this.deleteBook}>Delete</Button>
                            <Button variant="contained" className="btn success-btn update-btn" onClick={this.updateBook}>Update</Button>
                        </Box>
                    </Box>
                </Box>
                <Dialog open={this.state.confirmDialog} onClose={this.closeDialog} className={'dialog'}>
                    <DialogTitle className={'dialog-title'}>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography className={'confirm-text'}>Do you want to delete the book?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" className={'btn danger-btn'} onClick={this.closeDialog}>Cancel</Button>
                        {!this.state.loader ?
                            <Button variant="contained" className={'btn success-btn btn-group'} onClick={this.confirmDelete}>Confirm</Button> :
                            <Button variant="contained" className={'btn success-btn btn-group'}><CircularProgress size={20}/></Button>
                        }
                    </DialogActions>
                </Dialog>
                <Snackbar anchorOrigin= {{vertical: 'top', horizontal: 'center'}} open={this.state.snackbar.type !== ''}>
                    <Alert className={'alert'} severity={this.state.snackbar.type} variant="filled">{this.state.snackbar.message}</Alert>
                </Snackbar>
                {this.state.manageDialog && <ManageBook selectedBook ={this.state.selectedBook}/>}
            </Container>
        );
    }
}