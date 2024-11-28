import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useEffect } from "react";
import { Week } from "../../../../models/types";

const weeksInMonth = (month: number, year: number) => {
  const startOfMonth = dayjs(new Date(year, month, 1));
  const endOfMonth = dayjs(new Date(year, month + 1, 0));
  const weeks = [];
  let currentDay = startOfMonth;

  while (
    currentDay.isBefore(endOfMonth) ||
    currentDay.isSame(endOfMonth, "day")
  ) {
    const startOfWeek = currentDay;
    const endOfWeek = currentDay.add(6, "day").isAfter(endOfMonth)
      ? endOfMonth
      : currentDay.add(6, "day");
    weeks.push({
      start: startOfWeek,
      end: endOfWeek,
    });
    currentDay = currentDay.add(7, "day").startOf("day");
  }

  return weeks;
};

interface WeekPickerProps {
  selectedWeek: Week;
  setSelectedWeek: React.Dispatch<React.SetStateAction<Week>>;
  monthAndYear: Dayjs | null;
  setMonthAndYear: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export function WeekPicker({
  selectedWeek,
  setSelectedWeek,
  monthAndYear,
  setMonthAndYear,
}: WeekPickerProps) {
  const [weeks, setWeeks] = useState([
    {
      start: dayjs(),
      end: dayjs(),
    },
  ]);

  useEffect(() => {
    if (!monthAndYear) {
      return;
    }
    const year = monthAndYear.year();
    const month = monthAndYear.month();
    setWeeks(weeksInMonth(month, year));
  }, [monthAndYear]);

  const handleSelectedWeekChange = (event: SelectChangeEvent) => {
    const week = weeks[parseInt(event.target.value)];
    setSelectedWeek(week);
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pick month for report"
          value={monthAndYear}
          onChange={(newMonthAndYear) => setMonthAndYear(newMonthAndYear)}
          views={["month", "year"]}
        />
      </LocalizationProvider>
      <br />
      <InputLabel id="week-label" sx={{ marginTop: 10 }}>
        Pick week for report
      </InputLabel>
      <Select
        labelId="week-label"
        id="week-select"
        label="Pick week for report"
        value={(() => {
          const index = weeks.findIndex((week) => week == selectedWeek);
          if (index >= 0) return index.toString();
          return "";
        })()}
        onChange={handleSelectedWeekChange}
      >
        {weeks.map((week, index) => (
          <MenuItem key={index} value={index}>
            {`${week.start.format("DD.MM.YYYY")} - ${week.end.format(
              "DD.MM.YYYY"
            )}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
