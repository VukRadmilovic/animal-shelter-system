import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { ShelterService } from "../../../../services/ShelterService";
import { Report, Week } from "../../../../models/types";
import { PopupType, usePopup } from "../../../PopupProvider";
import { WeekPicker } from "./WeekPicker";

interface ReportProps {
  shelterService: ShelterService;
}

export function Reports({ shelterService }: ReportProps) {
  const { displayPopup } = usePopup();

  const [reportType, setReportType] = React.useState("daily");
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const [selectedWeek, setSelectedWeek] = React.useState<Week>({
    start: undefined,
    end: undefined,
  });

  const [monthForWeeklyReports, setMonthForWeeklyReports] =
    React.useState<Dayjs | null>(dayjs());

  const [report, setReport] = React.useState({
    adoptionCount: -1,
    shelteredCount: -1,
  });

  const handleReportTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReportType((event.target as HTMLInputElement).value);
  };

  function generateReport() {
    if (reportType === "daily") {
      if (!selectedDate) {
        displayPopup("You must select a date!", PopupType.ERROR);
        return;
      }

      const formattedData = selectedDate.format("D.M.YYYY.");

      shelterService
        .getDailyReport(formattedData)
        .then((response: Report) => {
          setReport(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (reportType === "weekly") {
      if (!selectedWeek.start || !selectedWeek.end) {
        displayPopup("You must select a week!", PopupType.ERROR);
        return;
      }

      const formattedWeek =
        selectedWeek.start.format("D.M.YYYY.") +
        " - " +
        selectedWeek.end.format("D.M.YYYY.");

      shelterService
        .getWeeklyReport(formattedWeek)
        .then((response: Report) => {
          setReport(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (reportType === "monthly") {
      if (!selectedDate) {
        displayPopup("You must select a month!", PopupType.ERROR);
        return;
      }

      const formattedMonth = selectedDate.format("M.YYYY.");
      shelterService
        .getMonthlyReport(formattedMonth)
        .then((response: Report) => {
          setReport(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <FormControl>
      <FormLabel id="report-type">Report type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="report-type"
        name="report-type-group"
        value={reportType}
        onChange={handleReportTypeChange}
      >
        <FormControlLabel value="daily" control={<Radio />} label="Daily" />
        <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
        <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
      </RadioGroup>
      <br />
      {reportType == "daily" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Pick date for report"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            format={"DD.MM.YYYY"}
          />
        </LocalizationProvider>
      )}
      {reportType === "weekly" && (
        <WeekPicker
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          monthAndYear={monthForWeeklyReports}
          setMonthAndYear={setMonthForWeeklyReports}
        />
      )}
      {reportType == "monthly" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Pick month for report"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            views={["month", "year"]}
          />
        </LocalizationProvider>
      )}
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={generateReport}
      >
        Generate report
      </Button>
      {report.adoptionCount != -1 ? (
        <p>
          Report: {report.adoptionCount} adoptions, {report.shelteredCount}{" "}
          shelterings
        </p>
      ) : (
        <p>No report found</p>
      )}
    </FormControl>
  );
}
