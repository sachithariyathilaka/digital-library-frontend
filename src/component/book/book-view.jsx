import {Component} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import {Card, CardContent, Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import "../../asset/css/book/book-view.css";
import {
    CalendarMonth,
    DateRange,
    Description,
    Flag,
    NumbersTwoTone,
    Pages,
    Person, Storage
} from "@mui/icons-material";

export class BookView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    label: 'Title',
                    icon: <Description className={'card-icon'}/>,
                    value: props.selectedBook.title
                },
                {
                    label: 'Description',
                    icon: <Pages className={'card-icon'}/>,
                    value: props.selectedBook.description
                },
                {
                    label: 'Year',
                    icon: <CalendarMonth className={'card-icon'}/>,
                    value: props.selectedBook.year
                },
                {
                    label: 'Author',
                    icon: <Person className={'card-icon'}/>,
                    value: props.selectedBook.author
                },
                {
                    label: 'Origin',
                    icon: <Flag className={'card-icon'}/>,
                    value: props.selectedBook.origin
                },
                {
                    label: 'Quantity',
                    icon:  <Storage className={'card-icon'}/>,
                    value: props.selectedBook.quantity
                },
                {
                    label: 'Created',
                    icon:  <DateRange className={'card-icon'}/>,
                    value: new Date(props.selectedBook.createdDate).toDateString()
                },
                {
                    label: 'Version',
                    icon:   <NumbersTwoTone className={'card-icon'}/>,
                    value: props.selectedBook.version
                }
            ]
        }
    }

    render() {
        return(
            <Container fixed>
                <Box className = {'view-container'}>
                    <Box className= {'data-container'}>
                        <Box sx={{padding: '15px'}}>
                            {
                                this.state.items.map((item) => (
                                    <Card variant="outlined" className={'card'}>
                                        <CardContent className={'card-content'}>
                                            <Grid container>
                                                <Grid item xs={0.6}>
                                                    {item.icon}
                                                </Grid>
                                                <Grid item xs={1.4}>
                                                    <Typography className={'card-text card-title'}>{item.label}</Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography className={'card-text card-value'}>{item.value}</Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
            </Container>
        );
    }
}