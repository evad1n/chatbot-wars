import { AppBar, Button, FormControl, Grid, makeStyles, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import API from 'api';
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
    }
}));

const badLength = "Name must be between 3 and 30 characters";

export default function BotDetail() {
    const classes = useStyles();

    const [tab, setTab] = React.useState(0);
    const [bot, setBot] = useState({});
    const { id } = useParams();
    const [name, setName] = useState("");

    // General config
    const [error, setError] = useState(false);

    const validate = () => {
        const validName = name.length >= 3 && name.length <= 30;
        console.log(name);
        if (!validName) {
            setError(true);
        }

        if (!validName)
            return;
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
                                <TextField autoFocus error={error} helperText={error ? badLength : ""} label="Name" variant="outlined" value={name} onChange={changeName} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.generalSave}>
                        <Button onClick={validate} fullWidth size={'large'} variant={'contained'} color={'secondary'}>Save</Button>
                    </Grid>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <LineTable botID={bot.id} lineType={"greetings"} lines={bot.greetings} refresh={getBotData} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <LineTable botID={bot.id} lineType={"questions"} lines={bot.questions} refresh={getBotData} />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <LineTable botID={bot.id} lineType={"responses"} lines={bot.responses} refresh={getBotData} />
                </TabPanel>
            </React.Fragment>
        </React.Fragment>
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