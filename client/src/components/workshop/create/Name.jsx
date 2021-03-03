import { FormControl, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';

const badLength = "Name must be between 3 and 30 characters";

export default function Name({ value, updateHandler: updateName, setValidator, titleStyle }) {
    const [name, setName] = useState(value);
    const [error, setError] = useState(false);

    const validate = useCallback(
        () => {
            const validName = name.length >= 3 && name.length <= 30;
            if (!validName) {
                setError(true);
            } else {
                updateName(name);
            }
            return validName;
        },
        [name, updateName],
    );

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
                    <TextField autoFocus error={error} helperText={error ? badLength : ""} label="Name" variant="outlined" value={name} onChange={changeName} />
                </FormControl>
            </Grid>
        </React.Fragment>
    );
}
