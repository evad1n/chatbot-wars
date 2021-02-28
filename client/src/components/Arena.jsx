import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';

const fake = [
    {
        text: "test",
        mood: 1
    }
];

export default function Arena() {

    const [transcript, setTranscript] = useState(fake);

    return (
        <div>
            <List dense>
                {transcript.map((line, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemText
                                primary={line.text}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}
