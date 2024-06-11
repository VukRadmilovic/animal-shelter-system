import "./ShelterMain.css";
import {
    Button,
    Chip,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    ListItem,
    MenuItem,
    Select,
    TablePagination, TextField
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Animal} from "../../models/Animal";
import {AnimalWithBreed} from "../../models/AnimalWithBreed";
import {set, useForm} from "react-hook-form";
import {FoodStuff} from "./FoodStuff";
import {ShelterService} from "../../services/ShelterService";
import {useNavigate} from "react-router-dom";
import {Reports} from "./Reports";
import {GlobalChartEntry} from "../../models/GlobalChartEntry";
import {Notification} from "../../models/Notification";
import {PopupMessage} from "../PopupMessage/PopupMessage";
import {ShelterWithMaps} from "../../models/ShelterWithMaps";
import dayjs from 'dayjs';

export interface AnimalsForm {
    name: string,
    animalBreed: string
}

export interface MoneyDepositForm {
    moneyToDeposit: number
}

interface ShelterMainProps {
    shelterService: ShelterService
}

export function formatTimestamp(timestamp: string): string {
    return dayjs(timestamp).format('D.M.YYYY. HH:mm:ss');
}

export function ShelterMain({shelterService} : ShelterMainProps) {
    const { register: registerAnimalsForm, handleSubmit: handleSubmitAnimalsForm, formState: { errors: animalsFormErrors }, reset: resetAnimalsForm } = useForm<AnimalsForm>({
        defaultValues: {
            name: "",
            breed: ""
        },
        mode: "onChange"
    });

    const { register: registerMoneyForm, handleSubmit: handleSubmitMoneyForm, formState: { errors: moneyFormErrors }, reset: resetMoneyForm } = useForm<MoneyDepositForm>({
        defaultValues: {
            moneyToDeposit: 0
        },
        mode: "onChange"
    });

    const [animalsWithBreeds, setAnimalsWithBreeds] = React.useState<AnimalWithBreed[]>([]);
    const [globalChart, setGlobalChart] = React.useState<GlobalChartEntry[]>([]);
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [shelter, setShelter] = React.useState<ShelterWithMaps | null>(null);
    const [moneyAvailable, setMoneyAvailable] = React.useState<number>(0);
    const [shelteredAnimals, setShelteredAnimals] = React.useState<Animal[]>([]);

    const navigate = useNavigate();
    const shouldLoad = useRef(true);

    const onSubmitAnimalsForm = (data: AnimalsForm) => {
        // @ts-ignore
        const animal: Animal = {
            name: data.name,
            animalBreed: data.animalBreed,
            animalType: animalsWithBreeds.find(animal => animal.animalBreed === data.animalBreed).animalType
        }
        console.log("Form data:", animal);
        shelterService.shelterAnimal(animal)
            .then(() => {
                setErrorMessage("Animal sheltered successfully");
                setIsSuccess(true);
                setErrorPopupOpen(true);
                setTimeout(() => {
                    navigate(0);
                }, 2000);
                console.log("Animal sheltered successfully");
            })
            .catch((error) => {
                console.error("Error sheltering animal:", error);
            });
    }

    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const handleErrorPopupClose = (reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorPopupOpen(false);
    };

    const onDepositMoneySubmit = (data: MoneyDepositForm) => {
        console.log("Form data:", data);
        shelterService.depositMoney(data.moneyToDeposit)
            .then(() => {
                // Update UI or show success message if needed
                setErrorMessage("Money deposited successfully");
                setIsSuccess(true);
                setErrorPopupOpen(true);
                setTimeout(() => {
                    navigate(0);
                }, 2000);
                console.log("Money deposited successfully");
            })
            .catch((error) => {
                console.error("Error depositing money:", error);
            });
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [animals, setAnimals] = useState<Animal[]>([
        {name: "Buddy", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy2", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy3", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy4", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy5", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy6", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy7", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
        {name: "Buddy8", animalBreed: "LABRADOR_RETRIEVER", animalType: "DOG"},
    ]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    useEffect(() => {
        if(!shouldLoad.current) return;
        console.log('FoodStuff component mounted')
        shelterService.checkShelter().then((result) => {
            if(!result) navigate('/Shelter')
        }).catch((err) => {
            console.log(err)
        });
        shelterService.getAnimalsWithBreeds().then(animals => {
            setAnimalsWithBreeds(animals.animals);
        }).catch((err) => {
            console.log(err);
        })
        shelterService.getGlobalChart().then((chartData) => {
            setGlobalChart(chartData.top5);
        }).catch((err) => {
            console.log("FAILED TO GET GLOBAL CHART");
            console.log(err);
        })
        shelterService.getNotifications().then(notifications => {
            console.log(notifications);
            setNotifications(notifications);
        }).catch((err) => {
            console.log(err);
        })
        shelterService.getShelter().then(shelter => {
            console.log(shelter);
            setShelter(shelter);
            setMoneyAvailable(shelter.moneyAvailable);
            setShelteredAnimals(shelter.animals);
        }).catch((err) => {
            console.log(err);
        })
        shouldLoad.current = false;
    }, [navigate, shelterService]);

    const handleSelectAnimal = (animal: Animal) => {
        setSelectedAnimal(animal);
    };

    const handleAdopt = () => {
        if (selectedAnimal) {
            shelterService.adoptAnimal(selectedAnimal).then(() => {
                console.log("Animal adopted successfully");
                setErrorMessage("Animal adopted successfully");
                setIsSuccess(true);
                setErrorPopupOpen(true);
                setTimeout(() => {
                    navigate(0);
                }, 2000);
            }).catch((error) => {
                console.error("Error adopting animal:", error);
            });
        } else {
            console.log("No animal selected");
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <h1> Shelter dashboard </h1>
            <Grid container className={'dark-background'}>
                <Grid container item xs={5.7} sm={5.7} md={5.7} lg={5.7} xl={5.7}
                      minHeight={'40vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" m={2}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Breed name</TableCell>
                                    <TableCell align="right">Number of recommendations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {globalChart.map((row) => (
                                    <TableRow
                                        key={row.animalBreed}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.animalBreed.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                                        </TableCell>
                                        <TableCell align="right">{row.recommendationCount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container item xs={5.7} sm={5.7} md={5.7} lg={5.7} xl={5.7}
                      minHeight={'40vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" m={2}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader sx={{ minWidth: 650, maxHeight: 20 }} aria-label="simple table2">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Notification</TableCell>
                                    <TableCell align="right">Timestamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notifications
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                    <TableRow key={`${formatTimestamp(row.timestamp)}-${row.text}`}>
                                        <TableCell> {row.text} </TableCell>
                                        <TableCell align="right"> {formatTimestamp(row.timestamp)} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component={Grid}
                        count={notifications.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}/>
                </Grid>
                <Grid container item xs={5.7} sm={5.7} md={5.7} lg={5.7} xl={5.7}
                      minHeight={'40vh'}
                      sx={{
                          display:'block',
                          alignContent:'center'}}
                      className="container rounded-container" m={2}>
                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} pr={12}
                          sx={{
                              border: '1px solid gray',
                              borderRadius: '1em',
                              boxShadow: 'none',
                              height:'30vh',
                              display:'flex',
                              flexDirection:'row',
                              alignItems:'flex-start',
                              alignContent:'flex-start',
                              overflowY:'scroll',
                              overflowX:'hidden',
                              width: '96%',
                              listStyle: 'none'}}
                    p={2} ml={2} mt={2} mb={2} mr={-5}>
                        {shelteredAnimals.map((data) => {
                            return (
                                <ListItem
                                    key={data.name + " " + data.animalBreed}
                                    sx={{
                                        width:'fit-content',
                                        padding:'5px 10px !important',
                                        cursor: 'pointer',
                                        backgroundColor: selectedAnimal === data ? 'lightgray' : 'transparent'
                                }}
                                onClick={() => handleSelectAnimal(data)}>
                                    <Chip
                                        label={data.name + " (" + data.animalBreed.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) + ")"}
                                    />
                                </ListItem>
                            )
                        })}
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} mt={5}
                          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button onClick={handleAdopt} variant="contained" color="primary" className="margin-bottom-1vh">
                            Confirm adoption
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item xs={5.7} sm={5.7} md={5.7} lg={5.7} xl={5.7}
                      minHeight={'40vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" m={2}>
                        <form className={'width-100'}>
                            <Grid item container
                                  spacing={2}
                                  pt={3}
                                  pl={4} pr={4} xs={12} sm={12} md={12} lg={12} xl={12}
                                  justifyContent={'center'}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormControl fullWidth={true} error={!!animalsFormErrors.animalBreed}>
                                        <InputLabel id="breed">Breed</InputLabel>
                                        <Select
                                            labelId="breed"
                                            defaultValue=""
                                            {...registerAnimalsForm("animalBreed", { required: "Breed is a required field!" })}>
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {animalsWithBreeds.map((animal, index) => {
                                                return <MenuItem key={index} value={animal.animalBreed}>{animal.animalBreed.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</MenuItem>
                                            })};
                                        </Select>
                                        {animalsFormErrors.animalBreed? <FormHelperText>{animalsFormErrors.animalBreed.message}</FormHelperText> : <FormHelperText>Required</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <TextField id="name" label="Name"
                                               fullWidth={true}
                                               {...registerAnimalsForm("name",
                                                   {
                                                       required: "Name is a required field!",
                                                   })}
                                               error={!!animalsFormErrors.name}
                                               helperText={animalsFormErrors.name? animalsFormErrors.name?.message : "Required"}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={5}>
                                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmitAnimalsForm(onSubmitAnimalsForm)}>
                                        Confirm sheltering
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                </Grid>
                <Grid container item xs={5.7} sm={5.7} md={5.7} lg={5.7} xl={5.7}
                      minHeight={'40vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" m={2}>
                    <Reports shelterService={shelterService}/>
                </Grid>
                <Grid container item xs={5.7} sm={5.7} md={5.7} lg={5.7} xl={5.7}
                      minHeight={'40vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" m={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField id="moneyAvailable"
                                   label="Available money"
                                   value={moneyAvailable || ''}
                                   sx={{width: '93%'}}
                                   InputProps={{
                                       readOnly: true,
                                   }}
                        />
                    </Grid>
                    <FormControl>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2.5}>
                            <TextField id="moneyToDeposit" label="Money to deposit"
                                       sx={{width: '93%'}}
                                       {...registerMoneyForm("moneyToDeposit",
                                           {
                                               required: "Money to deposit is a required field!",
                                           })}
                                       error={!!moneyFormErrors.moneyToDeposit}
                                       helperText={moneyFormErrors.moneyToDeposit? moneyFormErrors.moneyToDeposit?.message : "Required"}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={5}>
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmitMoneyForm(onDepositMoneySubmit)}>
                                Deposit money
                            </Button>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}
                      minHeight={'50vh'}
                      sx={{display:'block', alignContent:'center'}}
                      className="container rounded-container" m={2}>
                    <FoodStuff shelterService={shelterService} shelter={shelter} animals={animalsWithBreeds}/>
                </Grid>
                <PopupMessage message={errorMessage} isSuccess={isSuccess} handleClose={handleErrorPopupClose}
                              open={errorPopupOpen}/>
            </Grid>
        </>
    );
}