import {useEffect, useState} from "react";
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
import "../../asset/css/book/manage-book.css";
import {config} from "../../config";

export const ManageBook: React.FC<any> = ({selectedBook}) => {
    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        origin: '',
        author: '',
        quantity: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [snackbar, setSnackbar] = useState<{ type: string; message: string }>({ type: '', message: '' });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (selectedBook) {
            setFormData({
                title: selectedBook.title,
                description: selectedBook.description,
                year: selectedBook.year.toString(),
                origin: selectedBook.origin,
                author: selectedBook.author,
                quantity: selectedBook.quantity.toString(),
            });
        }
    }, [selectedBook]);

    const closeDialog = () => {
        setOpen(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validateRequest = () => {
        return Object.values(formData).every((value) => value !== '');
    };

    const onSubmit = async () => {
        setSubmitted(true);

        if (validateRequest()) {
            setLoader(true);

            let apiResponse;
            try {
                if (!selectedBook)
                    apiResponse = await axios.post(config.baseUrl, formData);
                else {
                    const bookRequest = {...formData, version: selectedBook.version};
                    apiResponse = await axios.put(config.baseUrl + '/' + selectedBook._id, bookRequest);
                }

                const response = apiResponse.data;

                if (response.code === 200 || 201) {
                    setSnackbar({message: response.message, type: 'success'});

                    closeDialog();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else
                    setSnackbar({message: response.message, type: 'error'});
            } catch (error) {
                console.error(error);
            } finally {
                setLoader(false);
            }
        }
    }

    const isValidInput = (id: string) => {
            // @ts-ignore
        return submitted && formData[id] === '';
        };

    return (
        <>
            <Dialog open={open} onClose={closeDialog} className={'dialog'}>
                    <DialogTitle className={'dialog-title'}>Manage Book</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            label="Title"
                            value={formData.title}
                            onChange={onChange}
                            type="text"
                            fullWidth
                            error={isValidInput('title')}
                            helperText={isValidInput('title') ? 'Book title is required!' : ''}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="description"
                            label="Description"
                            value={formData.description}
                            onChange={onChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            maxRows={4}
                            error={isValidInput('description')}
                            helperText={isValidInput('description') ? 'Book description is required!' : ''}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="year"
                            label="Published Year"
                            value={formData.year}
                            onChange={onChange}
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={isValidInput('year')}
                            helperText={isValidInput('year') ? 'Book publish year is required!' : ''}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="author"
                            label="Author"
                            value={formData.author}
                            onChange={onChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={isValidInput('author')}
                            helperText={isValidInput('author') ? 'Book author is required!' : ''}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="origin"
                            label="Origin"
                            value={formData.origin}
                            onChange={onChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={isValidInput('origin')}
                            helperText={isValidInput('origin') ? 'Book origin is required!' : ''}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="quantity"
                            label="Quantity"
                            value={formData.quantity}
                            onChange={onChange}
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={isValidInput('quantity')}
                            helperText={isValidInput('quantity') ? 'Book quantity is required!' : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" className={'btn danger-btn'} onClick={closeDialog}>
                            Cancel
                        </Button>
                        {!loader ? (
                            <Button variant="contained" className={'btn success-btn btn-group'} onClick={onSubmit}>
                                Submit
                            </Button>
                        ) : (
                            <Button variant="contained" className={'btn success-btn btn-group'}>
                                <CircularProgress size={20}/>
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={snackbar.type !== ''}>
                <Alert className={'alert'} severity={snackbar.type as 'success' | 'error' | 'info' | 'warning'} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}