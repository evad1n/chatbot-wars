import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import API from 'api';
import { useAuth } from 'hooks/auth';
import useDebounce from 'hooks/debounce';



const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: 60,
        paddingBottom: 50,
        fontSize: 36
    },
    formContainer: {
        width: 600,
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
    },
    valid: {
        '& label.MuiInputLabel-formControl': {
            color: 'green',
        },
        '& p.MuiFormHelperText-root': {
            color: 'green',
        },
        '& input + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:hover + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
    },
}));

export default function Register() {
    const classes = useStyles();
    const { register, login } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const [checkedUsername, setCheckedUsername] = useState(false);
    const debouncedUsername = useDebounce(state.username, 400);

    // Check unique username
    useEffect(() => {
        async function checkUsername(username) {
            if (username.length === 0)
                return;
            try {
                let response = await API.get(`/unique/users/${username}`);
                if (!response.data.valid && username === debouncedUsername) {
                    setErrors(errors => {
                        return { ...errors, username: "That username is taken" };
                    });
                } else {
                    setErrors(errors => {
                        return { ...errors, username: "" };
                    });
                }
                setCheckedUsername(true);
            } catch (error) {
                console.error(error);
            }
        }

        checkUsername(debouncedUsername);
    }, [debouncedUsername]);


    function validate() {
        let newErrors = {
            firstName: "",
            lastName: "",
            username: errors.username,
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

    const { from } = location.state || { from: { pathname: "/" } };

    async function tryRegister() {
        try {
            await register(state);
            await login(state.username, state.password);
            // Nav to home page
            history.replace(from);
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
                                className={errors.username.length === 0 && state.username.length > 0 && checkedUsername ? classes.valid : null}
                                error={errors.username.length > 0}
                                helperText={errors.username.length === 0 && state.username.length !== 0 && checkedUsername ? "Valid username" : errors.username}
                                onChange={event => {
                                    setState({ ...state, username: event.target.value });
                                    setErrors({ ...errors, username: "" });
                                    setCheckedUsername(false);
                                }}
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
