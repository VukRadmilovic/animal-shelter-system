import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShelterNotRegisteredRedirect() {
  const navigate = useNavigate();

  return (
    <Grid textAlign={"center"} sx={{ alignSelf: "center" }} p={2}>
      <Typography variant={"h4"}>
        Seems like the shelter is not registered. Register the shelter first by
        clicking the button below.
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
  );
}

export default ShelterNotRegisteredRedirect;
