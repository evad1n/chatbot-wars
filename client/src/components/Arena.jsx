import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const fake = [
    {
        text: "test",
        mood: 1
    }
];

export default function Arena() {

    const [transcript] = useState(fake);

    // Use useEffect to subscribe to a room on the server
    // https://reactjs.org/docs/hooks-effect.html

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
