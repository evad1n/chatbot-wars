import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LineInput from './LineInput';

export default function Responses({ updateHandler: updateResponses }) {
    const [response1, setResponse1] = useState({
        text: null,
        mood: 0,
    });
    const [response2, setResponse2] = useState({
        text: null,
        mood: 0,
    });

    const setResponse1Text = (text) => {
        setResponse1({
            text: text,
            mood: response1.mood
        });
    };

    const setResponse1Mood = (mood) => {
        setResponse1({
            text: response1.text,
            mood: mood
        });
    };

    const setResponse2Text = (text) => {
        setResponse2({
            text: text,
            mood: response2.mood
        });
    };

    const setResponse2Mood = (mood) => {
        setResponse2({
            text: response2.text,
            mood: mood
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>Time for some trash talk</Typography>
            </Grid>
            <LineInput label="Response 1" selection={response1.mood} updateText={setResponse1Text} updateSelection={setResponse1Mood} />
            <LineInput label="Response 2" selection={response2.mood} updateText={setResponse2Text} updateSelection={setResponse2Mood} />
        </Grid>
    );
}
