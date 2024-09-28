import React from 'react';
import ReactDOM from 'react-dom/client';
import {Header} from "./component/widget/header";
import {Grid} from "@mui/material";
import {SideBar} from "./component/navigation/side-bar";
import Toolbar from "@mui/material/Toolbar";
import {BookPage} from "./page/book-page";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
