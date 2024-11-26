import { Grid, Typography, TextField, Button } from "@mui/material";
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
    <form onSubmit={handleSubmit(onLoginAttempt)}>
      <Grid container item direction={"row"} xs={12} justifyContent={"center"}>
        <Grid item mb={3} xs={12}>
          <Typography variant="h2" mb={5} fontWeight={400}>
            Login
          </Typography>
        </Grid>
        <Grid item container rowSpacing={3} xs={8}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
        <Grid item xs={12} mt={5}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
