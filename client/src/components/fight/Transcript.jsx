import { Box, Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { moods } from 'api';
import React, { useEffect, useRef } from 'react';

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

export default function Transcript({ transcript, scrollContainerRef }) {
    const classes = useStyles();
    const scrollRef = useRef(null);


    // Autoscroll
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!scrollRef.current)
            return;
        if ((el.scrollHeight - el.clientHeight) - el.scrollTop < 100) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [transcript.length, scrollContainerRef]);

    return (
        <Box className={classes.container}>
            <List>
                {transcript.length === 0 ?
                    <ListItem>
                        <ListItemText primary={"Waiting for messages..."} />
                    </ListItem>
                    :
                    transcript.map((msg, index) => (
                        <React.Fragment key={index}>
                            <ListItem ref={index === transcript.length - 1 ? scrollRef : null}>
                                <Box className={"MuiListItemText-root MuiListItemText-multiline"}>
                                    <p className={"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"}><strong>{msg.name}</strong>: {msg.line.text}</p>
                                    <p className={"MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock"}>{moods[msg.line.mood]}</p>
                                </Box>
                            </ListItem>
                            {index !== transcript.length - 1 && <Divider />}
                        </React.Fragment>
                    ))
                }
            </List>
        </Box>
    );
}
