import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';


const Moods = [
    "Happy",
    "Angry",
    "Sad",
];

const streamErrors = (msgs) => {
    return msgs.join("\n");
};

export default function LineInput({ error, errorMessages, label, line, updateLine }) {

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
                    <TextField value={line.text} error={error} helperText={streamErrors(errorMessages)} label={label} variant="outlined" onChange={changeText} />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Mood</InputLabel>
                    <Select
                        variant={'outlined'}
                        label="Mood"
                        onChange={changeSelection}
                        value={line.mood}
                    >
                        {Moods.map((mood, index) => {
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