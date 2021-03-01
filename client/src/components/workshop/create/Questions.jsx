import { Grid, Typography } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import LineInput from './LineInput';

const badLength = "Greeting must be non-empty";

const addErrorMessage = (start, add, handler) => {
    let nextMsgs = start;
    nextMsgs.push(add);
    handler(nextMsgs);
};

export default function Questions({ value, updateHandler: updateQuestions, setValidator }) {
    const [question1, setQuestion1] = useState(value[0]);
    const [question2, setQuestion2] = useState(value[1]);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [errorMsgs1, setErrorMsgs1] = useState([]);
    const [errorMsgs2, setErrorMsgs2] = useState([]);

    const validate = useCallback(
        () => {
            const validQuestion1 = question1.text.length > 0;
            const validQuestion2 = question2.text.length > 0;
            if (!validQuestion1) {
                setError1(true);
                addErrorMessage(errorMsgs1, badLength, setErrorMsgs1);
            }
            if (!validQuestion2) {
                setError2(true);
                addErrorMessage(errorMsgs2, badLength, setErrorMsgs2);
            }
            updateQuestions([question1, question2]);
            return validQuestion1 && validQuestion2;
        },
        [question1, question2, updateQuestions, errorMsgs1, errorMsgs2],
    );

    useEffect(() => {
        setValidator(validate);
    }, [setValidator, validate]);

    const changeQuestion1 = ({ text, mood }) => {
        setQuestion1({
            text: text !== undefined ? text : question1.text,
            mood: mood !== undefined ? mood : question1.mood
        });
    };

    const changeQuestion2 = ({ text, mood }) => {
        setQuestion2({
            text: text !== undefined ? text : question2.text,
            mood: mood !== undefined ? mood : question2.mood
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>Everyone needs a conversation starter</Typography>
            </Grid>
            <LineInput label="Question 1" error={error1} errorMessages={error1 ? errorMsgs1 : []} line={question1} updateLine={changeQuestion1} />
            <LineInput label="Question 2" error={error2} errorMessages={error2 ? errorMsgs2 : []} line={question2} updateLine={changeQuestion2} />
        </Grid>
    );
}
