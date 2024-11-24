import { Grid, TextField, FormControl, Button } from "@mui/material";
import { useEffect } from "react";
import { ShelterService } from "../../../services/ShelterService";
import { useForm } from "react-hook-form";

interface Props {
  shelterService: ShelterService;
  moneyAvailable: number;
  setMoneyAvailable: React.Dispatch<React.SetStateAction<number>>;
  sendSuccessMessage: (msg: string) => void;
}

function MoneyManagement({
  shelterService,
  moneyAvailable,
  setMoneyAvailable,
  sendSuccessMessage,
}: Props) {
  interface MoneyDepositForm {
    moneyToDeposit: number;
  }

  const {
    register: registerMoneyForm,
    handleSubmit: handleSubmitMoneyForm,
    formState: { errors: moneyFormErrors },
    reset: resetMoneyForm,
  } = useForm<MoneyDepositForm>({
    defaultValues: {
      moneyToDeposit: 0,
    },
    mode: "onChange",
  });

  const onDepositMoneySubmit = (data: MoneyDepositForm) => {
    shelterService
      .depositMoney(data.moneyToDeposit)
      .then(() => {
        sendSuccessMessage("Money deposited successfully");
        setMoneyAvailable((prev) => prev + Number(data.moneyToDeposit));
        resetMoneyForm();
      })
      .catch((error) => {
        console.error("Error depositing money:", error);
      });
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextField
          id="moneyAvailable"
          label="Available money"
          value={moneyAvailable || ""}
          sx={{ width: "93%" }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <FormControl>
        <Grid item xs={12} mt={2.5}>
          <TextField
            id="moneyToDeposit"
            label="Money to deposit"
            sx={{ width: "93%" }}
            {...registerMoneyForm("moneyToDeposit", {
              required: "Money to deposit is a required field!",
            })}
            error={!!moneyFormErrors.moneyToDeposit}
            helperText={
              moneyFormErrors.moneyToDeposit
                ? moneyFormErrors.moneyToDeposit?.message
                : "Required"
            }
          />
        </Grid>
        <Grid item xs={12} mt={5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmitMoneyForm(onDepositMoneySubmit)}
          >
            Deposit money
          </Button>
        </Grid>
      </FormControl>
    </>
  );
}

export default MoneyManagement;
