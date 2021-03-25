import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from 'scripts/auth';


const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: 60,
        paddingBottom: 50,
        fontSize: 36
    },
    formContainer: {
        width: "70%",
        margin: "auto",
        padding: 20,
    },
    bottomText: {
        marginTop: -10,
        textAlign: "center"
    },
    link: {
        textDecoration: "none",
        color: theme.palette.info.main,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    }
}));

export default function Login() {
    const classes = useStyles();
    const { login } = useAuth();

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const validate = async () => {
        console.log(state);
        let valid = false;
        if (valid) {
            tryLogin();
        }
    };

    async function tryLogin() {
        try {
            let response = await login(state.username, state.password);
            console.log(response);
            console.log("SUCCESS");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <React.Fragment>
            <Grid container direction={'row'} style={{ margin: 0 }}>
                <Grid item xs={12}>
                    <Typography className={classes.title} align={'center'}>Login to see your bots</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4} component={Paper} className={classes.formContainer} elevation={6}>
                        <Grid item xs={12}>
                            <TextField onChange={event => setState({ ...state, username: event.target.value })} label="Username" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={event => setState({ ...state, password: event.target.value })} type={"password"} label="Password" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={validate} fullWidth variant="contained" color="secondary" style={{}}>Log In</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <p className={classes.bottomText}>Not registered? <RouterLink to={"/register"} className={classes.link}>Click here to create an account</RouterLink></p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}
