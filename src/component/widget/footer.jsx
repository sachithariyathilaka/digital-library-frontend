import {Component} from "react";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../../asset/css/widget/footer.css";

export class Footer extends Component {

    render() {
        return(
            <Toolbar>
                <Typography className = 'footer' variant = "p" noWrap component = "div">Developed By ByteGen Technologies @ 2024</Typography>
            </Toolbar>
        );
    }
}