import { AppBar, Grid, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import API from 'api';

export default function BotDetail({ lines, update }) {
    const [tab, setTab] = React.useState(0);
    const [bot, setBot] = useState({});
    const { id } = useParams();
    console.log(useParams());

    // Iterate over obj and get array type values and map to tabs/linetable

    // Fetch bot data
    // API.get(`/bots/${id}`);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };


    // Display as tabs of lines

    return (
        <Grid container spacing={3}>
            <AppBar position="static">
                <Tabs value={tab} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </AppBar>
            <h1 value={tab} index={0}>
                Item One
            </h1>
            <h1 value={tab} index={1}>
                Item Two
            </h1>
            <h1 value={tab} index={2}>
                Item Three
            </h1>
            {/* <List component="nav" aria-label="contacts">
                {lines.map((line, index) => (
                    <ListItem button>
                        <ListItemText primary="Chelsea Otakan" />
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List> */}
        </Grid >
    );
}
