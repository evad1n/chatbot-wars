import { Button, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, MenuItem, Paper, Select, Tooltip, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import API from 'api';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import Transcript from './Transcript';



const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        height: "100%",
        border: "1px solid #bbb"
    },
    sideBar: {
        borderRight: "1px solid grey",
        maxHeight: "100%",
        flexWrap: "nowrap"
    },
    select: {
        padding: 10,
        borderBottom: "1px solid grey",
    },
    addButton: {
        marginTop: 5
    },
    botListContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0
    },
    botList: {
        maxHeight: "100%",
        overflow: "auto",
        minHeight: 0
    },
    currentBotsTitle: {
        padding: 10,
        textAlign: "center",
        opacity: 0.8,
        fontWeight: "bold",
        fontSize: 20,
        borderBottom: "0.1px solid black",
    },
    notStartedContainer: {
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center"
    },
    notStartedMsg: {
        textAlign: "center",
        fontSize: 20
    },
    transcriptContainer: {
        overflow: 'auto',
        maxHeight: "100%"
    }
}));

const initialState = {
    ws: new WebSocket(process.env.NODE_ENV === 'development' ? "ws://localhost:8080/api/rooms" : `wss://${document.location.host}/api/rooms`),
    active: false,
    roomBots: [],
    transcript: [],
    remainingBots: []
};

function reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return { ...state, remainingBots: action.bots };
        case "START_ROOM":
            return { ...state, active: true };
        case "ADD_BOT":
            const addedBot = state.remainingBots.find(bot => bot.id === action.id);
            const newRemaining = state.remainingBots.filter(bot => bot.id !== action.id);
            return { ...state, roomBots: [...state.roomBots, addedBot], remainingBots: newRemaining };
        case "REMOVE_BOT":
            const removedBot = state.roomBots.find(bot => bot.id === action.id);
            const newRoomBots = state.roomBots.filter(bot => bot.id !== action.id);
            return { ...state, roomBots: newRoomBots, remainingBots: [...state.remainingBots, removedBot] };
        case "NEW_MESSAGE":
            return { ...state, transcript: [...state.transcript, action.message] };
        default:
            throw new Error("unrecognized action type");
    }
}

export default function Arena() {
    const classes = useStyles();
    const scrollContainerRef = useRef(null);

    const [selectedBot, setSelectedBot] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState);

    // Initial load of bots
    useEffect(() => {
        // Fetch bots
        const getBots = async () => {
            let response = await API.get('/bots');
            dispatch({
                type: "INIT",
                bots: response.data
            });
        };

        getBots();
    }, []);

    // Socket listening
    useEffect(() => {
        state.ws.onmessage = event => {
            dispatch(JSON.parse(event.data));
        };
    });


    // Create room
    const startRoom = async () => {
        state.ws.send(JSON.stringify({
            type: "START_ROOM"
        }));
        dispatch({ type: "START_ROOM" });
    };

    const addBot = () => {
        if (selectedBot === "")
            return;
        let data = {
            type: "ADD_BOT",
            payload: selectedBot
        };
        state.ws.send(JSON.stringify(data));
        setSelectedBot("");
    };

    const removeBot = (id) => {
        state.ws.send(JSON.stringify({
            type: "REMOVE_BOT",
            payload: id
        }));
    };

    const changeSelection = (event) => {
        setSelectedBot(event.target.value);
    };

    return (
        <Grid component={Paper} elevation={3} container item xs={12} className={classes.container}>
            <Grid container direction="column" item xs={3} className={classes.sideBar}>
                <Grid item className={classes.select}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Add a bot</InputLabel>
                        <Select
                            variant={'outlined'}
                            label="Add a bot"
                            onChange={changeSelection}
                            value={selectedBot}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {state.remainingBots.map((bot, index) => {
                                return (
                                    <MenuItem value={bot.id} key={index}>{bot.name}</MenuItem>
                                );
                            })}
                        </Select>
                        <Button onClick={addBot} variant={'contained'} color={'secondary'} className={classes.addButton}>Add</Button>
                    </FormControl>
                </Grid>
                <Grid item className={classes.botListContainer}>
                    <Typography className={classes.currentBotsTitle}>Current Bots</Typography>
                    <List className={classes.botList}>
                        {state.roomBots.map((bot, index) => (
                            <React.Fragment key={index}>
                                {index !== 0 && <Divider />}
                                <ListItem>
                                    <ListItemText primary={bot.name} />
                                    <ListItemSecondaryAction>
                                        <Tooltip title="Remove">
                                            <IconButton onClick={() => removeBot(bot.id)} edge="end" aria-label="remove">
                                                <Close />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Grid container item xs={9} className={classes.transcriptContainer} ref={scrollContainerRef}>
                {state.active ? (
                    <Transcript transcript={state.transcript} scrollContainerRef={scrollContainerRef} />
                ) : (
                    <Grid container className={classes.notStartedContainer} item xs={12}>
                        <Grid item xs={12}>
                            <p className={classes.notStartedMsg}>Start the room to see messages</p>
                            <Button onClick={startRoom} variant={'contained'} color={'secondary'}>Start</Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
