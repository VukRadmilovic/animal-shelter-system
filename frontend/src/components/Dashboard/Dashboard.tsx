import "./Dashboard.css";
import { Grid2 as Grid } from "@mui/material";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Animal } from "../../models/animals";
import { AnimalWithBreed } from "../../models/animals";
import { AnimalsAndTheirFoodTable } from "./Items/AnimalsAndTheirFoodTable";
import { ShelterService } from "../../services/ShelterService";
import { useNavigate } from "react-router-dom";
import { Reports } from "./Items/Reports";
import { PetRecommendationCounter } from "../../models/types";
import { ShelterWithMaps } from "../../models/types";
import RecommendationsTable from "./Items/RecommendationsTable";
import NotificationTable from "./Items/NotificationTable";
import ShelteredAnimalsDisplay from "./Items/ShelteredAnimalsDisplay";
import ShelterAnimalForm from "./Items/ShelterAnimalForm";
import MoneyManagement from "./Items/MoneyManagement";
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

  const navigate = useNavigate();

  useEffect(() => {
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
  }, [shelterService]);

  return (
    <>
      <h1> {sessionStorage.getItem("full_name")}'s shelter dashboard </h1>
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
          />
        </DashboardItemContainer>

        <DashboardItemContainer>
          <ShelterAnimalForm
            {...{
              animalsWithBreeds,
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
            }}
          />
        </DashboardItemContainer>

        <DashboardItemContainer xs={12} minHeight={"50vh"}>
          <AnimalsAndTheirFoodTable
            shelterService={shelterService}
            shelter={shelter}
            animals={animalsWithBreeds}
            setShelter={setShelter}
            moneyAvailable={moneyAvailable}
            setMoneyAvailable={setMoneyAvailable}
          />
        </DashboardItemContainer>
      </Grid>
    </>
  );
}
