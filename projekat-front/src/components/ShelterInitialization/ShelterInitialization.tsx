import {Button, Grid, Step, StepLabel, Stepper, TextField, Typography} from "@mui/material";
import {ShelterService} from "../../services/ShelterService.ts";
import React, {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {AnimalWithBreed} from "../../models/AnimalWithBreed.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {AnimalsInitialization} from "./AnimalsInitialization.tsx";
import {FoodAndPricesInitialization} from "./FoodAndPricesInitialization.tsx";
import {Shelter} from "../../models/Shelter.ts";
import {useNavigate} from "react-router-dom";

interface ShelterInitializationProps {
    shelterService: ShelterService
}

interface GeneralInfoForm {
    name: string,
    address: string,
    capacity: number,
    moneyAvailable: number
}

const steps = ['General Info', 'Animals', 'Food & Prices'];

export function ShelterInitialization({shelterService} : ShelterInitializationProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const {register, handleSubmit, formState: {errors}} = useForm<GeneralInfoForm>({
        defaultValues: {
            name: "",
            address: "",
            capacity: 0,
            moneyAvailable: 0
        },
        mode: "onChange"
    });
    const shouldLoad = useRef(true);
    const navigate = useNavigate();
    const [animalsWithBreeds, setAnimalsWithBreeds] = React.useState<AnimalWithBreed[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isDoneAnimals, setIsDoneAnimals] = React.useState(false);
    const [isDoneFood, setIsDoneFood] = React.useState(false);
    const [shelter, setShelter] = React.useState<Shelter>({
        name : "",
        address: "",
        moneyAvailable: 0,
        capacity: 0,
        animals: [],
        foodAvailableForAnimals: [],
        prices: []
    });
    const [isFinished, setIsFinished] = React.useState(false);
    const handleErrorPopupClose = (reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorPopupOpen(false);
    };

    const onSubmit = (data: GeneralInfoForm) => {
        shelter.name = data.name.trim();
        shelter.address = data.address.trim();
        shelter.moneyAvailable = data.moneyAvailable;
        shelter.capacity = data.capacity;
        setShelter(shelter);
        handleNext()}

    useEffect(() => {
        if(!shouldLoad.current) return;
        shelterService.checkShelter().then((result) => {
            if(result) navigate('/Shelter')
        }).catch((err) => {
            console.log(err)
        });
        shelterService.getAnimalsWithBreeds().then(animals => {
            setAnimalsWithBreeds(animals.animals);
        }).catch((err) => {
            setErrorMessage(err.response.data);
            setIsSuccess(false);
            setErrorPopupOpen(true);
        });
        shouldLoad.current = false;
    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <>
            <Grid container alignItems={'center'} justifyContent={'center'} className={'dark-background'}>
                <Grid container item xs={12} sm={12} md={10} lg={8} xl={8}
                      minHeight={'70vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" p={2}>
                    {isFinished?
                        <Grid textAlign={'center'} sx={{alignSelf:'center'}} p={2}>
                        <Typography variant={'h4'}>Shelter successfully registered! You can register workers and use the app by clicking the button below.</Typography>
                        <Button variant="contained" type="submit" sx={{marginTop:'2em'}} onClick={() => navigate('/Shelter')}>Shelter Registration</Button>
                    </Grid> :
                    <div>
                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} mb={2} justifyContent={'center'} height={'fit-content'}>
                            <Typography variant='h3' textAlign={'center'} width={'100%'}>Register Shelter</Typography>
                        </Grid>
                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} mb={3} justifyContent={'center'}>
                                <Stepper activeStep={activeStep} sx={{width:'100%'}}>
                                    {steps.map((label) => {
                                        const stepProps: { completed?: boolean } = {};
                                        const labelProps: {
                                            optional?: React.ReactNode;
                                        } = {};
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                        </Grid>
                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'}>
                                {activeStep == 0 ?
                                    (<form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} width={'100%'} mt={7}
                                          height={'100%'}
                                          justifyContent={'center'}>
                                            <Grid container
                                                  item
                                                  xs={12} sm={12} md={12} lg={12} xl={12}
                                                  direction={'row'}
                                                  justifyContent={"center"}>
                                                <Grid item container rowSpacing={1.5} xs={10} sm={10} md={6} lg={6} xl={6} pl={2} pr={2}>
                                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                                          justifyContent={'center'}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <TextField id="name"
                                                                       label="Name"
                                                                       fullWidth={true}
                                                                       {...register("name",
                                                                           {
                                                                               required: "Name is a required field!",
                                                                           })}
                                                                       error={!!errors.name}
                                                                       helperText={errors.name? errors.name?.message : "Required"}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                                          justifyContent={'center'}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <TextField id="address" label="Address"
                                                                       fullWidth={true}
                                                                       {...register("address",
                                                                           {required: "Address is a required field!"})}
                                                                       error={!!errors.address}
                                                                       helperText={errors.address? errors.address?.message : "Required"}/>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container rowSpacing={1.5} xs={10} sm={10} md={6} lg={6} xl={6} pl={2} pr={2}>
                                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                                          justifyContent={'center'}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <TextField id="capacity" label="Capacity"
                                                                       type={'number'}
                                                                       fullWidth={true}
                                                                       {...register("capacity",
                                                                           {required: "Capacity is a required field!",
                                                                               validate: value => value > 0 || "Capacity must at least 1!"})}
                                                                       error={!!errors.capacity}
                                                                       helperText={errors.capacity? errors.capacity?.message : "Required"}/>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                                          justifyContent={'center'}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                            <TextField id="money" label="Available Money (Dinars)"
                                                                       type={'number'}
                                                                       fullWidth={true}
                                                                       {...register("moneyAvailable",
                                                                           {required: "Available Money is a required field!",
                                                                               validate: value => value > 0 || "Available Money must be greater than 0!"})}
                                                                       error={!!errors.moneyAvailable}
                                                                       helperText={errors.moneyAvailable? errors.moneyAvailable?.message : "Required"}/>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={9} justifyContent={'right'} sx={{display:'flex'}}>
                                                        <Button variant="contained" type="submit">Next</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                     </form>)
                                    : activeStep == 1 ? (
                                    <Grid container>
                                    <AnimalsInitialization animals={animalsWithBreeds} shelter={shelter} setShelter={setShelter} isDone={isDoneAnimals}/>
                                    <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} mt={1} justifyContent={'right'}>
                                        <Button variant="contained" onClick={() => {
                                            setIsDoneAnimals(true);
                                            handleNext();}}>Next</Button>
                                    </Grid>
                                    </Grid>
                                    )
                                    : ( <Grid container>
                                            <FoodAndPricesInitialization animals={animalsWithBreeds} shelter={shelter}
                                                                         shelterService={shelterService} setShelter={setShelter}
                                                                         isDone={isDoneFood} setFinished={setIsFinished}/>
                                            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} mt={1} justifyContent={'right'}>
                                                <Button variant="contained" onClick={() => setIsDoneFood(true)}>Finish</Button>
                                            </Grid>
                                        </Grid>)
                                }
                        </Grid>
                    </div>
                    }
                </Grid>
            </Grid>
            <PopupMessage message={errorMessage} isSuccess={isSuccess} handleClose={handleErrorPopupClose} open={errorPopupOpen}/>
        </>
    );
}