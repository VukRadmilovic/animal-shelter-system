import { Grid2 as Grid, ListItem, Chip, Button } from "@mui/material";
import { Animal } from "../../../models/animals";
import { useState } from "react";
import { ShelterService } from "../../../services/ShelterService";
import { fixAnimalBreedName } from "../../../utils";
import { PopupType, usePopup } from "../../PopupProvider";

interface Props {
  animals: Animal[];
  setAnimals: React.Dispatch<React.SetStateAction<Animal[]>>;
  shelterService: ShelterService;
}

function ShelteredAnimalsDisplay({
  animals,
  setAnimals,
  shelterService,
}: Props) {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const { displayPopup } = usePopup();

  const handleSelectAnimal = (animal: Animal) => {
    if (animal != selectedAnimal) {
      setSelectedAnimal(animal);
      return;
    }
    setSelectedAnimal(null);
  };

  const handleAdopt = () => {
    if (!selectedAnimal) {
      displayPopup("You need to select an animal first.", PopupType.ERROR);
      return;
    }
    shelterService
      .adoptAnimal(selectedAnimal)
      .then(() => {
        displayPopup("Animal adopted successfully", PopupType.SUCCESS);
        setAnimals((prev) => prev.filter((animal) => animal != selectedAnimal));
        setSelectedAnimal(null);
      })
      .catch((error) => {
        console.error("Error adopting animal:", error);
      });
  };
  return (
    <>
      <Grid
        container
        size={12}
        sx={{
          border: "1px solid gray",
          borderRadius: "1em",
          height: "30vh",
          flexDirection: "row",
          alignContent: "flex-start",
          overflowY: "auto",
          width: "96%",
        }}
        p={2}
        m={2}
        mr={-5}
      >
        {animals ? (
          animals.map((data) => {
            return (
              <ListItem
                key={data.name + " " + data.animalBreed}
                sx={{
                  width: "fit-content",
                  padding: "5px 10px !important",
                  cursor: "pointer",
                  backgroundColor:
                    selectedAnimal === data ? "lightgray" : "transparent",
                }}
                onClick={() => handleSelectAnimal(data)}
              >
                <Chip
                  label={
                    data.name +
                    " (" +
                    fixAnimalBreedName(data.animalBreed) +
                    ")"
                  }
                />
              </ListItem>
            );
          })
        ) : (
          <p>No animals sheltered yet...</p>
        )}
      </Grid>

      <Button
        onClick={handleAdopt}
        variant="contained"
        color="primary"
        className="margin-bottom-1vh"
      >
        Confirm adoption
      </Button>
    </>
  );
}

export default ShelteredAnimalsDisplay;
