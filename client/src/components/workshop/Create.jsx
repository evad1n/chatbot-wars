import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import API from 'scripts/api';
import Finalize from 'components/workshop/create/Finalize';
import Greetings from 'components/workshop/create/Greetings';
import Name from 'components/workshop/create/Name';
import Questions from 'components/workshop/create/Questions';
import Responses from 'components/workshop/create/Responses';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: 'column',
        padding: 20
    },
    activeStep: {
        color: theme.palette.success.light
    },
    stepContainer: {
        padding: 20,
        flexGrow: 1,
        textAlign: "center",
    },
    stepContent: {
        flexGrow: 1,
        padding: "0 !important",
        alignContent: "flex-start"
    },
    stepButton: {
        alignSelf: "flex-end",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-evenly",
    }
}));


export default function Create() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set());

    const allStepsCompleted = () => {
        return completed.size === steps.length;
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleStep = (step) => () => {
        // Check for allowing user to directly advance this far
        if (completed.has(step)) {
            setActiveStep(step);
        }
    };

    const handleComplete = async () => {
        const newCompleted = new Set(completed);
        // Call child validation method
        let valid = await steps[activeStep].validate();
        if (!valid) {
            newCompleted.delete(activeStep);
            setCompleted(newCompleted);
            return;
        }

        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        if (completed.size !== steps.length) {
            handleNext();
        }
    };

    function isStepComplete(step) {
        return completed.has(step);
    }

    const lastStep = () => {
        return activeStep === steps.length - 1;
    };

    const [botID, setBotID] = useState(null);
    const [name, setName] = useState("");
    const [greetings, setGreetings] = useState([
        {
            text: "",
            mood: 0
        }
    ]);
    const [questions, setQuestions] = useState([
        {
            text: "",
            mood: 0
        },
        {
            text: "",
            mood: 0
        }
    ]);
    const [responses, setResponses] = useState([
        {
            text: "",
            mood: 0
        },
        {
            text: "",
            mood: 0
        }
    ]);

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
            handler: null,
            validate: () => true
        },
    ];

    const createBot = async () => {
        const bot = {
            name: name,
            greetings: greetings,
            questions: questions,
            responses: responses,
        };
        console.log(bot);

        let response = await API.post('/bots', bot);
        // Should log ID here
        setBotID(response.data.id);
        console.log(JSON.stringify(response.data));
    };


    return (
        <div className={classes.root}>
            {!allStepsCompleted() && (<Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps = {};
                    const buttonProps = {};
                    return (
                        <Step active={activeStep === index} key={step.title} {...stepProps}>
                            <StepButton
                                disabled={activeStep !== index && !isStepComplete(index)}
                                onClick={handleStep(index)}
                                completed={activeStep !== index && isStepComplete(index)}
                                {...buttonProps}
                            >
                                {step.title}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>)}
            <Grid container direction={'row'} spacing={3} className={classes.stepContainer}>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography variant={'h4'}>
                                Bot created successfully!
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button to={`/workshop/edit/${botID}`} component={RouterLink} variant={'contained'} color={'secondary'}>See it in the workshop</Button>
                        </Grid>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Grid container spacing={3} item xs={12} className={classes.stepContent}>
                            {React.createElement(
                                steps[activeStep].component,
                                {
                                    value: steps[activeStep].value,
                                    updateHandler: steps[activeStep].handler,
                                    setValidator: (validator => steps[activeStep].validate = validator),
                                    titleStyle: { padding: "30px 0px" }
                                },
                            )}
                        </Grid>
                        <Grid item xs={12} className={classes.stepButton}>
                            <Button disabled={activeStep === 0} onClick={handleBack} size="large" variant="contained" color="secondary">Back</Button>
                            {!lastStep() ?
                                (
                                    < Button onClick={handleComplete} size="large" variant="contained" color="secondary">Next</Button>
                                ) : (
                                    < Button onClick={() => { createBot(); handleComplete(); }} size="large" variant="contained" color="secondary">To Glory</Button>
                                )
                            }
                        </Grid>
                    </React.Fragment>
                )}
            </Grid>
        </div >
    );
}
