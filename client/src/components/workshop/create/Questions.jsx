import { Grid, Typography } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import LineInput from './LineInput';

const badLength = "Question must be non-empty";

export default function Questions({ value, updateHandler: updateQuestions, setValidator, titleStyle }) {
    const [question1, setQuestion1] = useState(value[0]);
    const [question2, setQuestion2] = useState(value[1]);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [errorMsgs1, setErrorMsgs1] = useState([]);
    const [errorMsgs2, setErrorMsgs2] = useState([]);

    const validate = useCallback(
        () => {
            setError1(false);
            setError2(false);
            let errorMessages1 = [];
            let errorMessages2 = [];

            const validQuestion1 = question1.text.length > 0;
            const validQuestion2 = question2.text.length > 0;
            if (!validQuestion1) {
                errorMessages1.push(badLength);
                setError1(true);
            }
            if (!validQuestion2) {
                errorMessages2.push(badLength);
                setError2(true);
            }
            setErrorMsgs1(errorMessages1);
            setErrorMsgs2(errorMessages2);
            updateQuestions([question1, question2]);
            return validQuestion1 && validQuestion2;
        },
        [question1, question2, updateQuestions],
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
        <React.Fragment>
            <Grid item xs={12} style={titleStyle}>
                <Typography variant={'h5'} align={'center'}>Everyone needs a conversation starter</Typography>
            </Grid>
            <LineInput autoFocus label="Question 1" error={error1} errorMessages={errorMsgs1} line={question1} updateLine={changeQuestion1} />
            <LineInput label="Question 2" error={error2} errorMessages={errorMsgs2} line={question2} updateLine={changeQuestion2} />
        </React.Fragment>
    );
}
