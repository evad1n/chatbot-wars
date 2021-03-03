import { Grid, Typography } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import LineInput from './LineInput';

const badLength = "Greeting must be non-empty";

export default function Greetings({ value, updateHandler: updateGreetings, setValidator, titleStyle }) {
    const [greeting, setGreeting] = useState(value[0]);
    const [error, setError] = useState(false);
    const [errorMsgs, setErrorMsgs] = useState([]);


    const validate = useCallback(
        () => {
            let errorMessages = [];
            const validGreeting = greeting.text.length > 0;
            if (!validGreeting) {
                setError(true);
                errorMessages.push(badLength);
            }
            setErrorMsgs(errorMessages);
            updateGreetings([greeting]);
            return validGreeting;
        },
        [greeting, updateGreetings],
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
        <React.Fragment>
            <Grid item xs={12} style={titleStyle}>
                <Typography variant={'h5'} align={'center'}>What's your bot gonna say prior to embarassing your foes?</Typography>
            </Grid>
            <LineInput autoFocus error={error} errorMessages={errorMsgs} label="Greeting" line={greeting} updateLine={changeGreeting} />
        </React.Fragment>
    );
}
