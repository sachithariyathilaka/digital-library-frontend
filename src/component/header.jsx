import {Component} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

export class Header extends Component {

    sidebarWidth = window.innerWidth * 1.5/12;

    render() {
        return(
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${this.sidebarWidth}px)`}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawerrr
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}