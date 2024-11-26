import { Grid2 as Grid, TextField, FormControl, Button } from "@mui/material";
import { ShelterService } from "../../../services/ShelterService";
import { useForm } from "react-hook-form";
import { PopupType, usePopup } from "../../PopupProvider";

interface Props {
  shelterService: ShelterService;
  moneyAvailable: number;
  setMoneyAvailable: React.Dispatch<React.SetStateAction<number>>;
}

function MoneyManagement({
  shelterService,
  moneyAvailable,
  setMoneyAvailable,
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

  const { displayPopup } = usePopup();

  const onDepositMoneySubmit = (data: MoneyDepositForm) => {
    shelterService
      .depositMoney(data.moneyToDeposit)
      .then(() => {
        displayPopup("Money deposited successfully", PopupType.SUCCESS);
        setMoneyAvailable((prev) => prev + Number(data.moneyToDeposit));
        resetMoneyForm();
      })
      .catch((error) => {
        displayPopup("Please try again soon.", PopupType.ERROR);
        console.error("Error depositing money:", error);
      });
  };

  return (
    <>
      <Grid size={12}>
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
        <Grid size={12} mt={2.5}>
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
        <Grid size={12} mt={5}>
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
