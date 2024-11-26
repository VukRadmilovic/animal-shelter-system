import { Grid2 as Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  xs?: number;
  minHeight?: string;
}

function DashboardItemContainer({
  children,
  xs = 5.7,
  minHeight = "40vh",
}: Props) {
  return (
    <Grid
      container
      minHeight={minHeight}
      sx={{ display: "block", alignContent: "center" }}
      className="container rounded-container"
      m={2}
      overflow={"auto"}
      size={xs}
    >
      {children}
    </Grid>
  );
}

export default DashboardItemContainer;
