import {Button, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {ShelterService} from "../../services/ShelterService";
import {AnimalWithBreed} from "../../models/AnimalWithBreed";

interface FoodStuffProps {
    animals : AnimalWithBreed[],
    shelterService: ShelterService,
}

export function FoodStuff({animals, shelterService} : FoodStuffProps) {
    animals = animals.animals;
    if (!Array.isArray(animals)) {
        console.error("animals is not an array", animals);
        return <p>Oopsie</p>;
    }

    return (
        <>
            <form className={'flex-row'}>
                <Grid container spacing={2} sx={{display:'flex', flexDirection:'row',
                    height:'65vh', overflowY: 'scroll'}} paddingTop={2}>
                    {Array.from(new Set(animals.map(animal => animal.animalType))).map((type, index) => (
                        <Grid container key={index} sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography><b>{type}</b></Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}  p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Food Portions Available'/>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Price Per Portion (Dinars)'/>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{display:'none'}}>
                            Add Animal
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}