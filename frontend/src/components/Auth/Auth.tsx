import { Box, Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { UserService } from "../../services/UserService.ts";
import { Registration } from "./Registration.tsx";
import { ShelterService } from "../../services/ShelterService.ts";
import TabPanel from "./TabPanel.tsx";
import ShelterNotRegisteredRedirect from "./ShelterNotRegisteredRedirect.tsx";
import Login from "./Login.tsx";

function tabSetup(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

interface LoginRegistrationProps {
  userService: UserService;
  shelterService: ShelterService;
}

export function Auth({ userService, shelterService }: LoginRegistrationProps) {
  const [tabValue, setTabTabValue] = React.useState<number>(0);
  const [shelterExists, setShelterExists] = React.useState<boolean>(true);

  const shouldCheckShelter = useRef(true);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabTabValue(newValue);

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
          md={10}
          lg={8}
          height={"fit-content"}
          minHeight={"70vh"}
          className="container rounded-container"
        >
          {shelterExists ? (
            <div style={{ width: "100%" }}>
              <Grid item container xs={12}>
                <Grid item xs={12}>
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
              </Grid>
              <Grid item justifyContent={"center"} xs={12}>
                <TabPanel value={tabValue} index={0}>
                  <Login userService={userService} />
                </TabPanel>
              </Grid>
              <Grid item justifyContent={"center"} xs={12}>
                <TabPanel value={tabValue} index={1}>
                  <Registration userService={userService} />
                </TabPanel>
              </Grid>
            </div>
          ) : (
            <ShelterNotRegisteredRedirect />
          )}
        </Grid>
      </Grid>
    </>
  );
}
