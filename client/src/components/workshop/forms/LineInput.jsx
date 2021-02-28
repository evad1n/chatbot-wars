import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';


const Moods = [
    "happy",
    "angry",
    "sad",
];

export default function LineInput({ label, selection, updateText, updateSelection }) {
    console.log(selection);

    const changeText = (event) => {
        updateText(event.target.value);
    };

    const changeSelection = (event) => {
        updateSelection(event.target.value);
        console.log(event.target.value);
    };


    return (
        <React.Fragment>
            <Grid item xs={9}>
                <FormControl fullWidth>
                    <TextField label={label} variant="outlined" onChange={changeText} />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Mood</InputLabel>
                    <Select
                        variant={'outlined'}
                        label="Mood"
                        onChange={changeSelection}
                        // defaultValue={selection}
                        value={selection}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Moods.map((mood, index) => {
                            console.log(index);
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