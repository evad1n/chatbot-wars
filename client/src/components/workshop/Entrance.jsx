import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 40,
        fontWeight: 'bolder',
        marginTop: 30,
        marginBottom: 50,
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        textAlign: "center",
    },
    directionText: {
        fontSize: 24,
        padding: 20
    },
    button: {
        fontSize: 20,
        margin: "auto",
        width: "50%"
    }
}));

export default function Entrance() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <Typography className={classes.title} align={'center'}>WELCOME TO THE WORKSHOP</Typography>
            <div className={classes.container}>
                <div>
                    <Typography className={classes.directionText} align={'center'}>Start off by creating a bot
                </Typography>
                    <Button className={classes.button} component={RouterLink} to={'/workshop/create'} size="large" variant="contained" color="secondary">Create</Button>
                </div>
                <div>
                    <Typography className={classes.directionText} align={'center'}>Or keep working on existing ones
                </Typography>
                    <Button className={classes.button} component={RouterLink} to={'/workshop/edit'} size="large" variant="contained" color="secondary">Edit</Button>
                </div>
            </div>
        </React.Fragment>
    );
}
