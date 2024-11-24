import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { ShelterService } from "../../services/ShelterService";
import dayjs from "dayjs";
import { Notification } from "../../models/Notification";

interface Props {
  shelterService: ShelterService;
}

function formatTimestamp(timestamp: string): string {
  return dayjs(timestamp).format("D.M.YYYY. HH:mm:ss");
}

function NotificationTable({ shelterService }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    shelterService
      .getNotifications()
      .then((notifications) => {
        setNotifications(notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shelterService]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 650, maxHeight: 20 }}
          aria-label="notification table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Notification</TableCell>
              <TableCell align="right">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell> {row.text} </TableCell>
                  <TableCell align="right">
                    {" "}
                    {formatTimestamp(row.timestamp)}{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component={Grid}
        count={notifications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default NotificationTable;
