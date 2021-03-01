import { Grid, Typography } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import LineInput from './LineInput';

const badLength = "Greeting must be non-empty";

const addErrorMessage = (start, add, handler) => {
    let nextMsgs = start;
    nextMsgs.push(add);
    handler(nextMsgs);
};

export default function Responses({ value, updateHandler: updateResponses, setValidator }) {
    const [response1, setResponse1] = useState(value[0]);
    const [response2, setResponse2] = useState(value[1]);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [errorMsgs1, setErrorMsgs1] = useState([]);
    const [errorMsgs2, setErrorMsgs2] = useState([]);

    const validate = useCallback(
        () => {
            const validResponse1 = response1.text.length > 0;
            const validResponse2 = response2.text.length > 0;
            if (!validResponse1) {
                setError1(true);
                addErrorMessage(errorMsgs1, badLength, setErrorMsgs1);
            }
            if (!validResponse2) {
                setError2(true);
                addErrorMessage(errorMsgs2, badLength, setErrorMsgs2);
            }
            updateResponses([response1, response2]);
            return validResponse1 && validResponse2;
        },
        [response1, response2, updateResponses, errorMsgs1, errorMsgs2],
    );

    useEffect(() => {
        setValidator(validate);
    }, [setValidator, validate]);

    const changeResponse1 = ({ text, mood }) => {
        setResponse1({
            text: text !== undefined ? text : response1.text,
            mood: mood !== undefined ? mood : response1.mood
        });
    };

    const changeResponse2 = ({ text, mood }) => {
        setResponse2({
            text: text !== undefined ? text : response2.text,
            mood: mood !== undefined ? mood : response2.mood
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>Time for some trash talk</Typography>
            </Grid>
            <LineInput label="Response 1" error={error1} errorMessages={error1 ? errorMsgs1 : []} line={response1} updateLine={changeResponse1} />
            <LineInput label="Response 2" error={error2} errorMessages={error2 ? errorMsgs2 : []} line={response2} updateLine={changeResponse2} />
        </Grid>
    );
}
