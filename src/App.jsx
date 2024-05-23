import * as React from 'react';
import {Component} from "react";
import {Header} from "./component/header";
import {Grid} from "@mui/material";
import {SideBar} from "./component/side-bar";
import BookTable from "./component/book-table";
import Toolbar from "@mui/material/Toolbar";
import {EmptyView} from "./component/empty-view";

class App extends Component {

    constructor(props, context)
    {
        super(props, context);
    }

    render(){
    return(
        <div>
            <Header/>
            <Grid container sx ={{height: window.innerHeight - 50}}>
                <Grid item xs={1.5}>
                    <SideBar/>
                </Grid>
                <Grid item xs={6.5}>
                    <Toolbar/>
                    <BookTable/>
                </Grid>
                <Grid item xs={4}>
                    <Toolbar/>
                    <EmptyView/>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default App;
