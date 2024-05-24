import {Component} from "react";
import * as React from "react";
import "../asset/css/manage-book.css";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import axios from "axios";
import {baseurl} from "../resource/api-endpoints";

export class ManageBook extends Component {

    constructor()
    {
        super();
        this.state = {
            open: true,
            formData: {
                title: '',
                description: '',
                year: '',
                origin: '',
                author: '',
                quantity: ''
            },
            submitted: false
        }
    }

    closeDialog = () => {
        this.setState({open: false})
        window.location.reload()
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

        axios.post(baseurl, this.state.formData)
            .then(res => {
                let apiResponse = res.data;
                if (apiResponse.code === 200) {
                    this.closeDialog()
                }

                alert(apiResponse.message)
            })
            .catch(error => {
                console.log(error)
            });
    }

    isValidInput = (id: string) => {
        return this.state.submitted && this.state.formData[id] === '';
    }

    render() {
        return(
            this.state.open ?
            <Dialog open={this.state.open} onClose={this.closeDialog}>
                <DialogTitle className={'dialog-title'}>Add New Book</DialogTitle>
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
                        variant="outlined"
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
                    <Button variant="contained" className={'btn success-btn btn-group'} onClick={this.onSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
                : null
        );
    }
}