import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { moods } from 'scripts/api';

const streamErrors = (msgs) => {
    return msgs.join("\n");
};

export default function LineInput({ autoFocus, error, errorMessages, label, line, updateLine }) {

    const changeText = (event) => {
        updateLine({ text: event.target.value });
    };

    const changeSelection = (event) => {
        updateLine({ mood: event.target.value });
    };


    return (
        <React.Fragment>
            <Grid item xs={9}>
                <FormControl fullWidth>
                    <TextField autoFocus={autoFocus || false} value={line.text} error={error} helperText={streamErrors(errorMessages)} label={label} variant="outlined" onChange={changeText} />
                </FormControl>
            </Grid>
            <Grid item xs={3} >
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Mood</InputLabel>
                    <Select
                        variant={'outlined'}
                        label="Mood"
                        onChange={changeSelection}
                        value={line.mood}
                    >
                        {moods.map((mood, index) => {
                            return (
                                <MenuItem value={index} key={index}>{mood}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </React.Fragment>
    );
}