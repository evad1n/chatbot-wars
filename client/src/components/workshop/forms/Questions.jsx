import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LineInput from './LineInput';

export default function Questions({ updateHandler: updateQuestions }) {
    const [question1, setQuestion1] = useState({
        text: null,
        mood: 0,
    });
    const [question2, setQuestion2] = useState({
        text: null,
        mood: 0,
    });

    const setQuestion1Text = (text) => {
        setQuestion1({
            text: text,
            mood: question1.mood
        });
    };

    const setQuestion1Mood = (mood) => {
        setQuestion1({
            text: question1.text,
            mood: mood
        });
    };

    const setQuestion2Text = (text) => {
        setQuestion2({
            text: text,
            mood: question2.mood
        });
    };

    const setQuestion2Mood = (mood) => {
        setQuestion2({
            text: question2.text,
            mood: mood
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>Everyone needs a conversation starter</Typography>
            </Grid>
            <LineInput label="Question 1" selection={question1.mood} updateText={setQuestion1Text} updateSelection={setQuestion1Mood} />
            <LineInput label="Question 2" selection={question2.mood} updateText={setQuestion2Text} updateSelection={setQuestion2Mood} />
        </Grid>
    );
}
