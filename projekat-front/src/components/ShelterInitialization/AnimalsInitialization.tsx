import {
    Button, Chip,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    ListItem,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {AnimalWithBreed} from "../../models/AnimalWithBreed.ts";
import {Animal} from "../../models/Animal.ts";
import React, {useState} from "react";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";

interface AnimalsForm {
    name: string,
    breed: string
}

interface AnimalsInitializationProps {
    animals : AnimalWithBreed[]
}

export function AnimalsInitialization({animals} : AnimalsInitializationProps) {
    const {register,handleSubmit, formState: {errors}} = useForm<AnimalsForm>({
        defaultValues: {
            name: "",
            breed: ""
        },
        mode: "onChange"
    });
    const onSubmit = (data: AnimalsForm) => addAnimal(data)
    const [addedAnimals, setAddedAnimals] = useState<Animal[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const handleErrorPopupClose = (reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorPopupOpen(false);
    };

    const addAnimal = (data : AnimalsForm) => {
        if (addedAnimals.filter(chip => chip.name == data.name && chip.animalBreed == data.breed).length > 0) {
            setErrorMessage("Animal with the specified name and breed already exists!");
            setIsSuccess(false);
            setErrorPopupOpen(true);
            return;
        }
        const animalWithBreed = animals.filter(animal => animal.animalBreed == data.breed);
        addedAnimals.push({name: data.name, animalBreed: data.breed, animalType: animalWithBreed[0].animalType});
    }

    const handleAnimalDelete = (chipToDelete: Animal) => () => {
        setAddedAnimals((chips) => chips.filter((chip) => chip.name !== chipToDelete.name));
    };

    return (
        <>
                <Grid item container xs={10} sm={10} md={6} lg={6} xl={6}>
                    <form className={'width-100'} onSubmit={handleSubmit(onSubmit)}>
                        <Grid item container
                              spacing={2}
                              pt={3}
                              pl={4} pr={4} xs={12} sm={12} md={12} lg={12} xl={12}
                              justifyContent={'center'}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth={true} error={!!errors.breed}>
                                    <InputLabel id="breed">Breed</InputLabel>
                                    <Select
                                        labelId="breed"
                                        defaultValue=""
                                        {...register("breed", { required: "Breed is a required field!" })}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {animals.map((animal) => {
                                            return <MenuItem value={animal.animalBreed}>{animal.animalBreed.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</MenuItem>
                                        })};
                                        helperText={errors.breed? errors.breed?.message : "Required"}
                                    </Select>
                                    {errors.breed? <FormHelperText>{errors.breed.message}</FormHelperText> : <FormHelperText>Required</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField id="name" label="Name"
                                           fullWidth={true}
                                           {...register("name",
                                               {
                                                   required: "Name is a required field!",
                                               })}
                                           error={!!errors.name}
                                           helperText={errors.name? errors.name?.message : "Required"}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={5}>
                                <Button type="submit" variant="contained" color="primary">
                                    Add Animal
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item container xs={10} sm={10} md={6} lg={6} xl={6} pr={4}
                      sx={{
                          border: '1px solid gray',
                          borderRadius: '1em',
                          boxShadow: 'none',
                          height:'70vh',
                          display:'flex',
                          flexDirection:'row',
                          alignItems:'flex-start',
                          alignContent:'flex-start',
                          overflowY:'scroll',
                          overflowX:'hidden',
                          listStyle: 'none'}}>

                            {addedAnimals.map((data) => {
                                return (
                            <ListItem key={data.name + " " + data.animalBreed} sx={{width:'fit-content', padding:'5px 10px !important'}}>
                                <Chip
                                    label={data.name + "(" + data.animalBreed + ")"}
                                    onDelete={handleAnimalDelete(data)}
                                />
                            </ListItem>
                                )
                            })}
                </Grid>
            <PopupMessage message={errorMessage} isSuccess={isSuccess} handleClose={handleErrorPopupClose} open={errorPopupOpen}/>
        </>
    );
}