import "./PetSuggestionLandingPage.css";
import { PetSuggestionsService } from "../services/PetSuggestionsService.ts";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { UsersQuestionResponse } from "../models/questionnaire.ts";
import { Suggestions } from "../models/questionnaire.ts";
import { Questionnaire } from "../models/questionnaire.ts";
import { PopupType, usePopup } from "./PopupProvider.tsx";

interface PetSuggestionLandingPageProps {
  suggestionService: PetSuggestionsService;
}
export function PetSuggestionLandingPage({
  suggestionService,
}: PetSuggestionLandingPageProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState<number>(-1);

  const [suggestions, setSuggestions] = React.useState<Suggestions | null>({
    suggestions: [],
  });
  const [questions, setQuestions] = React.useState<Questionnaire | null>({
    questions: [],
  });

  const { displayPopup } = usePopup();

  const handleReset = () => {
    window.location.reload();
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value));
  };

  const handleNextQuestion = () => {
    if (activeStep == 0) {
      sessionStorage.setItem(
        "userId",
        (Math.floor(Math.random() * 2 ** 32) - 2 ** 31).toString()
      );
    }
    const response: UsersQuestionResponse = {
      userId: Number(sessionStorage.getItem("userId")),
      questionId: activeStep + 1,
      choice: value,
    };
    suggestionService
      .sendResponse(response)
      .then(() => {
        setValue(-1);
      })
      .catch((err) => {
        displayPopup(err.response.data, PopupType.ERROR);
      });
    if (activeStep == questions!.questions.length - 1) {
      suggestionService
        .getSuggestions(sessionStorage.getItem("userId")!)
        .then((suggestions) => {
          console.log(suggestions);
          setValue(-1);
          setSuggestions(suggestions);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          sessionStorage.removeItem("userId");
        })
        .catch((err) => {
          displayPopup(err.response.data, PopupType.ERROR);
        });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  useEffect(() => {
    suggestionService
      .getQuestions()
      .then((questionnaire) => {
        setQuestions(questionnaire);
      })
      .catch((err) => {
        console.log("Error while loading questions.", err);
      });
  }, []);

  return (
    <>
      <Grid container justifyContent={"center"} className={"dark-background"}>
        <Grid
          container
          minHeight={"70vh"}
          padding={2}
          className="container rounded-container"
          size={{
            xs: 12,
            md: 10,
            lg: 8,
          }}
        >
          <Grid
            container
            justifyContent={"center"}
            alignSelf={"flex-start"}
            mb={3}
            size={12}
          >
            <Typography variant="h3" textAlign={"center"} width={"100%"}>
              Find Your Ideal Pet!
            </Typography>
          </Grid>
          <Grid container height={"86%"} sx={{ display: "flex" }} size={12}>
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
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
                <Grid
                  pt={3}
                  justifyContent={"center"}
                  sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
                  size={12}
                >
                  <Grid container justifyContent={"center"} mb={2} size={12}>
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      width={"100%"}
                    >
                      Your Ideal Pets Are:
                    </Typography>
                  </Grid>
                  <Grid container justifyContent={"center"} size={12}>
                    {suggestions!.suggestions.map((suggestion) => {
                      return (
                        <Grid
                          className={"flex-column"}
                          textAlign={"center"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          mt={2}
                          size={{
                            xs: 12,
                            md: 6,
                            lg: 2,
                          }}
                          key={suggestion.pet}
                        >
                          <Avatar
                            alt={suggestion.pet}
                            src={suggestion.picture}
                            sx={{
                              width: 100,
                              height: 100,
                              border: "2px solid gray",
                              margin: "0 auto",
                            }}
                          />
                          <Typography>
                            <b>{suggestion.pet}</b>
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid
                    mt={20}
                    className={"flex-row"}
                    justifyContent={"center"}
                    size={12}
                  >
                    <Button
                      onClick={handleReset}
                      variant={"contained"}
                      className={"stick-to-bottom-right"}
                      color={"secondary"}
                    >
                      Repeat The Test
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  width={"100%"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  size={12}
                >
                  <Grid justifyContent={"center"} size={12} height={"100%"}>
                    <Typography fontSize={"large"} sx={{ mt: 3, mb: 3 }}>
                      <b>
                        {activeStep + 1}.{" "}
                        {questions!.questions[activeStep].text}
                      </b>
                    </Typography>
                    <FormControl>
                      {activeStep < 10 ? (
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleValueChange}
                        >
                          {questions!.questions[activeStep].answers.map(
                            (answer) => {
                              return (
                                <FormControlLabel
                                  sx={{ marginBottom: "1em" }}
                                  value={answer.number}
                                  control={<Radio />}
                                  label={answer.text}
                                  key={activeStep + "," + answer.number}
                                />
                              );
                            }
                          )}
                        </RadioGroup>
                      ) : (
                        <TextField
                          label="Answer"
                          value={value}
                          type={"number"}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setValue(Number(event.target.value));
                          }}
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Button
                    onClick={handleNextQuestion}
                    variant={"contained"}
                    className={"stick-to-bottom-right"}
                    disabled={value == -1}
                  >
                    {activeStep === questions!.questions.length - 1
                      ? "Finish"
                      : "Next"}
                  </Button>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
