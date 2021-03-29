import { AppBar, Button, CircularProgress, FormControl, Grid, List, ListItem, ListItemText, makeStyles, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from 'scripts/api';
import LineTable from './LineTable';

const useStyles = makeStyles((theme) => ({
    name: {
        fontSize: 30,
        fontWeight: 600,
        textAlign: "center",
        padding: 5.5
    },
    tabContainer: {
        padding: 20,
        height: "100%",
        flexGrow: 1
    },
    generalContainer: {
        paddingTop: 30,
        textAlign: "center",
        flexGrow: 1,
        alignContent: "flex-start"
    },
    generalSave: {
        alignSelf: "flex-end",
    },
    errorList: {
        textAlign: "center",
        color: "red"
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexGrow: 1
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

export default function BotDetail() {
    const classes = useStyles();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [tab, setTab] = React.useState(0);
    const [bot, setBot] = useState({});
    const [name, setName] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [error, setError] = useState(false);

    // General config
    const [nameError, setNameError] = useState("");

    const validName = name.length >= 3 && name.length <= 30;

    const validate = async () => {
        let errorMsgs = [];

        const validGreetings = bot.greetings.length >= 1;
        const validQuestions = bot.questions.length >= 2;
        const validResponses = bot.responses.length >= 2;
        if (!validName) {
            setNameError("Name must be between 3 and 30 characters");
        }
        if (!validGreetings) {
            errorMsgs.push("Must have at least 1 greeting");
        }
        if (!validQuestions) {
            errorMsgs.push("Must have at least 2 questions");
        }
        if (!validResponses) {
            errorMsgs.push("Must have at least 2 responses");
        }

        if (!validName || !validGreetings || !validQuestions || !validResponses) {
            setErrorMessages(errorMsgs);
            setError(true);
            return;
        }

        if (bot.name !== name) {
            try {
                let response = await API.get(`/unique/bots/${name}`);
                if (!response.data.valid) {
                    setNameError("That bot name is taken");
                } else {
                    setNameError("");
                    updateBot();
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            updateBot();
        }
    };

    // Check unique bot name
    useEffect(() => {
        async function checkBotName(currentName) {
            if (!validName) {
                setNameError("");
                return;
            }
            try {
                let response = await API.get(`/unique/bots/${currentName}`);
                if (!response.data.valid && currentName === name && currentName !== bot.name) {
                    setNameError("That bot name is taken");
                } else {
                    setNameError("");
                }
            } catch (error) {
                console.error(error);
            }
        }

        checkBotName(name);
    }, [name, validName, bot.name]);

    const changeName = (event) => {
        setName(event.target.value);
    };

    // Fetch bot data
    const getBotData = useCallback(
        async () => {
            let response = await API.get(`/bots/${id}`);
            setBot(response.data);
            setName(response.data.name);
            setLoading(false);
        },
        [id],
    );

    // Fetch bot data
    const updateBot = async () => {
        await API.put(`/bots/${id}`, {
            ...bot,
            name: name
        }
        );
        getBotData();
    };

    // Initial load
    useEffect(() => {
        getBotData();
    }, [getBotData]);

    // Tab switching
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const showValidName = nameError.length === 0 && validName && name !== bot.name;

    return (
        <React.Fragment>
            {loading ? (
                <Grid container style={{ flexGrow: 1 }}>
                    <Grid item xs={12} className={classes.loading}>
                        <CircularProgress color="secondary" />
                    </Grid >
                </Grid >
            ) : (
                <React.Fragment>
                    <Typography className={classes.name}>
                        {bot.name}
                    </Typography>
                    <AppBar position="static">
                        <Tabs value={tab} onChange={handleChange} variant={'fullWidth'}>
                            <Tab label="General" />
                            <Tab label="Greetings" />
                            <Tab label="Questions" />
                            <Tab label="Responses" />
                        </Tabs>
                    </AppBar>
                    <React.Fragment>
                        <TabPanel value={tab} index={0} className={classes.general}>
                            <Grid container spacing={3} item xs={12} className={classes.generalContainer}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            autoFocus
                                            className={showValidName ? classes.valid : null}
                                            error={nameError.length > 0}
                                            helperText={showValidName ? "Valid bot name" : nameError}
                                            label="Name"
                                            variant="outlined"
                                            value={name}
                                            onChange={changeName} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {error && (
                                <Grid item xs={12} className={classes.errorList}>
                                    <List subheader={"Please fix the following errors"}>
                                        {errorMessages.map((msg, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={msg} className={classes.errorList} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            )}
                            <Grid item xs={12} className={classes.generalSave}>
                                <Button onClick={validate} fullWidth size={'large'} variant={'contained'} color={'secondary'}>Save</Button>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <LineTable botID={bot.id} lineType={"greetings"} lines={bot.greetings} min={1} refresh={getBotData} />
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            <LineTable botID={bot.id} lineType={"questions"} lines={bot.questions} min={2} refresh={getBotData} />
                        </TabPanel>
                        <TabPanel value={tab} index={3}>
                            <LineTable botID={bot.id} lineType={"responses"} lines={bot.responses} min={2} refresh={getBotData} />
                        </TabPanel>
                    </React.Fragment>
                </React.Fragment>
            )
            } </React.Fragment>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            style={{ height: "100%" }}
            {...other}
        >
            {value === index && (
                <Grid container className={classes.tabContainer}>
                    {children}
                </Grid>
            )}
        </div>
    );
}