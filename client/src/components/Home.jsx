import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: {
        // height: "100%",
        flex: 1,
        flexDirection: "column",
        fontSize: 30,
        textAlign: "center"
    },
    title: {
        marginTop: 30,
        marginBottom: 50
    },
    feature: {
        marginTop: 50,
        flexGrow: 1
    }
}));

export default function Landing() {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant={'h4'}>WELCOME TO CHATBOT WARS</Typography>
            <Typography variant={'h6'}>
                Build your own chatbot. Watch it crash and burn.
            </Typography >
            <Button style={{ marginTop: 20 }} variant={'contained'} color={'secondary'} component={RouterLink} to={'/workshop'}>Get Started</Button>
            {/* <div className={classes.feature}>
                <Typography variant={'h5'}>Fight of the Day</Typography>
                <Arena />
                <p>not yet...</p>
            </div> */}
        </Container>
    );
}
