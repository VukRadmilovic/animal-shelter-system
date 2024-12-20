import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ShelterService } from "../../../services/ShelterService";
import { ShelterWithMaps } from "../../../models/types";
import { PopupType, usePopup } from "../../PopupProvider";
import { NamelessAnimal } from "../../../models/animals";

interface FoodStuffProps {
  animals: NamelessAnimal[];
  shelter?: ShelterWithMaps;
  shelterService: ShelterService;
  setShelter: React.Dispatch<React.SetStateAction<ShelterWithMaps | undefined>>;
  moneyAvailable: number;
  setMoneyAvailable: React.Dispatch<React.SetStateAction<number>>;
}

export function AnimalFoodTable({
  animals,
  shelter,
  shelterService,
  setShelter,
  moneyAvailable,
  setMoneyAvailable,
}: FoodStuffProps) {
  const { displayPopup } = usePopup();

  if (!Array.isArray(animals)) {
    return <p>Loading...</p>;
  }

  const [portionsToBuy, setPortionsToBuy] = useState<{ [key: string]: number }>(
    {}
  );

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
      displayPopup(
        "There is a lack of funds for this transaction.",
        PopupType.ERROR
      );
      return;
    }

    if (portions <= 0) {
      displayPopup(
        "Please enter a valid number of portions to buy.",
        PopupType.ERROR
      );
      return;
    }

    shelterService
      .purchaseFood(animalType, portions)
      .then((_) => {
        displayPopup("Food purchased!", PopupType.SUCCESS);
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
  };

  return (
    <>
      {!shelter && <p>Loading...</p>}
      {shelter && (
        <form className={"flex-row"}>
          <Grid
            container
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
                  width: "100%",
                }}
              >
                <Grid size={2}>
                  <Typography>
                    <b>{type}</b>
                  </Typography>
                </Grid>
                <Grid p={1} size={2}>
                  <TextField
                    sx={{ width: "85%" }}
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
                <Grid p={1} size={2}>
                  <TextField
                    sx={{ width: "85%" }}
                    type={"number"}
                    label="Available food"
                    value={shelter.foodAvailableForAnimals[type]}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid p={1} size={2}>
                  <TextField
                    sx={{ width: "85%" }}
                    type={"number"}
                    label="Price Per Portion (Dinars)"
                    value={shelter.prices[type]}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid p={1} size={2}>
                  <TextField
                    sx={{ width: "85%" }}
                    type={"number"}
                    label="Number of portions to buy"
                    value={portionsToBuy[type] || ""}
                    onChange={(e) =>
                      handlePortionChange(type, parseInt(e.target.value))
                    }
                  />
                </Grid>
                <Grid p={1} size={2}>
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
          </Grid>
        </form>
      )}
    </>
  );
}
