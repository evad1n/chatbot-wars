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
        padding: 20
    },
    formRow: {
        display: "flex",
        justifyContent: "space-around"
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

export default function Register() {
    const classes = useStyles();
    const { register, login } = useAuth();

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    function validate() {
        let newErrors = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        };
        let valid = true;
        if (state.firstName.length === 0) {
            newErrors.firstName = "First name must not be empty";
            valid = false;
        }
        if (state.lastName.length === 0) {
            newErrors.lastName = "Last name must not be empty";
            valid = false;
        }
        if (state.username.length === 0) {
            newErrors.username = "Username must not be empty";
            valid = false;
        }
        if (state.password.length === 0) {
            newErrors.password = "Password must not be empty";
            valid = false;
        }
        if (valid) {
            tryRegister();
        }
        setErrors(() => newErrors);
    };

    async function tryRegister() {
        try {
            let response = await register(state);
            console.log(response);
            await login(state.username, state.password);
            console.log("SUCCESS");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <React.Fragment>
            <Grid container direction={'row'} style={{ margin: 0 }}>
                <Grid item xs={12}>
                    <Typography className={classes.title} align={'center'}>Register to create your own bots</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4} component={Paper} className={classes.formContainer} elevation={6}>
                        <Grid item xs={12} className={classes.formRow}>
                            <TextField
                                error={state.firstName.length === 0 && errors.firstName.length > 0}
                                helperText={state.firstName.length === 0 ? errors.firstName : ""}
                                onChange={event => setState({ ...state, firstName: event.target.value })}
                                label="First Name"
                                variant="outlined" />
                            <TextField
                                error={state.lastName.length === 0 && errors.lastName.length > 0}
                                helperText={state.lastName.length === 0 ? errors.lastName : ""}
                                onChange={event => setState({ ...state, lastName: event.target.value })}
                                label="Last Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} className={classes.formRow}>
                            <TextField
                                error={state.username.length === 0 && errors.username.length > 0}
                                helperText={state.username.length === 0 ? errors.username : ""}
                                onChange={event => setState({ ...state, username: event.target.value })}
                                label="Username"
                                variant="outlined" />
                            <TextField
                                error={state.password.length === 0 && errors.password.length > 0}
                                helperText={state.password.length === 0 ? errors.password : ""}
                                onChange={event => setState({ ...state, password: event.target.value })}
                                type={"password"}
                                label="Password"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={validate} fullWidth variant="contained" color="secondary">Register</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <p className={classes.bottomText}>Already a user? <RouterLink to={"/login"} className={classes.link}>Click here to login</RouterLink></p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}
