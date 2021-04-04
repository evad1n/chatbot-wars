import { FormControl, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import API from 'api';
import useDebounce from 'hooks/debounce';

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

function validName(name) {
    return name.length >= 3 && name.length <= 30;
}

export default function Name({ value, updateHandler: updateName, setValidator, titleStyle }) {
    const classes = useStyles();

    const [name, setName] = useState(value);
    const [error, setError] = useState("");

    const validate = useCallback(
        async () => {
            if (!validName(name)) {
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
        [name, updateName],
    );

    const [checkedName, setCheckedName] = useState(false);
    const debouncedName = useDebounce(name, 400);

    // Check unique bot name
    useEffect(() => {
        async function checkBotName(currentName) {
            if (!validName(currentName)) {
                setError("");
                return;
            }
            try {
                let response = await API.get(`/unique/bots/${currentName}`);
                if (!response.data.valid && currentName === debouncedName) {
                    setError("That bot name is taken");
                } else {
                    setError("");
                }
                setCheckedName(true);
            } catch (error) {
                console.error(error);
            }
        }

        checkBotName(debouncedName);
    }, [debouncedName]);

    useEffect(() => {
        setValidator(validate);
    }, [setValidator, validate]);

    const changeName = (event) => {
        setName(event.target.value);
        setError("");
        setCheckedName(false);
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
                        className={error.length === 0 && validName && checkedName ? classes.valid : null}
                        error={error.length > 0}
                        helperText={error.length === 0 && validName && checkedName ? "Valid bot name" : error}
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={changeName} />
                </FormControl>
            </Grid>
        </React.Fragment>
    );
}
