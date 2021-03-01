import { FormControl, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';

const errorMessage = [
    "Name must be between 3 and 30 characters"
];

export default function Name({ value, updateHandler: updateName, setValidator }) {
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
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>First thing's first, give your bot a name</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField error={error} helperText={error ? errorMessage : ""} label="Name" variant="outlined" value={name} onChange={changeName} />
                </FormControl>
            </Grid>
        </Grid>
    );
}
