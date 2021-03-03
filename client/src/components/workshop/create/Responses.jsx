import { Grid, Typography } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import LineInput from './LineInput';

const badLength = "Response must be non-empty";

export default function Responses({ value, updateHandler: updateResponses, setValidator, titleStyle }) {
    const [response1, setResponse1] = useState(value[0]);
    const [response2, setResponse2] = useState(value[1]);
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

            const validResponse1 = response1.text.length > 0;
            const validResponse2 = response2.text.length > 0;
            if (!validResponse1) {
                errorMessages1.push(badLength);
                setError1(true);
            }
            if (!validResponse2) {
                errorMessages2.push(badLength);
                setError2(true);
            }
            setErrorMsgs1(errorMessages1);
            setErrorMsgs2(errorMessages2);
            updateResponses([response1, response2]);
            return validResponse1 && validResponse2;
        },
        [response1, response2, updateResponses],
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
        <React.Fragment>
            <Grid item xs={12} style={titleStyle}>
                <Typography variant={'h5'} align={'center'}>Time for some trash talk</Typography>
            </Grid>
            <LineInput autoFocus label="Response 1" error={error1} errorMessages={errorMsgs1} line={response1} updateLine={changeResponse1} />
            <LineInput label="Response 2" error={error2} errorMessages={errorMsgs2} line={response2} updateLine={changeResponse2} />
        </React.Fragment>
    );
}
