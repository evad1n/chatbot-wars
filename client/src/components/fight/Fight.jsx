import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Arena from './Arena';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: 30,
        flexGrow: 1,
        alignContent: "flex-start",
    },
    title: {
        fontSize: 30,
    },
    fightZone: {
        flexGrow: 1,
        padding: 20,
        height: "80vh"
    }
}));

export default function Fight() {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Typography className={classes.title} align={'center'}>WELCOME TO THE DEATH ZONE</Typography>
            </Grid>
            <Grid item xs={12} className={classes.fightZone}>
                <Arena />
            </Grid>
        </Grid>
    );
}
