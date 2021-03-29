import { FormControl, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import API from 'scripts/api';

const useStyles = makeStyles((theme) => ({
    valid: {
        '& label.MuiInputLabel-formControl': {
            color: 'green',
        },
        '& p.MuiFormHelperText-root': {
            color: 'green',
        },
        '& input + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:hover + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
    },
}));

export default function Name({ value, updateHandler: updateName, setValidator, titleStyle }) {
    const classes = useStyles();

    const [name, setName] = useState(value);
    const [error, setError] = useState("");

    const validName = name.length >= 3 && name.length <= 30;

    const validate = useCallback(
        async () => {
            if (!validName) {
                setError("Name must be between 3 and 30 characters");
                return false;
            }
            // Check unique username
            try {
                let response = await API.get(`/unique/bots/${name}`);
                if (!response.data.valid) {
                    setError("That bot name is taken");
                    return false;
                } else {
                    setError("");
                    updateName(name);
                }
            } catch (error) {
                console.error(error);
            }
            return true;
        },
        [name, updateName, validName],
    );

    // Check unique bot name
    useEffect(() => {
        async function checkBotName(currentName) {
            if (!validName) {
                setError("");
                return;
            }
            try {
                let response = await API.get(`/unique/bots/${currentName}`);
                if (!response.data.valid && currentName === name) {
                    setError("That bot name is taken");
                } else {
                    setError("");
                }
            } catch (error) {
                console.error(error);
            }
        }

        checkBotName(name);
    }, [name, validName]);

    useEffect(() => {
        setValidator(validate);
    }, [setValidator, validate]);

    const changeName = (event) => {
        setName(event.target.value);
    };

    return (
        <React.Fragment>
            <Grid item xs={12} style={titleStyle}>
                <Typography variant={'h5'} align={'center'}>First thing's first, give your bot a name</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                        autoFocus
                        className={error.length === 0 && validName ? classes.valid : null}
                        error={error.length > 0}
                        helperText={error.length === 0 && validName ? "Valid bot name" : error}
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={changeName} />
                </FormControl>
            </Grid>
        </React.Fragment>
    );
}
