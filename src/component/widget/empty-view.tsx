import * as React from "react";
import "../../asset/css/widget/empty-view.css";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";

export const EmptyView: React.FC = ()=> {
    return (
        <Container fixed>
            <Box className = {'view-container'}>
                <Box className= {'data-container empty-container'}>
                    <img src={'images/icon/no-data.svg'} alt='No Data'/>
                </Box>
            </Box>
        </Container>
    );
}