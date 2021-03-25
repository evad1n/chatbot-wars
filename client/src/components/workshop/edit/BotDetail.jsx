import { AppBar, Button, CircularProgress, FormControl, Grid, List, ListItem, ListItemText, makeStyles, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import API from 'scripts/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    }
}));

const badLength = "Name must be between 3 and 30 characters";

export default function BotDetail() {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [tab, setTab] = React.useState(0);
    const [bot, setBot] = useState({});
    const { id } = useParams();
    const [name, setName] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [error, setError] = useState(false);

    // General config
    const [nameError, setNameError] = useState(false);

    const validate = () => {
        let errorMsgs = [];

        const validName = name.length >= 3 && name.length <= 30;
        const validGreetings = bot.greetings.length >= 2;
        const validQuestions = bot.questions.length >= 2;
        const validResponses = bot.responses.length >= 2;
        if (!validName) {
            setNameError(true);
            setError(true);
        }
        if (!validGreetings) {
            errorMsgs.push("Must have at least 1 greeting");
            setError(true);
        }
        if (!validQuestions) {
            errorMsgs.push("Must have at least 2 questions");
            setError(true);
        }
        if (!validResponses) {
            errorMsgs.push("Must have at least 2 responses");
            setError(true);
        }

        if (!validName || !validGreetings || !validQuestions || !validResponses) {
            setErrorMessages(errorMsgs);
            return;
        }
        updateBot();
    };

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


    // Display as tabs of lines

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
                                        <TextField autoFocus error={nameError} helperText={nameError ? badLength : ""} label="Name" variant="outlined" value={name} onChange={changeName} />
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