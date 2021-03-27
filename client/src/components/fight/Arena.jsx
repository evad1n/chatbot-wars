import { Button, FormControl, Grid, InputLabel, List, ListItem, ListItemText, ListSubheader, makeStyles, MenuItem, Paper, Select } from '@material-ui/core';
import API from 'scripts/api';
import React, { useEffect, useRef, useState } from 'react';
import Transcript from './Transcript';



const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        height: "100%",
        border: "1px solid #bbb"
    },
    sideBar: {
        borderRight: "1px solid grey",
        alignContent: "flex-start"
    },
    select: {
        padding: 10,
        borderBottom: "1px solid grey",
    },
    addButton: {
        marginTop: 5
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

export default function Arena() {
    const classes = useStyles();
    const scrollContainerRef = useRef(null);


    const [bots, setBots] = useState([]);
    const [roomBots, setRoomBots] = useState([]);
    const [roomHash, setRoomHash] = useState("");
    const [selectedBot, setSelectedBot] = useState("");
    const [active, setActive] = useState(false);

    // Create room
    const startRoom = async () => {
        let response = await API.post(`/rooms`);
        setRoomHash(response.data.hash);
        // Add all bots to room
        for (const b of roomBots) {
            await API.put(`/rooms/${response.data.hash}/${b.id}`);
        }
        setActive(true);
    };

    // Initial load of bots
    useEffect(() => {
        // Fetch bots
        const getBots = async () => {
            let response = await API.get('/bots');
            setBots(response.data);
        };

        getBots();
    }, [roomHash]);

    const addBot = () => {
        if (selectedBot === "")
            return;
        let newBot = bots[selectedBot];
        // Check if already in
        if (roomBots.some(bot => bot.id === newBot.id)) {
            return;
        }
        if (active) {
            API.put(`/rooms/${roomHash}/${newBot.id}`);
        }
        // Add bot ID to selected bots
        setRoomBots([...roomBots, {
            name: newBot.name,
            id: newBot.id
        }]);
    };

    const changeSelection = (event) => {
        setSelectedBot(event.target.value);
    };

    return (
        <Grid component={Paper} elevation={3} container item xs={12} className={classes.container}>
            <Grid container item xs={3} className={classes.sideBar}>
                <Grid item xs={12} className={classes.select}>
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
                            {bots.map((bot, index) => {
                                return (
                                    <MenuItem value={index} key={index}>{bot.name}</MenuItem>
                                );
                            })}
                        </Select>
                        <Button onClick={addBot} variant={'contained'} color={'secondary'} className={classes.addButton}>Add</Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        <ListSubheader style={{ textAlign: "center" }}>Current Bots</ListSubheader>
                        {roomBots.map((bot, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={bot.name} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Grid container item xs={9} className={classes.transcriptContainer} ref={scrollContainerRef}>
                {active ? (
                    <Transcript roomHash={roomHash} scrollContainerRef={scrollContainerRef} />
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
