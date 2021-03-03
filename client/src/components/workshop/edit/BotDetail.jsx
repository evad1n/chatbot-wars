import { AppBar, Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import API from 'api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LineTable from './LineTable';

const useStyles = makeStyles((theme) => ({
    name: {
        fontSize: 30,
        fontWeight: 600,
        textAlign: "center",
        padding: 5.5
    }
}));

export default function BotDetail() {
    const classes = useStyles();

    const [tab, setTab] = React.useState(0);
    const [bot, setBot] = useState({});
    const { id } = useParams();

    // Fetch bot data
    const getBotData = async () => {
        let response = await API.get(`/bots/${id}`);
        setBot(response.data);
    };

    // Initial load
    useEffect(() => {
        const getBotData = async () => {
            let response = await API.get(`/bots/${id}`);
            setBot(response.data);
        };
        getBotData();
    }, [id]);

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
                <TabPanel value={tab} index={0}>
                    <h1>{bot.name}</h1>
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

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container >
                    {children}
                </Grid>
            )}
        </div>
    );
}