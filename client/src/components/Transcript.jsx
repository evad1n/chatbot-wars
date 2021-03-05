import { Box, Divider, List, ListItem, makeStyles } from '@material-ui/core';
import API, { moods } from 'api';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        maxHeight: "100%",
    },
    line: {
        display: "flex"
    },
    name: {
        fontWeight: 700
    }
}));

export default function Transcript({ roomHash }) {
    const classes = useStyles();

    const [transcript, setTranscript] = useState([]);

    // Set timer loop for getting lines
    useEffect(() => {
        const interval = setInterval(async () => {
            let response = await API.get(`/rooms/${roomHash}`);
            setTranscript(response.data);
        }, 1000);
        return () => {
            clearInterval(interval);
            // Delete room on leave
            API.delete(`/rooms/${roomHash}`);
        };
    }, [roomHash]);

    return (
        <Box className={classes.container}>
            <List>
                {transcript.map((msg, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <Box className={"MuiListItemText-root MuiListItemText-multiline"}>
                                <p className={"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"}><strong>{msg.name}</strong>: {msg.line.text}</p>
                                <p className={"MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock"}>{moods[msg.line.mood]}</p>
                            </Box>
                        </ListItem>
                        {index !== transcript.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
