import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
} from "@mui/material";
import { fixAnimalBreedName } from "../../utils";
import { useForm } from "react-hook-form";
import { Animal } from "../../models/Animal";
import { AnimalWithBreed } from "../../models/AnimalWithBreed";
import { ShelterService } from "../../services/ShelterService";

interface AnimalsForm {
  name: string;
  animalBreed: string;
}

interface Props {
  animalsWithBreeds: AnimalWithBreed[];
  sendSuccessMessage: (msg: string) => void;
  sendErrorMessage: (msg: string) => void;
  shelterService: ShelterService;
  setShelteredAnimals: React.Dispatch<React.SetStateAction<Animal[]>>;
}
function ShelterAnimalForm({
  animalsWithBreeds,
  sendSuccessMessage,
  sendErrorMessage,
  shelterService,
  setShelteredAnimals,
}: Props) {
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
        resetAnimalsForm();
      })
      .catch((error) => {
        console.error("Error sheltering animal:", error);
      });
  };

  return (
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
          <FormControl fullWidth={true} error={!!animalsFormErrors.animalBreed}>
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
  );
}

export default ShelterAnimalForm;
