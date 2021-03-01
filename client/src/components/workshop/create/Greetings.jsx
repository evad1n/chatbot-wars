import { Grid, Typography } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import LineInput from './LineInput';

const badLength = "Greeting must be non-empty";

const addErrorMessage = (start, add, handler) => {
    let nextMsgs = start;
    nextMsgs.push(add);
    handler(nextMsgs);
};

export default function Greetings({ value, updateHandler: updateGreetings, setValidator }) {
    const [greeting, setGreeting] = useState(value);
    const [error, setError] = useState(false);
    const [errorMsgs, setErrorMsgs] = useState([]);


    const validate = useCallback(
        () => {
            const validGreeting = greeting.text.length > 0;
            if (!validGreeting) {
                setError(true);
                addErrorMessage(errorMsgs, badLength, setErrorMsgs);
            }
            updateGreetings(greeting);
            return validGreeting;
        },
        [greeting, updateGreetings, errorMsgs],
    );

    useEffect(() => {
        setValidator(validate);
    }, [setValidator, validate]);

    const changeGreeting = ({ text, mood }) => {
        setGreeting({
            text: text !== undefined ? text : greeting.text,
            mood: mood !== undefined ? mood : greeting.mood
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>What's your bot gonna say prior to embarassing your foes?</Typography>
            </Grid>
            <LineInput error={error} errorMessages={error ? errorMsgs : []} label="Greeting" line={greeting} updateLine={changeGreeting} />
        </Grid>
    );
}
