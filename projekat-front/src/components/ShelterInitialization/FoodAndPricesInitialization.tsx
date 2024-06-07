import {AnimalWithBreed} from "../../models/AnimalWithBreed.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {Shelter} from "../../models/Shelter.ts";
import React, {useEffect} from "react";
import {FoodAvailableForAnimal} from "../../models/FoodAvailableForAnimal.ts";
import {Price} from "../../models/Price.ts";
import {ShelterService} from "../../services/ShelterService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";

interface FoodAndPricesInitializationProps {
    animals : AnimalWithBreed[],
    shelter: Shelter,
    setShelter: (shelter: Shelter) => void
    isDone: boolean,
    shelterService: ShelterService,
    setFinished: (status: boolean) => void
}

interface FoodAndPricesForm {
    type: string,
    food: number,
    price: number
}

export function FoodAndPricesInitialization({animals,shelter, setShelter, isDone, shelterService, setFinished} : FoodAndPricesInitializationProps) {
    const { register, trigger, handleSubmit, getValues, formState: { errors }, } = useForm<FoodAndPricesForm[]>({
        mode: 'onChange'
    });
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const handleErrorPopupClose = (reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorPopupOpen(false);
    };

    const validateAndFinish = async () => {
        const isValid = await trigger();
        let prices : Price[] = [];
        let food : FoodAvailableForAnimal[] = [];
        if(isValid) {
            Array.from(new Set(animals.map(animal => animal.animalType))).map((type, index) => {
                const foodAvailable : FoodAvailableForAnimal = {
                    animalType: type,
                    portionCount: getValues()[index].food
                };
                food.push(foodAvailable);
                const price : Price = {
                    animalType: type,
                    pricePerPortion: getValues()[index].price
                }
                prices.push(price)
            });
            shelter.foodAvailableForAnimals = food;
            shelter.prices = prices;
            setShelter(shelter);
            shelterService.registerShelter(shelter).then(msg => {
                setErrorMessage(msg);
                setIsSuccess(true);
                setErrorPopupOpen(true);
                setFinished(true);
            }).catch((err) => {
                setErrorMessage(err.response.data);
                setIsSuccess(false);
                setErrorPopupOpen(true);
            });
        }
    }

    useEffect(() => {
        if(!isDone) return;
        validateAndFinish();
    }, [isDone]);

    const onSubmit: SubmitHandler<FoodAndPricesForm[]> = data => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex-row'}>
                <Grid container spacing={2} sx={{display:'flex', flexDirection:'row',
                    height:'45vh',
                    overflowY:'scroll'}}>
                    {Array.from(new Set(animals.map(animal => animal.animalType))).map((type, index) => (
                        <Grid container sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Typography><b>{type}</b></Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}  p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Food Portions Available'
                                    {...register(`${index}.food`, {
                                        required: 'Food Portions is a required field!',
                                        validate: value => value > -1 || "Food Portions must be non-negative!"
                                    })}
                                    error={!!errors?.[index]?.food}
                                    helperText={errors?.[index]?.food?.message}/>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} p={1}>
                                <TextField
                                    sx={{width:'80%'}}
                                    type={'number'}
                                    label='Price Per Portion (Dinars)'
                                    {...register(`${index}.price`, {
                                        required: 'Price Per Portion is a required field!',
                                        validate: value => value > 0 || "Price Per Portion  must be positive!"
                                    })}
                                    error={!!errors?.[index]?.price}
                                    helperText={errors?.[index]?.price?.message}/>
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
            <PopupMessage message={errorMessage} isSuccess={isSuccess} handleClose={handleErrorPopupClose} open={errorPopupOpen}/>
        </>
    );
}