import "./Dashboard.css";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Animal } from "../../models/Animal";
import { AnimalWithBreed } from "../../models/AnimalWithBreed";
import { useForm } from "react-hook-form";
import { AnimalsAndTheirFoodTable } from "./AnimalsAndTheirFoodTable";
import { ShelterService } from "../../services/ShelterService";
import { useNavigate } from "react-router-dom";
import { Reports } from "./Reports";
import { PetRecommendationCounter } from "../../models/GlobalChartEntry";
import { PopupMessage } from "../PopupMessage/PopupMessage";
import { ShelterWithMaps } from "../../models/ShelterWithMaps";
import RecommendationsTable from "./RecommendationsTable";
import NotificationTable from "./NotificationTable";
import ShelteredAnimalsDisplay from "./ShelteredAnimalsDisplay";
import { fixAnimalBreedName } from "../../utils";

export interface AnimalsForm {
  name: string;
  animalBreed: string;
}

export interface MoneyDepositForm {
  moneyToDeposit: number;
}

interface ShelterMainProps {
  shelterService: ShelterService;
}

export function Dashboard({ shelterService }: ShelterMainProps) {
  const {
    register: registerAnimalsForm,
    handleSubmit: handleSubmitAnimalsForm,
    formState: { errors: animalsFormErrors },
    reset: resetAnimalsForm,
  } = useForm<AnimalsForm>({
    defaultValues: {
      name: "",
      animalBreed: "",
    },
    mode: "onChange",
  });

  const {
    register: registerMoneyForm,
    handleSubmit: handleSubmitMoneyForm,
    formState: { errors: moneyFormErrors },
    reset: resetMoneyForm,
  } = useForm<MoneyDepositForm>({
    defaultValues: {
      moneyToDeposit: 0,
    },
    mode: "onChange",
  });

  const [animalsWithBreeds, setAnimalsWithBreeds] = React.useState<
    AnimalWithBreed[]
  >([]);
  const [globalChart, setGlobalChart] = React.useState<
    PetRecommendationCounter[]
  >([]);

  const [shelter, setShelter] = React.useState<ShelterWithMaps | undefined>();
  const [moneyAvailable, setMoneyAvailable] = React.useState<number>(0);

  const [shelteredAnimals, setShelteredAnimals] = React.useState<Animal[]>([]);

  const sendSuccessMessage = (message: string) => {
    setErrorMessage(message);
    setIsSuccess(true);
    setErrorPopupOpen(true);
  };

  const sendErrorMessage = (message: string) => {
    setErrorMessage(message);
    setIsSuccess(false);
    setErrorPopupOpen(true);
  };

  const navigate = useNavigate();
  const shouldLoad = useRef(true);

  const onSubmitAnimalsForm = (data: AnimalsForm) => {
    const foundAnimalWithNeededBreed = animalsWithBreeds.find(
      (animal) => animal.animalBreed === data.animalBreed
    );

    if (!foundAnimalWithNeededBreed) {
      console.log(
        "Unexpected error, haven't found animal with needed breed. It's likely that the animal list didn't load yet."
      );
      sendErrorMessage("Please try again.");
      return;
    }

    const animal: Animal = {
      name: data.name,
      animalBreed: data.animalBreed,
      animalType: foundAnimalWithNeededBreed.animalType,
    };
    console.log("Form data:", animal);
    shelterService
      .shelterAnimal(animal)
      .then(() => {
        sendSuccessMessage("Animal sheltered successfully");
        setShelteredAnimals((prev) => [...prev, animal]);
      })
      .catch((error) => {
        console.error("Error sheltering animal:", error);
      });
  };

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const handleErrorPopupClose = (reason?: string) => {
    if (reason === "clickaway") return;
    setErrorPopupOpen(false);
  };

  const onDepositMoneySubmit = (data: MoneyDepositForm) => {
    shelterService
      .depositMoney(data.moneyToDeposit)
      .then(() => {
        sendSuccessMessage("Money deposited successfully");
        setMoneyAvailable((prev) => prev + Number(data.moneyToDeposit));
      })
      .catch((error) => {
        console.error("Error depositing money:", error);
      });
  };

  useEffect(() => {
    if (!shouldLoad.current) return;
    console.log("FoodStuff component mounted");
    shelterService
      .checkShelter()
      .then((result) => {
        if (!result) navigate("/auth");
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
        console.log(err);
      });
    shelterService
      .getGlobalChart()
      .then((chartData) => {
        console.log(chartData);
        setGlobalChart(chartData.top5);
      })
      .catch((err) => {
        console.log("FAILED TO GET GLOBAL CHART");
        console.log(err);
      });
    shelterService
      .getShelter()
      .then((shelter) => {
        console.log(shelter);
        setShelter(shelter);
        setMoneyAvailable(shelter.moneyAvailable);
        setShelteredAnimals(shelter.animals);
      })
      .catch((err) => {
        console.log(err);
      });
    shouldLoad.current = false;
  }, [navigate, shelterService]);

  return (
    <>
      <h1> Shelter dashboard </h1>
      <Grid container className={"dark-background"}>
        <Grid
          container
          item
          xs={5.7}
          minHeight={"40vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          m={2}
        >
          <RecommendationsTable recommendations={globalChart} />
        </Grid>
        <Grid
          container
          item
          xs={5.7}
          minHeight={"40vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          m={2}
        >
          <NotificationTable shelterService={shelterService} />
        </Grid>
        <Grid
          container
          item
          xs={5.7}
          minHeight={"40vh"}
          sx={{
            display: "block",
            alignContent: "center",
          }}
          className="container rounded-container"
          m={2}
        >
          <ShelteredAnimalsDisplay
            animals={shelteredAnimals}
            setAnimals={setShelteredAnimals}
            shelterService={shelterService}
            sendSuccessMessage={sendSuccessMessage}
            sendErrorMessage={sendErrorMessage}
          />
        </Grid>
        <Grid
          container
          item
          xs={5.7}
          minHeight={"40vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          m={2}
        >
          <form className={"width-100"}>
            <Grid
              item
              container
              spacing={2}
              pt={3}
              pl={4}
              pr={4}
              xs={12}
              justifyContent={"center"}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl
                  fullWidth={true}
                  error={!!animalsFormErrors.animalBreed}
                >
                  <InputLabel id="breed">Breed</InputLabel>
                  <Select
                    labelId="breed"
                    defaultValue=""
                    {...registerAnimalsForm("animalBreed", {
                      required: "Breed is a required field!",
                    })}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {animalsWithBreeds.map((animal, index) => {
                      return (
                        <MenuItem key={index} value={animal.animalBreed}>
                          {fixAnimalBreedName(animal.animalBreed)}
                        </MenuItem>
                      );
                    })}
                    ;
                  </Select>
                  {animalsFormErrors.animalBreed ? (
                    <FormHelperText>
                      {animalsFormErrors.animalBreed.message}
                    </FormHelperText>
                  ) : (
                    <FormHelperText>Required</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  label="Name"
                  fullWidth={true}
                  {...registerAnimalsForm("name", {
                    required: "Name is a required field!",
                  })}
                  error={!!animalsFormErrors.name}
                  helperText={
                    animalsFormErrors.name
                      ? animalsFormErrors.name?.message
                      : "Required"
                  }
                />
              </Grid>
              <Grid item xs={12} mt={5}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitAnimalsForm(onSubmitAnimalsForm)}
                >
                  Confirm sheltering
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid
          container
          item
          xs={5.7}
          minHeight={"40vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          m={2}
        >
          <Reports shelterService={shelterService} />
        </Grid>
        <Grid
          container
          item
          xs={5.7}
          minHeight={"40vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          m={2}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              id="moneyAvailable"
              label="Available money"
              value={moneyAvailable || ""}
              sx={{ width: "93%" }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <FormControl>
            <Grid item xs={12} mt={2.5}>
              <TextField
                id="moneyToDeposit"
                label="Money to deposit"
                sx={{ width: "93%" }}
                {...registerMoneyForm("moneyToDeposit", {
                  required: "Money to deposit is a required field!",
                })}
                error={!!moneyFormErrors.moneyToDeposit}
                helperText={
                  moneyFormErrors.moneyToDeposit
                    ? moneyFormErrors.moneyToDeposit?.message
                    : "Required"
                }
              />
            </Grid>
            <Grid item xs={12} mt={5}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmitMoneyForm(onDepositMoneySubmit)}
              >
                Deposit money
              </Button>
            </Grid>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          xs={12}
          minHeight={"50vh"}
          sx={{ display: "block", alignContent: "center" }}
          className="container rounded-container"
          m={2}
        >
          <AnimalsAndTheirFoodTable
            shelterService={shelterService}
            shelter={shelter}
            animals={animalsWithBreeds}
          />
        </Grid>
        <PopupMessage
          message={errorMessage}
          isSuccess={isSuccess}
          handleClose={handleErrorPopupClose}
          open={errorPopupOpen}
        />
      </Grid>
    </>
  );
}
