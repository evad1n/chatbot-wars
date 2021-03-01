import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import API from 'api';
import DeleteIcon from '@material-ui/icons/Delete';



export default function Edit() {
    const [bots, setBots] = useState([]);

    const getBots = async () => {
        let response = await API.get('/bots');
        // Should log ID here
        console.log(JSON.stringify(response.data));
        setBots(response.data);
    };

    getBots();

    return (
        <Grid container spacing={3}>
            <List component="nav" aria-label="contacts">
                {bots.map((bot, index) => (
                    <ListItem button>
                        <ListItemText primary={bot.name} />
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        </Grid >
    );
}
