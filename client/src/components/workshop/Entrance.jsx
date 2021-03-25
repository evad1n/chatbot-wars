import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    title: {
        padding: "10%",
        fontSize: 40
    },
    directions: {
        fontSize: 20
    }
}));

export default function Entrance() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <Grid container spacing={3} direction={'row'} style={{ margin: 0 }}>
                <Grid item xs={12} >
                    <Typography className={classes.title} align={'center'}>WELCOME TO THE WORKSHOP</Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography className={classes.directions} align={'center'}>Start off by creating a bot</Typography>
                </Grid>
                <Grid item xs={5} style={{ margin: "auto" }}>
                    <Button component={RouterLink} to={'/workshop/create'} style={{ fontSize: 20 }} fullWidth size="large" variant="contained" color="secondary">Create</Button>
                </Grid>
                <Grid item xs={12} >
                    <Typography className={classes.directions} align={'center'}>Or keep working on existing ones</Typography>
                </Grid>
                <Grid item xs={5} style={{ margin: "auto" }}>
                    <Button component={RouterLink} to={'/workshop/edit'} style={{ fontSize: 20 }} fullWidth size="large" variant="contained" color="secondary">Edit</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
