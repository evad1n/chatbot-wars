import { Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import API from 'api';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    noBots: {
        marginTop: 50
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    }
}));


export default function Edit() {
    const classes = useStyles();
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const getBots = async () => {
            let response = await API.get('/bots');
            // Should log ID here
            console.log(JSON.stringify(response.data));
            setBots(response.data);
        };
        getBots();
    }, []);

    const deleteBot = (id) => {
        console.log("delete", id);
    };

    return (
        <Grid container spacing={3}>
            {bots.length > 0 ? (
                <React.Fragment>
                    <Grid item xs={12} >
                        <Typography variant={'h5'} align={'center'}>Select a bot to edit</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <List component="nav" aria-label="contacts">
                            <ListSubheader>
                                Available bots
                    </ListSubheader>
                            {bots.map((bot, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={bot.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton className={classes.delete} onClick={() => deleteBot(bot.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <Grid item xs={12} className={classes.noBots}>
                            <Typography variant={'h4'} align={'center'}>You haven't created any bots</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button component={RouterLink} to={"/workshop/create"} variant={'contained'} color={'secondary'}>Create a bot</Button>
                        </Grid>
                    </React.Fragment>
                )}
        </Grid >
    );
}