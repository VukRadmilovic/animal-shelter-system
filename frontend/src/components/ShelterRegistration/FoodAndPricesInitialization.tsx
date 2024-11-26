import { AnimalWithBreed } from "../../models/animals.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { Shelter } from "../../models/types.ts";
import { useEffect } from "react";
import { FoodAvailableForAnimal } from "../../models/types.ts";
import { Price } from "../../models/types.ts";
import { ShelterService } from "../../services/ShelterService.ts";
import { PopupType, usePopup } from "../PopupProvider.tsx";

interface FoodAndPricesInitializationProps {
  animals: AnimalWithBreed[];
  shelter: Shelter;
  setShelter: (shelter: Shelter) => void;
  isDone: boolean;
  shelterService: ShelterService;
  setFinished: (status: boolean) => void;
}

interface FoodAndPricesForm {
  type: string;
  food: number;
  price: number;
}

export function FoodAndPricesInitialization({
  animals,
  shelter,
  setShelter,
  isDone,
  shelterService,
  setFinished,
}: FoodAndPricesInitializationProps) {
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FoodAndPricesForm[]>({
    mode: "onChange",
  });

  const { displayPopup } = usePopup();

  const validateAndFinish = async () => {
    const isValid = await trigger();
    let prices: Price[] = [];
    let food: FoodAvailableForAnimal[] = [];
    if (isValid) {
      Array.from(new Set(animals.map((animal) => animal.animalType))).map(
        (type, index) => {
          const foodAvailable: FoodAvailableForAnimal = {
            animalType: type,
            portionCount: getValues()[index].food,
          };
          food.push(foodAvailable);
          const price: Price = {
            animalType: type,
            pricePerPortion: getValues()[index].price,
          };
          prices.push(price);
        }
      );
      shelter.foodAvailableForAnimals = food;
      shelter.prices = prices;
      setShelter(shelter);
      shelterService
        .registerShelter(shelter)
        .then((msg) => {
          displayPopup(msg, PopupType.SUCCESS);
          setFinished(true);
        })
        .catch((err) => {
          displayPopup(err.response.data, PopupType.ERROR);
        });
    }
  };

  useEffect(() => {
    if (!isDone) return;
    validateAndFinish();
  }, [isDone]);

  const onSubmit: SubmitHandler<FoodAndPricesForm[]> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex-row"}>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "45vh",
            overflowY: "scroll",
          }}
        >
          {Array.from(new Set(animals.map((animal) => animal.animalType))).map(
            (type, index) => (
              <Grid
                container
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                key={index}
              >
                <Grid size={2}>
                  <Typography>
                    <b>{type}</b>
                  </Typography>
                </Grid>
                <Grid p={1} size={5}>
                  <TextField
                    sx={{ width: "80%" }}
                    type={"number"}
                    label="Food Portions Available"
                    {...register(`${index}.food`, {
                      required: "Food Portions is a required field!",
                      validate: (value) =>
                        value > -1 || "Food Portions must be non-negative!",
                    })}
                    error={!!errors?.[index]?.food}
                    helperText={errors?.[index]?.food?.message}
                  />
                </Grid>
                <Grid p={1} size={5}>
                  <TextField
                    sx={{ width: "80%" }}
                    type={"number"}
                    label="Price Per Portion (Dinars)"
                    {...register(`${index}.price`, {
                      required: "Price Per Portion is a required field!",
                      validate: (value) =>
                        value > 0 || "Price Per Portion  must be positive!",
                    })}
                    error={!!errors?.[index]?.price}
                    helperText={errors?.[index]?.price?.message}
                  />
                </Grid>
              </Grid>
            )
          )}
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ display: "none" }}
            >
              Add Animal
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
