import { Grid2 as Grid, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserWithoutFullName } from "../../models/users";
import { UserService } from "../../services/UserService";
import { PopupType, usePopup } from "../PopupProvider";

interface Props {
  userService: UserService;
}

function Login({ userService }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserWithoutFullName>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { displayPopup } = usePopup();

  const onLoginAttempt = (formData: UserWithoutFullName) => {
    const userCredentials: UserWithoutFullName = {
      username: formData.username.trim(),
      password: formData.password.trim(),
    };
    userService
      .loginUser(userCredentials)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        displayPopup(error.response.data, PopupType.ERROR);
      });
  };

  return (
    (<form onSubmit={handleSubmit(onLoginAttempt)}>
      <Grid container direction={"row"} justifyContent={"center"} size={12}>
        <Grid mb={3} size={12}>
          <Typography variant="h2" mb={5} fontWeight={400}>
            Login
          </Typography>
        </Grid>
        <Grid container rowSpacing={3} size={8}>
          <Grid size={12}>
            <TextField
              id="username"
              label="Username"
              {...register("username", {
                required: "Username is a required field!",
              })}
              error={!!errors.username}
              helperText={
                errors.username ? errors.username?.message : "Required"
              }
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is a required field!",
              })}
              error={!!errors.password}
              helperText={
                errors.password ? errors.password?.message : "Required"
              }
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <Grid mt={5} size={12}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>)
  );
}

export default Login;
