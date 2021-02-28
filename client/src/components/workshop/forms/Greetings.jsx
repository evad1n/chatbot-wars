import { FormControl, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LineInput from './LineInput';


export default function Greetings({ updateHandler: updateGreetings }) {
    const [greeting, setGreeting] = useState({
        text: null,
        mood: 0,
    });

    const setGreetingText = (text) => {
        setGreeting({
            text: text,
            mood: greeting.mood
        });
    };

    const setGreetingMood = (mood) => {
        setGreeting({
            text: greeting.text,
            mood: mood
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>What's your bot gonna say prior to embarassing your foes?</Typography>
            </Grid>
            <LineInput label="Greeting" selection={greeting.mood} updateText={setGreetingText} updateSelection={setGreetingMood} />
        </Grid>
    );
}
