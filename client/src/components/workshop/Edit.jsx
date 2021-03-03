import { Button, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import API from 'api';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
    },
    botsContainer: {
        paddingTop: 20,
        alignContent: "flex-start"
    },
    noBots: {
        marginTop: "20%",
        marginBottom: 20
    },
    delete: {
        '&:hover': {
            color: "red"
        }
    },
    loadingContainer: {
        alignContent: "center"
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexGrow: 1
    }
}));


export default function Edit() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [bots, setBots] = useState([]);

    // Fetch bot data
    const getBots = useCallback(
        async () => {
            let response = await API.get('/bots');
            setBots(response.data);
            setLoading(false);
        },
        [],
    );

    useEffect(() => {
        getBots();
    }, [getBots]);

    const deleteBot = async (id) => {
        await API.delete(`/bots/${id}`);
        getBots();
    };

    return (
        <Grid container className={classes.container}>
            {loading ? (
                <Grid item xs={12} className={classes.loading}>
                    <CircularProgress color="secondary" />
                </Grid >
            ) : (
                    <Grid container item xs={12} className={classes.botsContainer}>
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
                                            <ListItem component={RouterLink} to={`/workshop/edit/${bot.id}`} button key={index}>
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
                            )
                        }
                    </Grid>
                )}
        </Grid >
    );
}
