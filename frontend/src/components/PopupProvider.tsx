import {
  Alert,
  Snackbar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";

export enum PopupType {
  SUCCESS = "success",
  ERROR = "error",
}

interface SnackBarState extends SnackbarOrigin {
  open: boolean;
}

interface PopupContextValue {
  displayPopup: (message: string, type: PopupType) => void;
}

interface PopupState {
  message: string;
  type: PopupType;
  open: boolean;
}

const initialPopupState: PopupState = {
  message: "",
  type: PopupType.SUCCESS,
  open: false,
};

interface Props {
  children: React.ReactNode;
}

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export function PopupProvider({ children }: Props) {
  const [snackBarState] = React.useState<SnackBarState>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = snackBarState;

  const [popupState, setPopupState] = useState<PopupState>(initialPopupState);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setPopupState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const displayPopup = (message: string, type: PopupType) => {
    setPopupState({ message, type, open: true });
  };

  return (
    <PopupContext.Provider value={{ displayPopup }}>
      {children}
      <Snackbar
        open={popupState.open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        onClose={handleClose}
        message={popupState.message}
      >
        <Alert severity={popupState.type} onClose={handleClose}>
          {popupState.message}
        </Alert>
      </Snackbar>
    </PopupContext.Provider>
  );
}

export const usePopup = (): PopupContextValue => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider!");
  }
  return context;
};
