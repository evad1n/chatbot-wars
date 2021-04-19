import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Lock, Person } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/auth';



const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: 60,
        paddingBottom: 50,
        fontSize: 36
    },
    formContainer: {
        width: "40vw",
        minWidth: 300,
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
    },
    icon: {
        alignSelf: "center",
        fontSize: 44,
        paddingRight: 10
    },
    failed: {
        color: "red",
        fontSize: 16,
        padding: 0
    }
}));

export default function Login() {
    const classes = useStyles();
    const { login } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const [failed, setFailed] = useState(false);


    const validate = async () => {
        let newErrors = {
            username: "",
            password: "",
        };
        let valid = true;
        if (state.username.length === 0) {
            newErrors.username = "Username must not be empty";
            valid = false;
        }
        if (state.password.length === 0) {
            newErrors.password = "Password must not be empty";
            valid = false;
        }
        if (valid) {
            tryLogin();
        }
        setErrors(() => newErrors);
    };

    const { from } = location.state || { from: { pathname: "/" } };

    async function tryLogin() {
        try {
            await login(state.username, state.password);
            // Nav to home page
            history.replace(from);
        } catch (error) {
            setFailed(true);
        }
    }


    return (
        <React.Fragment>
            <Grid container direction={'row'} style={{ margin: 0 }}>
                <Grid item xs={12}>
                    <Typography className={classes.title} align={'center'}>Login to edit your bots</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4} component={Paper} className={classes.formContainer} elevation={6}>
                        {failed && <Grid item xs={12} className={classes.failed}>
                            <Typography align={'center'}>Invalid username or password</Typography>
                        </Grid>}
                        <Grid item xs={12} style={{ display: "flex" }}>
                            <Person className={classes.icon} color={"action"} />
                            <TextField
                                error={state.username.length === 0 && errors.username.length > 0}
                                helperText={state.username.length === 0 ? errors.username : ""}
                                onChange={event => setState({ ...state, username: event.target.value })}
                                label="Username"
                                variant="outlined"
                                style={{ flexGrow: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex" }}>
                            <Lock className={classes.icon} color={"action"} />
                            <TextField
                                error={state.password.length === 0 && errors.password.length > 0}
                                helperText={state.password.length === 0 ? errors.password : ""}
                                onChange={event => setState({ ...state, password: event.target.value })}
                                type={"password"}
                                label="Password"
                                variant="outlined"
                                style={{ flexGrow: 1 }}

                            />
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
