import "./Dashboard.css";
import { Grid } from "@mui/material";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Animal } from "../../models/Animal";
import { AnimalWithBreed } from "../../models/AnimalWithBreed";
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
import ShelterAnimalForm from "./ShelterAnimalForm";
import MoneyManagement from "./MoneyManagement";
import DashboardItemContainer from "./DashboardItemContainer";

interface ShelterMainProps {
  shelterService: ShelterService;
}

export function Dashboard({ shelterService }: ShelterMainProps) {
  const [animalsWithBreeds, setAnimalsWithBreeds] = React.useState<
    AnimalWithBreed[]
  >([]);
  const [globalChart, setGlobalChart] = React.useState<
    PetRecommendationCounter[]
  >([]);

  const [shelter, setShelter] = React.useState<ShelterWithMaps | undefined>();

  const [shelteredAnimals, setShelteredAnimals] = React.useState<Animal[]>([]);

  const [moneyAvailable, setMoneyAvailable] = React.useState<number>(0);

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

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const handleErrorPopupClose = (reason?: string) => {
    if (reason === "clickaway") return;
    setErrorPopupOpen(false);
  };

  useEffect(() => {
    if (!shouldLoad.current) return;
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
        <DashboardItemContainer>
          <RecommendationsTable recommendations={globalChart} />
        </DashboardItemContainer>

        <DashboardItemContainer>
          <NotificationTable shelterService={shelterService} />
        </DashboardItemContainer>

        <DashboardItemContainer>
          <ShelteredAnimalsDisplay
            animals={shelteredAnimals}
            setAnimals={setShelteredAnimals}
            shelterService={shelterService}
            sendSuccessMessage={sendSuccessMessage}
            sendErrorMessage={sendErrorMessage}
          />
        </DashboardItemContainer>

        <DashboardItemContainer>
          <ShelterAnimalForm
            {...{
              animalsWithBreeds,
              sendErrorMessage,
              sendSuccessMessage,
              shelterService,
              setShelteredAnimals,
            }}
          />
        </DashboardItemContainer>

        <DashboardItemContainer>
          <Reports shelterService={shelterService} />
        </DashboardItemContainer>

        <DashboardItemContainer>
          <MoneyManagement
            {...{
              shelterService,
              moneyAvailable,
              setMoneyAvailable,
              sendSuccessMessage,
            }}
          />
        </DashboardItemContainer>

        <DashboardItemContainer xs={12} minHeight={"50vh"}>
          <AnimalsAndTheirFoodTable
            shelterService={shelterService}
            shelter={shelter}
            animals={animalsWithBreeds}
          />
        </DashboardItemContainer>

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
