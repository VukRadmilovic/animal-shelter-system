import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { NamelessAnimal } from "../../models/animals.ts";
import { Animal } from "../../models/animals.ts";
import { useEffect, useState } from "react";
import { Shelter } from "../../models/types.ts";
import { fixAnimalBreedName } from "../../utils.ts";
import { PopupType, usePopup } from "../PopupProvider.tsx";

export interface AnimalsForm {
  name: string;
  breed: string;
}

interface AnimalsInitializationProps {
  animals: NamelessAnimal[];
  setShelter: React.Dispatch<React.SetStateAction<Shelter>>;
  isDone: boolean;
}

export function AnimalsInitialization({
  animals,
  setShelter,
  isDone,
}: AnimalsInitializationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalsForm>({
    defaultValues: {
      name: "",
      breed: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: AnimalsForm) => addAnimal(data);
  const [addedAnimals, setAddedAnimals] = useState<Animal[]>([]);

  const { displayPopup } = usePopup();

  useEffect(() => {
    setShelter((prev) => ({ ...prev, animals: addedAnimals }));
  }, [isDone]);

  const addAnimal = (data: AnimalsForm) => {
    if (
      addedAnimals.filter(
        (chip) => chip.name == data.name && chip.animalBreed == data.breed
      ).length > 0
    ) {
      displayPopup(
        "Animal with the specified name and breed already exists!",
        PopupType.ERROR
      );
      return;
    }
    const animalWithBreed = animals.filter(
      (animal) => animal.animalBreed == data.breed
    );
    addedAnimals.push({
      name: data.name,
      animalBreed: data.breed,
      animalType: animalWithBreed[0].animalType,
    });
  };

  const handleAnimalDelete = (chipToDelete: Animal) => () => {
    setAddedAnimals((chips) =>
      chips.filter((chip) => chip.name !== chipToDelete.name)
    );
  };

  return (
    <>
      <Grid
        container
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <form className={"width-100"} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            pt={3}
            pl={4}
            pr={4}
            justifyContent={"center"}
            size={12}
          >
            <Grid size={12}>
              <FormControl fullWidth={true} error={!!errors.breed}>
                <InputLabel id="breed">Breed</InputLabel>
                <Select
                  labelId="breed"
                  defaultValue=""
                  {...register("breed", {
                    required: "Breed is a required field!",
                  })}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {animals.map((animal) => {
                    return (
                      <MenuItem
                        key={animal.animalBreed}
                        value={animal.animalBreed}
                      >
                        {fixAnimalBreedName(animal.animalBreed)}
                      </MenuItem>
                    );
                  })}
                  ; helperText=
                  {errors.breed ? errors.breed?.message : "Required"}
                </Select>
                {errors.breed ? (
                  <FormHelperText>{errors.breed.message}</FormHelperText>
                ) : (
                  <FormHelperText>Required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField
                id="name"
                label="Name"
                fullWidth={true}
                {...register("name", {
                  required: "Name is a required field!",
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : "Required"}
              />
            </Grid>
            <Grid mt={5} size={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Animal
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid
        container
        pr={4}
        sx={{
          border: "1px solid gray",
          borderRadius: "1em",
          boxShadow: "none",
          height: "40vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          alignContent: "flex-start",
          overflowY: "scroll",
          overflowX: "hidden",
          listStyle: "none",
        }}
        size={{
          xs: 12,
          md: 6,
        }}
        width={"100%"}
      >
        {addedAnimals.map((data) => {
          return (
            <ListItem
              key={data.name + " " + data.animalBreed}
              sx={{ width: "fit-content", padding: "5px 10px !important" }}
            >
              <Chip
                label={
                  data.name + "(" + fixAnimalBreedName(data.animalBreed) + ")"
                }
                onDelete={handleAnimalDelete(data)}
              />
            </ListItem>
          );
        })}
      </Grid>
    </>
  );
}
