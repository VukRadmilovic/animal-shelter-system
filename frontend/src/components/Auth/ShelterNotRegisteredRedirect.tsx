import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShelterNotRegisteredRedirect() {
  const navigate = useNavigate();

  return (
    <Grid textAlign={"center"} sx={{ alignSelf: "center" }} p={2}>
      <Typography variant={"h4"}>
        You don't have a registered shelter. Register a shelter first by
        clicking the button below.
      </Typography>
      <Button
        variant="contained"
        type="submit"
        sx={{ marginTop: "2em" }}
        onClick={() => navigate("/shelter-registration")}
      >
        Register shelter
      </Button>
    </Grid>
  );
}

export default ShelterNotRegisteredRedirect;
