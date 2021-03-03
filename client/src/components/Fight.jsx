import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Arena from './Arena';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: 30,
    },
    title: {
        fontSize: 30
    }
}));

export default function Fight() {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Typography className={classes.title} align={'center'}>WELCOME TO THE DEATH ZONE</Typography>
            </Grid>
            <Grid item xs={12}>
                <Arena />
            </Grid>
        </Grid>
    );
}
