import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PetRecommendationCounter } from "../../models/GlobalChartEntry";

interface Props {
  recommendations: PetRecommendationCounter[];
}

function RecommendationsTable({ recommendations }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Breed name</TableCell>
            <TableCell align="right">Number of recommendations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recommendations.map((row) => (
            <TableRow
              key={row.animalBreed}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.animalBreed
                  .toLowerCase()
                  .replace(/_/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </TableCell>
              <TableCell align="right">{row.recommendationCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecommendationsTable;
