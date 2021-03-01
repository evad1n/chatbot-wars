import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';

export default function LineTable({ lines, update }) {
    return (
        <Grid container spacing={3}>
            <List component="nav" aria-label="contacts">
                {lines.map((line, index) => (
                    <ListItem button>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                ))}
            </List>
        </Grid >
    );
}
