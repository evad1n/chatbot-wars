import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "space-around"
    },
    title: {
        fontSize: 40,
        fontWeight: 'bolder',
        marginTop: 30,
        marginBottom: 50,
    },
    feature: {
        marginTop: 50,
        flexGrow: 1
    },
    button: {
        margin: "0 30%",
        marginTop: 20,
        marginBottom: 200,
        fontSize: 30,
        padding: "20px 40px"
    }
}));

export default function Landing() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography className={classes.title} align={"center"}>WELCOME TO CHATBOT WARS</Typography>
            <div className={classes.container}>
                <Typography variant={'h6'}>
                    Build your own chatbot. Watch it crash and burn.
                </Typography >
                <Button className={classes.button} size={'large'} variant={'contained'} color={'secondary'} component={RouterLink} to={'/workshop'}>Get Started</Button>
            </div>
        </React.Fragment>
    );
}
