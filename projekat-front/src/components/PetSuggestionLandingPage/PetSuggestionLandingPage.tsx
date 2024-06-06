import "./PetSuggestionLandingPage.css";
import {PetSuggestionsService} from "../../services/PetSuggestionsService.ts";
import {
    Avatar,
    Box,
    Button,
    FormControl, FormControlLabel,
    Grid, Radio,
    RadioGroup,
    Step,
    StepLabel,
    Stepper, TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useRef} from "react";
import {QuestionResponse} from "../../models/QuestionResponse.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {Suggestions} from "../../models/Suggestions.ts";
import {Questionnaire} from "../../models/Questionnaire.ts";

interface PetSuggestionLandingPageProps {
    suggestionService: PetSuggestionsService
}
export function PetSuggestionLandingPage({suggestionService} : PetSuggestionLandingPageProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [value, setValue] = React.useState<number>(-1);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<Suggestions | null>({suggestions: []});
    const [questions, setQuestions] = React.useState<Questionnaire | null>({questions: []});
    const shouldLoad = useRef(true);
    const handleErrorPopupClose = (reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorPopupOpen(false);
    };

    const handleReset = () => {
        window.location.reload();
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number((event.target as HTMLInputElement).value));
    };


    const handleNextQuestion = () => {
        console.log(activeStep)
        if(activeStep == 0) {
            sessionStorage.setItem('userId',(Math.floor(Math.random() * (2 ** 32)) - (2 ** 31)).toString());
        }
        const response : QuestionResponse = {
            userId: Number(sessionStorage.getItem('userId')),
            questionId: activeStep + 1,
            choice: value
        }
        suggestionService.sendResponse(response).then(() => {
            setValue(-1);
        }).catch((err) => {
            setErrorMessage(err.response.data);
            setIsSuccess(false);
            setErrorPopupOpen(true);
        });
        if(activeStep == questions!.questions.length - 1) {
            suggestionService.getSuggestions(sessionStorage.getItem('userId')!).then((suggestions) => {
                console.log(suggestions);
                setValue(-1);
                setSuggestions(suggestions);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                sessionStorage.removeItem('userId');
            }).catch((err) => {
                setErrorMessage(err.response.data);
                setIsSuccess(false);
                setErrorPopupOpen(true);
            });
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    }

    useEffect(() => {
        if(!shouldLoad.current) return;
        suggestionService.getQuestions().then((questionnaire) => {
           setQuestions(questionnaire);
        }).catch((err) => {
            setErrorMessage(err.response.data);
            setIsSuccess(false);
            setErrorPopupOpen(true);
        });
        shouldLoad.current = false;
    }, []);

    return (
        <>
            <Grid container justifyContent={'center'} className={'dark-background'}>
                <Grid container item xs={12} sm={12} md={10} lg={8} xl={8}
                      minHeight={'70vh'}
                      padding={2}
                      className="container rounded-container">
                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'}
                          alignSelf={'flex-start'} mb={3}>
                        <Typography variant='h3' textAlign={'center'} width={'100%'}>Find Your Ideal Pet!</Typography>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} height={'86%'} sx={{display:'flex'}}>
                        <Box sx={{ width: '100%', display:'flex', flexDirection:'column'}} >
                            <Stepper activeStep={activeStep}>
                                {questions!.questions.map((question) => {
                                    const stepProps: { completed?: boolean } = {};
                                    const labelProps: {
                                        optional?: React.ReactNode;
                                    } = {};
                                    return (
                                        <Step key={question.number} {...stepProps}>
                                            <StepLabel {...labelProps}></StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === questions!.questions.length ? (
                                <Grid xs={12} sm={12} md={12} lg={12} xl={12}
                                      pt={3}
                                      justifyContent={'center'}
                                      sx={{display:'flex',flexGrow:1, flexWrap:'wrap'}}
                                      >
                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'} mb={2}>
                                        <Typography variant='h4' textAlign={'center'} width={'100%'}>Your Ideal Pets Are:</Typography>
                                    </Grid>
                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'}>
                                    {suggestions!.suggestions.map((suggestion) => {
                                        return (
                                                <Grid className={'flex-column'}
                                                      textAlign={'center'}
                                                      alignItems={'center'}
                                                      justifyContent={'center'}
                                                      mt={2}
                                                      xs={12} sm={12} md={6} lg={2} xl={2}>
                                                    <Avatar
                                                    alt={suggestion.pet}
                                                    src={suggestion.picture}
                                                    sx={{ width: 100, height: 100, border:'2px solid gray', margin:'0 auto'}}/>
                                                    <Typography><b>{suggestion.pet}</b></Typography>
                                                </Grid>
                                        )
                                    })}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={20} className={'flex-row'} justifyContent={'center'}>
                                        <Button onClick={handleReset} variant={'contained'} className={'stick-to-bottom-right'} color={'secondary'}>Repeat The Test
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (

                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} width={'100%'}
                                      justifyContent={'center'} sx={{display:'flex', flexDirection:'column'}}>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}
                                          justifyContent={'center'}>
                                        <Typography fontSize={'large'} sx={{ mt: 3, mb: 3 }}><b>{activeStep + 1}. {questions!.questions[activeStep].text}</b></Typography>
                                        <FormControl>
                                            {activeStep < 10 ?
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={value}
                                                    onChange={handleValueChange}>
                                                    {questions!.questions[activeStep].answers.map((answer) => {
                                                        return <FormControlLabel sx={{marginBottom:'1em'}}
                                                                                 value={answer.number}
                                                                                 control={<Radio/>}
                                                                                 label={answer.text}/>
                                                    })}
                                                </RadioGroup> :
                                                <TextField
                                                    label="Answer"
                                                    value={value}
                                                    type={'number'}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setValue(Number(event.target.value));
                                                    }}
                                                />
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Button onClick={handleNextQuestion} variant={'contained'}
                                            className={'stick-to-bottom-right'}
                                            disabled={value == -1}>
                                        {activeStep === questions!.questions.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Grid>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <PopupMessage message={errorMessage} isSuccess={isSuccess} handleClose={handleErrorPopupClose} open={errorPopupOpen}/>
        </>
    );
}