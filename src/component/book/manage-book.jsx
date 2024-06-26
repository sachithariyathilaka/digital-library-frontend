import {Component} from "react";
import * as React from "react";
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import {baseurl} from "../../resource/api-endpoints";
import "../../asset/css/book/manage-book.css";

export class ManageBook extends Component {

    constructor(props)
    {
        super();
        this.state = {
            open: true,
            selectedBook: props.selectedBook,
            formData: {
                title: props.selectedBook != null ? props.selectedBook.title : '',
                description: props.selectedBook != null ? props.selectedBook.description : '',
                year: props.selectedBook != null ? props.selectedBook.year : '',
                origin: props.selectedBook != null ? props.selectedBook.origin : '',
                author: props.selectedBook != null ? props.selectedBook.author : '',
                quantity: props.selectedBook != null ? props.selectedBook.quantity : ''
            },
            submitted: false,
            snackbar: {
                type: '',
                message: ''
            },
            loader: false
        }
    }

    closeDialog = () => {
        this.setState({open: false})
    }

    onChange = (event) => {
        const { id, value } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [id]: value
            }
        }));
    };

    onSubmit = () => {
        this.setState({submitted: true})

        if (this.validateRequest())
        {
            this.setState({loader: true})

            if (this.state.selectedBook == null)
                axios.post(baseurl, this.state.formData)
                    .then(res => {
                        let apiResponse = res.data;
                        if (apiResponse.code === 200) {
                            this.setState({snackbar: {message: apiResponse.message, type: 'success'}, loader: false, open: false})
                            this.closeDialog()
                            setTimeout(() => {window.location.reload()}, 1)
                        } else
                            this.setState({snackbar: {message: apiResponse.message, type: 'error'}, loader: false, open: false})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            else
            {
                let bookRequest = this.state.formData
                bookRequest.version = this.state.selectedBook.version

                axios.put(baseurl + "?id=" + this.state.selectedBook._id, bookRequest)
                    .then(res => {
                        let apiResponse = res.data;
                        if (apiResponse.code === 200) {
                            this.setState({snackbar: {message: apiResponse.message, type: 'success'}, loader: false, open: false})
                            this.closeDialog()
                            setTimeout(() => {window.location.reload()}, 1)
                        } else
                            this.setState({snackbar: {message: apiResponse.message, type: 'error'}, loader: false, open: false})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        }

    }

    isValidInput = (id: string) => {
        return this.state.submitted && this.state.formData[id] === '';
    }

    validateRequest = () => {
        let isValid = true;
        for (let key in this.state.formData)
            if (this.state.formData[key] === '')
                isValid = false;

        return isValid;
    }

    render() {
        return(
            [
                this.state.open ?
                <Dialog open={this.state.open} onClose={this.closeDialog} className={'dialog'}>
                    <DialogTitle className={'dialog-title'}>Manage Book</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            label="Title"
                            value={this.state.formData.title}
                            onChange={this.onChange}
                            type="text"
                            fullWidth
                            error={this.isValidInput('title')}
                            helperText={ this.isValidInput('title') ? 'Book title is required!' : '' }
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            label="Description"
                            value={this.state.formData.description}
                            onChange={this.onChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            maxRows={4}
                            error={this.isValidInput('description')}
                            helperText={ this.isValidInput('description') ? 'Book description is required!' : '' }
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="year"
                            label="Published Year"
                            value={this.state.formData.year}
                            onChange={this.onChange}
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={this.isValidInput('year')}
                            helperText={ this.isValidInput('year') ? 'Book publish year is required!' : '' }
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="author"
                            label="Author"
                            value={this.state.formData.author}
                            onChange={this.onChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={this.isValidInput('author')}
                            helperText={ this.isValidInput('author') ? 'Book author is required!' : '' }
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="origin"
                            label="Origin"
                            value={this.state.formData.origin}
                            onChange={this.onChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={this.isValidInput('origin')}
                            helperText={ this.isValidInput('origin') ? 'Book origin is required!' : '' }
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="quantity"
                            label="Quantity"
                            value={this.state.formData.quantity}
                            onChange={this.onChange}
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={this.isValidInput('quantity')}
                            helperText={ this.isValidInput('quantity') ? 'Book quantity is required!' : '' }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" className={'btn danger-btn'} onClick={this.closeDialog}>Cancel</Button>
                        {!this.state.loader ?
                        <Button variant="contained" className={'btn success-btn btn-group'} onClick={this.onSubmit}>Submit</Button> :
                        <Button variant="contained" className={'btn success-btn btn-group'}><CircularProgress size={20}/></Button>}
                    </DialogActions>
                </Dialog> : null,
                <Snackbar anchorOrigin= {{vertical: 'top', horizontal: 'center'}} open={this.state.snackbar.type !== ''}>
                    <Alert className={'alert'} severity={this.state.snackbar.type} variant="filled">{this.state.snackbar.message}</Alert>
                </Snackbar>
            ]
        );
    }
}