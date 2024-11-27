import {
  Button,
  Grid2 as Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { ShelterService } from "../../services/ShelterService.ts";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AnimalWithBreed } from "../../models/animals.ts";
import { AnimalsInitialization } from "./AnimalsInitialization.tsx";
import { FoodAndPricesInitialization } from "./FoodAndPricesInitialization.tsx";
import { Shelter } from "../../models/types.ts";
import { useNavigate } from "react-router-dom";
import { PopupType, usePopup } from "../PopupProvider.tsx";

interface ShelterRegistrationProps {
  shelterService: ShelterService;
}

interface GeneralInfoForm {
  name: string;
  address: string;
  capacity: number;
  moneyAvailable: number;
}

const steps = ["General Info", "Animals", "Food & Prices"];

export function ShelterRegistration({
  shelterService,
}: ShelterRegistrationProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralInfoForm>({
    defaultValues: {
      name: "",
      address: "",
      capacity: 0,
      moneyAvailable: 0,
    },
    mode: "onChange",
  });

  const { displayPopup } = usePopup();

  const navigate = useNavigate();
  const [animalsWithBreeds, setAnimalsWithBreeds] = React.useState<
    AnimalWithBreed[]
  >([]);
  const [isDoneAnimals, setIsDoneAnimals] = React.useState(false);
  const [isDoneFood, setIsDoneFood] = React.useState(false);
  const [shelter, setShelter] = React.useState<Shelter>({
    name: "",
    address: "",
    moneyAvailable: 0,
    capacity: 0,
    animals: [],
    foodAvailableForAnimals: [],
    prices: [],
  });
  const [isFinished, setIsFinished] = React.useState(false);

  const onSubmit = (data: GeneralInfoForm) => {
    shelter.name = data.name.trim();
    shelter.address = data.address.trim();
    shelter.moneyAvailable = data.moneyAvailable;
    shelter.capacity = data.capacity;
    setShelter(shelter);
    handleNext();
  };

  useEffect(() => {
    console.log("sheltr reg start");
    shelterService
      .checkShelter()
      .then((result) => {
        if (result) navigate("/auth");
      })
      .catch((err) => {
        console.log(err);
      });
    shelterService
      .getAnimalsWithBreeds()
      .then((animals) => {
        setAnimalsWithBreeds(animals.animals);
      })
      .catch((err) => {
        displayPopup(err.response.data, PopupType.ERROR);
      });
    console.log("sheltr reg end");
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className={"dark-background"}
      >
        <Grid
          container
          minHeight={"70vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          p={2}
          size={{
            xs: 12,
            md: 10,
            lg: 8,
          }}
        >
          {isFinished ? (
            <Grid textAlign={"center"} sx={{ alignSelf: "center" }} p={2}>
              <Typography variant={"h4"}>
                Shelter successfully registered! You can register workers and
                use the app by clicking the button below.
              </Typography>
              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "2em" }}
                onClick={() => navigate("/auth")}
              >
                Login/Sign Up
              </Button>
            </Grid>
          ) : (
            <div>
              <Grid
                container
                mb={2}
                justifyContent={"center"}
                height={"fit-content"}
                size={12}
              >
                <Typography variant="h3" textAlign={"center"} width={"100%"}>
                  Register Shelter
                </Typography>
              </Grid>
              <Grid container mb={3} justifyContent={"center"} size={12}>
                <Stepper activeStep={activeStep} sx={{ width: "100%" }}>
                  {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                      optional?: React.ReactNode;
                    } = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Grid>
              <Grid container justifyContent={"center"} size={12}>
                {activeStep == 0 ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                      width={"100%"}
                      mt={7}
                      height={"100%"}
                      justifyContent={"center"}
                    >
                      <Grid
                        container
                        direction={"row"}
                        justifyContent={"center"}
                        size={12}
                      >
                        <Grid
                          container
                          rowSpacing={1.5}
                          pl={2}
                          pr={2}
                          size={{
                            xs: 10,
                            md: 6,
                          }}
                        >
                          <Grid container justifyContent={"center"} size={12}>
                            <Grid size={12}>
                              <TextField
                                id="name"
                                label="Name"
                                fullWidth={true}
                                {...register("name", {
                                  required: "Name is a required field!",
                                })}
                                error={!!errors.name}
                                helperText={
                                  errors.name
                                    ? errors.name?.message
                                    : "Required"
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container justifyContent={"center"} size={12}>
                            <Grid size={12}>
                              <TextField
                                id="address"
                                label="Address"
                                fullWidth={true}
                                {...register("address", {
                                  required: "Address is a required field!",
                                })}
                                error={!!errors.address}
                                helperText={
                                  errors.address
                                    ? errors.address?.message
                                    : "Required"
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          rowSpacing={1.5}
                          pl={2}
                          pr={2}
                          size={{
                            xs: 10,
                            md: 6,
                          }}
                        >
                          <Grid container justifyContent={"center"} size={12}>
                            <Grid size={12}>
                              <TextField
                                id="capacity"
                                label="Capacity"
                                type={"number"}
                                fullWidth={true}
                                {...register("capacity", {
                                  required: "Capacity is a required field!",
                                  validate: (value) =>
                                    value > 0 || "Capacity must at least 1!",
                                })}
                                error={!!errors.capacity}
                                helperText={
                                  errors.capacity
                                    ? errors.capacity?.message
                                    : "Required"
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container justifyContent={"center"} size={12}>
                            <Grid size={12}>
                              <TextField
                                id="money"
                                label="Available Money (Dinars)"
                                type={"number"}
                                fullWidth={true}
                                {...register("moneyAvailable", {
                                  required:
                                    "Available Money is a required field!",
                                  validate: (value) =>
                                    value > 0 ||
                                    "Available Money must be greater than 0!",
                                })}
                                error={!!errors.moneyAvailable}
                                helperText={
                                  errors.moneyAvailable
                                    ? errors.moneyAvailable?.message
                                    : "Required"
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          mt={9}
                          justifyContent={"right"}
                          sx={{ display: "flex" }}
                          size={12}
                        >
                          <Button variant="contained" type="submit">
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                ) : activeStep == 1 ? (
                  <Grid container size={11}>
                    <AnimalsInitialization
                      animals={animalsWithBreeds}
                      setShelter={setShelter}
                      isDone={isDoneAnimals}
                    />
                    <Grid container mt={1} justifyContent={"right"} size={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsDoneAnimals(true);
                          handleNext();
                        }}
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container size={12}>
                    <FoodAndPricesInitialization
                      animals={animalsWithBreeds}
                      shelter={shelter}
                      shelterService={shelterService}
                      setShelter={setShelter}
                      isDone={isDoneFood}
                      setFinished={setIsFinished}
                    />
                    <Grid container mt={1} justifyContent={"right"} size={12}>
                      <Button
                        variant="contained"
                        onClick={() => setIsDoneFood(true)}
                      >
                        Finish
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
