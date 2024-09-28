import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import "../../asset/css/widget/header.css"
import Toolbar from "@mui/material/Toolbar";
import {Breadcrumbs, Button, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {ManageBook} from "../book/manage-book";
import {AddCircle} from "@mui/icons-material";

export const Header: React.FC = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const addNewBook = () => {
        setShowDialog(true);
    };

    return(
        <AppBar position="fixed" className={'app-bar'}>
            <Toolbar className = {'header-container'}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className={'breadcrumbs-text app-text'}>Digital Library</Link>
                    <Typography color="text.primary" className={'breadcrumbs-text page-text'}>Books</Typography>
                </Breadcrumbs>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" className={'toolbar-btn'} onClick={addNewBook}>{<AddCircle sx={{marginRight: '10px', height: '18px', width: 'auto'}}/>}Book</Button>
                {showDialog && <ManageBook selectedBook ={null}/>}
            </Toolbar>
        </AppBar>
    );
}