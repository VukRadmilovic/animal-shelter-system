import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserCredentials } from "../../models/users.ts";
import { UserService } from "../../services/UserService.ts";
import { PopupMessage } from "../PopupMessage.tsx";
import { Registration } from "./Registration.tsx";
import { ShelterService } from "../../services/ShelterService.ts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface LoginForm {
  username: string;
  password: string;
}

interface LoginRegistrationProps {
  userService: UserService;
  shelterService: ShelterService;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      className="height-100"
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} component={"div"}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function tabSetup(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export function LoginRegistration({
  userService,
  shelterService,
}: LoginRegistrationProps) {
  const [tabValue, setTabTabValue] = React.useState<number>(0);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const shouldCheckShelter = useRef(true);
  const [shelterExists, setShelterExists] = React.useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabTabValue(newValue);
  const onSubmit = (formData: LoginForm) => tryLogin(formData);

  function tryLogin(formData: LoginForm) {
    const userCredentials: UserCredentials = {
      username: formData.username.trim(),
      password: formData.password.trim(),
    };
    userService
      .loginUser(userCredentials)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setErrorPopupOpen(true);
      });
  }

  useEffect(() => {
    if (!shouldCheckShelter.current) return;
    shelterService
      .checkShelter()
      .then((result) => {
        setShelterExists(result);
      })
      .catch((err) => {
        console.log(err);
      });
    shouldCheckShelter.current = false;
  }, []);

  const handleErrorPopupClose = (reason?: string) => {
    if (reason === "clickaway") return;
    setErrorPopupOpen(false);
  };
  return (
    <>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        className={"dark-background"}
        height={"100%"}
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={10}
          lg={8}
          xl={8}
          height={"fit-content"}
          minHeight={"70vh"}
          className="container rounded-container"
        >
          {shelterExists ? (
            <div>
              <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                    component={"div"}
                  >
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      aria-label="login & sign-up"
                      centered
                    >
                      <Tab label="Login" {...tabSetup(0)} />
                      <Tab label="Sign-up" {...tabSetup(1)} />
                    </Tabs>
                  </Box>
                </Grid>
                <Grid
                  item
                  justifyContent={"center"}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <TabPanel value={tabValue} index={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        direction={"row"}
                        justifyContent={"center"}
                      >
                        <Grid item container rowSpacing={3}>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography variant="h2" mb={5} fontWeight={400}>
                              Login
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            justifyContent={"center"}
                          >
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
                              <TextField
                                id="username"
                                label="Username"
                                fullWidth={true}
                                {...register("username", {
                                  required: "Username is a required field!",
                                })}
                                error={!!errors.username}
                                helperText={
                                  errors.username
                                    ? errors.username?.message
                                    : "Required"
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            justifyContent={"center"}
                          >
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
                              <TextField
                                id="password"
                                label="Password"
                                fullWidth={true}
                                type="password"
                                {...register("password", {
                                  required: "Password is a required field!",
                                })}
                                error={!!errors.password}
                                helperText={
                                  errors.password
                                    ? errors.password?.message
                                    : "Required"
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            mt={5}
                          >
                            <Button variant="contained" type="submit">
                              Login
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </TabPanel>
                </Grid>
              </Grid>
              <Grid
                item
                justifyContent={"center"}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <TabPanel value={tabValue} index={1}>
                  <Registration userService={userService} />
                </TabPanel>
              </Grid>
            </div>
          ) : (
            <Grid textAlign={"center"} sx={{ alignSelf: "center" }} p={2}>
              <Typography variant={"h4"}>
                Seems like the shelter is not registered. Register the shelter
                first by clicking the button below.
              </Typography>
              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "2em" }}
                onClick={() => navigate("/shelter-registration")}
              >
                Shelter Registration
              </Button>
            </Grid>
          )}
          <PopupMessage
            message={errorMessage}
            isSuccess={false}
            handleClose={handleErrorPopupClose}
            open={errorPopupOpen}
          />
        </Grid>
      </Grid>
    </>
  );
}
