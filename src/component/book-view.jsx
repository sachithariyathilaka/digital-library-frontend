import {Component} from "react";
import * as React from "react";
import "../asset/css/book-view.css";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";

export class BookView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container fixed>
                <Box className = {'view-container'}>
                    <Box className= {'data-container'}>
                        <img src={'images/logo/logo192.png'} alt='No Data'/>
                    </Box>
                </Box>
            </Container>
        );
    }
}