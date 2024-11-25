import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ShelterService } from "../../../services/ShelterService";
import { AnimalWithBreed } from "../../../models/animals";
import { ShelterWithMaps } from "../../../models/types";
import { useNavigate } from "react-router-dom";
import { PopupMessage } from "../../PopupMessage";

interface FoodStuffProps {
  animals: AnimalWithBreed[];
  shelter?: ShelterWithMaps;
  shelterService: ShelterService;
  setShelter: React.Dispatch<React.SetStateAction<ShelterWithMaps | undefined>>;
  moneyAvailable: number;
  setMoneyAvailable: React.Dispatch<React.SetStateAction<number>>;
}

export function AnimalsAndTheirFoodTable({
  animals,
  shelter,
  shelterService,
  setShelter,
  moneyAvailable,
  setMoneyAvailable,
}: FoodStuffProps) {
  if (!Array.isArray(animals)) {
    return <p>Oopsie</p>;
  }
  const navigate = useNavigate();
  const [portionsToBuy, setPortionsToBuy] = useState<{ [key: string]: number }>(
    {}
  );
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleErrorPopupClose = (reason?: string) => {
    if (reason === "clickaway") return;
    setErrorPopupOpen(false);
  };

  const handlePortionChange = (animalType: string, quantity: number) => {
    setPortionsToBuy((prevState) => ({
      ...prevState,
      [animalType]: quantity,
    }));
  };

  const handleBuyFood = (animalType: string) => {
    if (!shelter) {
      return;
    }
    const portions = portionsToBuy[animalType];
    const priceForPortion = shelter.prices[animalType];
    const totalPrice = portions * priceForPortion;

    if (moneyAvailable < totalPrice) {
      setErrorMessage("There is a lack of funds for this transaction.");
      setIsSuccess(false);
      setErrorPopupOpen(true);
      return;
    }

    if (portions > 0) {
      shelterService
        .purchaseFood(animalType, portions)
        .then((response) => {
          setErrorMessage("Food bought successfully");
          setIsSuccess(true);
          setErrorPopupOpen(true);
          setShelter((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              foodAvailableForAnimals: {
                ...prev.foodAvailableForAnimals,
                [animalType]:
                  (prev.foodAvailableForAnimals[animalType] || 0) + portions,
              },
            };
          });
          setPortionsToBuy((prev) => {
            prev[animalType] = 0;
            return prev;
          });
          setMoneyAvailable(
            (prev) => prev - shelter.prices[animalType] * portions
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrorMessage("Please enter a valid number of portions to buy.");
      setIsSuccess(false);
      setErrorPopupOpen(true);
    }
  };

  return (
    <>
      {!shelter && <p>Loading...</p>}
      {shelter && (
        <form className={"flex-row"}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "67.5vh",
              overflowY: "scroll",
            }}
            paddingTop={3}
          >
            {Array.from(
              new Set(animals.map((animal) => animal.animalType))
            ).map((type, index) => (
              <Grid
                container
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Typography>
                    <b>{type}</b>
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                  <TextField
                    sx={{ width: "80%" }}
                    type={"number"}
                    label="Number of animals"
                    value={
                      shelter.animals.filter(
                        (animal) => animal.animalType === type
                      ).length
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                  <TextField
                    sx={{ width: "80%" }}
                    type={"number"}
                    label="Available food"
                    value={shelter.foodAvailableForAnimals[type]}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                  <TextField
                    sx={{ width: "80%" }}
                    type={"number"}
                    label="Price Per Portion (Dinars)"
                    value={shelter.prices[type]}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                  <TextField
                    sx={{ width: "80%" }}
                    type={"number"}
                    label="Number of portions to buy"
                    value={portionsToBuy[type] || ""}
                    onChange={(e) =>
                      handlePortionChange(type, parseInt(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => handleBuyFood(type)}
                  >
                    Buy food
                  </Button>
                </Grid>
              </Grid>
            ))}
            <PopupMessage
              message={errorMessage}
              isSuccess={isSuccess}
              handleClose={handleErrorPopupClose}
              open={errorPopupOpen}
            />
          </Grid>
        </form>
      )}
    </>
  );
}
