import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../../asset/css/widget/footer.css";

export const Footer: React.FC = () => {
    return(
        <Toolbar>
            <Typography className = 'footer' noWrap component = "div">Developed By Sachith Ariyathilaka</Typography>
        </Toolbar>
    );
}