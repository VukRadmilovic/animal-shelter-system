import {Button, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {ShelterService} from "../../services/ShelterService";
import {AnimalWithBreed} from "../../models/AnimalWithBreed";

interface FoodStuffProps {
    animals : AnimalWithBreed[],
    shelterService: ShelterService,
}

export function FoodStuff({animals, shelterService} : FoodStuffProps) {
    if (!Array.isArray(animals)) {
        return <p>Oopsie</p>;
    }

    return (
        <>
            <form className={'flex-row'}>
                <Grid container spacing={2} sx={{display:'flex', flexDirection:'row',
                    height:'67.5vh', overflowY: 'scroll'}} paddingTop={3}>
                    {Array.from(new Set(animals.map(animal => animal.animalType))).map((type, index) => (
                        <Grid container key={index} sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography><b>{type}</b></Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Number of animals'
                                    defaultValue={2}
                                    InputProps={{
                                        readOnly: true,
                                    }}/>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Available food'
                                    defaultValue={10}
                                    InputProps={{
                                        readOnly: true,
                                    }}/>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Price Per Portion (Dinars)'
                                    defaultValue={15}
                                    InputProps={{
                                        readOnly: true,
                                    }}/>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Number of portions to buy'/>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} p={1}>
                                <Button type="submit" variant="contained" color="primary">
                                    Buy food
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </form>
        </>
    );
}