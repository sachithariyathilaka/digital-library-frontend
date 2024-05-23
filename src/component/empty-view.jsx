import {Component} from "react";
import * as React from "react";
import "../asset/css/empty-view.css";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";

export class EmptyView extends Component {

    render() {
        return(
            <Container fixed>
                <Box className = {'empty-view'}>
                    <Box className= {'no-data-container'}>
                        <img src={'images/icon/no-data.svg'} alt='No Data'/>
                    </Box>
                </Box>
            </Container>
        );
    }
}