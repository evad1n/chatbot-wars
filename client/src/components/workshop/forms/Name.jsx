import { FormControl, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

export default function Name({ value, updateHandler: updateName }) {
    const changeName = (event) => {
        updateName(event.target.value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography variant={'h5'} align={'center'}>First thing's first, give your bot a name</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField label="Name" variant="outlined" value={value} onChange={changeName} />
                </FormControl>
            </Grid>
        </Grid>
    );
}
