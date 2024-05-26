import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Component} from "react";
import Typography from "@mui/material/Typography";
import {Footer} from "../widget/footer";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import "../../asset/css/navigation/side-bar.css"

export class SideBar extends Component {

    constructor() {
        super();

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.setState({
            items: ['Books']
        })
    }

    render() {
        return (
            <Box className = {'box'}>
                <Drawer
                    sx = {{
                        width: window.innerWidth * 1.5/12,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: window.innerWidth * 1.5/12,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left">
                    <Toolbar>
                        <img src={'images/logo/logo192.png'} className = {"logo"} alt='Digital Library Logo'/>
                        <Typography variant="h4" noWrap component="div">Digital Library</Typography>
                    </Toolbar>
                    <Divider />
                    <List sx = {{height: window.innerHeight - 80}}>
                        {this.state.items
                            .map((text, index) => (
                            <ListItem className = {'list-item'} key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LibraryBooksIcon/>
                                    </ListItemIcon>
                                    <ListItemText className={'list-item-text'} primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Footer />
                </Drawer>
            </Box>
        );
    }
}
