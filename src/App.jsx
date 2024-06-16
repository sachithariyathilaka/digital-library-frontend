import * as React from 'react';
import {Component} from "react";
import {Header} from "./component/widget/header";
import {Grid} from "@mui/material";
import {SideBar} from "./component/navigation/side-bar";
import BookPage from "./component/book/book-page";
import Toolbar from "@mui/material/Toolbar";

class App extends Component {

    constructor(props, context)
    {
        super(props, context);
    }

    render(){
    return(
        <div>
            <Header/>
            <Grid container>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs={10}>
                    <Toolbar/>
                    <BookPage/>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default App;
