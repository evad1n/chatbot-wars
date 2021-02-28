import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Create from 'components/workshop/Create';
// Forms
import Name from 'components/workshop/forms/Name';
import Greetings from 'components/workshop/forms/Greetings';
import Questions from 'components/workshop/forms/Questions';
import Responses from 'components/workshop/forms/Responses';
import Finalize from 'components/workshop/forms/Finalize';

import API from 'axios';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 30
    }
}));

const createBot = (bot) => {
    console.log("creating bot: ", bot);
};

export default function Workshop() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [greetings, setGreetings] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);

    const submit = () => {
        console.log(name, greetings, questions, responses);
    };

    const steps = [
        {
            title: "Name",
            component: Name,
            value: name,
            handler: setName
        },
        {
            title: "Greetings",
            component: Greetings,
            value: greetings,
            handler: setGreetings
        },
        {
            title: "Questions",
            component: Questions,
            value: questions,
            handler: setQuestions
        },
        {
            title: "Responses",
            component: Responses,
            value: responses,
            handler: setResponses
        },
        {
            title: "Finalize",
            component: Finalize,
            value: name,
            handler: submit
        },
    ];


    return (
        <React.Fragment>
            <Typography className={classes.title} align={'center'}>WELCOME TO THE WORKSHOP</Typography>
            <Create steps={steps}></Create>
        </React.Fragment>
    );
}
