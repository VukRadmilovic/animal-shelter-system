import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { User } from "../../models/users.ts";
import { useForm } from "react-hook-form";
import { UserService } from "../../services/UserService.ts";
import { PopupType, usePopup } from "../PopupProvider.tsx";

type RegistrationForm = {
  fullName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

interface RegistrationProps {
  userService: UserService;
}

export function Registration({ userService }: RegistrationProps) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });

  const { displayPopup } = usePopup();

  const onRegistrationAttempt = (formData: RegistrationForm) => {
    const newUser: User = {
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
    };
    userService
      .registerUser(newUser)
      .then(() => {
        displayPopup("User successfully registered!", PopupType.SUCCESS);
        reset();
      })
      .catch((error) => {
        displayPopup(error.response.data, PopupType.ERROR);
      });
  };

  return (
    (<form onSubmit={handleSubmit(onRegistrationAttempt)}>
      <Grid container direction={"row"} justifyContent={"center"} size={12}>
        <Grid mb={3} size={12}>
          <Typography variant="h2" mb={5} fontWeight={400}>
            Sign-up
          </Typography>
        </Grid>
        <Grid container rowSpacing={3} size={12}>
          <Grid container justifyContent={"center"} size={12}>
            <Grid
              pl={2}
              pr={2}
              size={{
                xs: 10,
                md: 6
              }}>
              <Grid container spacing={2} size={12}>
                <Grid size={12}>
                  <TextField
                    id="name"
                    label="Full Name"
                    type="text"
                    {...register("fullName", {
                      required: "Full Name is a required field!",
                    })}
                    error={!!errors.fullName}
                    helperText={
                      errors.fullName ? errors.fullName?.message : "Required"
                    }
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="username"
                    label="Username"
                    type="text"
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
              </Grid>
            </Grid>
            <Grid
              pl={2}
              pr={2}
              size={{
                xs: 10,
                md: 6
              }}>
              <Grid container spacing={2} size={12}>
                <Grid size={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    {...register("password", {
                      required: "Password is a required field!",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long!",
                      },
                    })}
                    error={!!errors.password}
                    helperText={
                      errors.password
                        ? errors.password?.message
                        : "Required, minimum 8 characters"
                    }
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="passwordConfirmation"
                    label="Confirm password"
                    type="password"
                    {...register("passwordConfirmation", {
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match!",
                    })}
                    error={!!errors.passwordConfirmation}
                    helperText={
                      errors.passwordConfirmation
                        ? errors.passwordConfirmation?.message
                        : "Required, must be the same as the password above"
                    }
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid mt={8}>
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>)
  );
}
