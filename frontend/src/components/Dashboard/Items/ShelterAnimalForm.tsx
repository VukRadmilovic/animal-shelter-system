import {
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
} from "@mui/material";
import { fixAnimalBreedName } from "../../../utils";
import { useForm } from "react-hook-form";
import { Animal } from "../../../models/animals";
import { NamelessAnimal } from "../../../models/animals";
import { ShelterService } from "../../../services/ShelterService";
import { PopupType, usePopup } from "../../PopupProvider";

interface AnimalsForm {
  name: string;
  animalBreed: string;
}

interface Props {
  animalsWithBreeds: NamelessAnimal[];
  shelterService: ShelterService;
  setShelteredAnimals: React.Dispatch<React.SetStateAction<Animal[]>>;
}
function ShelterAnimalForm({
  animalsWithBreeds,
  shelterService,
  setShelteredAnimals,
}: Props) {
  const { displayPopup } = usePopup();

  const {
    register: registerAnimalsForm,
    handleSubmit: handleSubmitAnimalsForm,
    formState: { errors: animalsFormErrors },
    // reset: resetAnimalsForm,
    watch,
  } = useForm<AnimalsForm>({
    defaultValues: {
      name: "",
      animalBreed: "",
    },
    mode: "onChange",
  });

  const animalBreedValue = watch("animalBreed");

  const onSubmitAnimalsForm = (data: AnimalsForm) => {
    const foundAnimalWithNeededBreed = animalsWithBreeds.find(
      (animal) => animal.animalBreed === data.animalBreed
    );

    if (!foundAnimalWithNeededBreed) {
      console.log(
        "Unexpected error, haven't found animal with needed breed. It's likely that the animal list didn't load yet."
      );
      displayPopup("Please try again.", PopupType.ERROR);
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
        displayPopup("Animal sheltered successfully", PopupType.SUCCESS);
        setShelteredAnimals((prev) => [...prev, animal]);
        // resetAnimalsForm();
      })
      .catch((error) => {
        console.error("Error sheltering animal:", error);
      });
  };

  return (
    <form className={"width-100"}>
      <Grid
        container
        spacing={2}
        pt={3}
        pl={4}
        pr={4}
        size={12}
        justifyContent={"center"}
      >
        <Grid size={12}>
          <FormControl fullWidth={true} error={!!animalsFormErrors.animalBreed}>
            <InputLabel id="breed">Breed</InputLabel>
            <Select
              labelId="breed"
              defaultValue=""
              value={animalBreedValue}
              {...registerAnimalsForm("animalBreed", {
                required: "Breed is a required field!",
              })}
            >
              <MenuItem key={-1} value="">
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
        <Grid size={12}>
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
        <Grid size={12} mt={5}>
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
