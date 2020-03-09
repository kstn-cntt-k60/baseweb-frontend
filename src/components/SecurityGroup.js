import React, { useState } from "react";
import { pushSuccessNotification } from "../actions";
import { connect } from "react-redux";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TableSortLabel,
  TablePagination,
  Paper
} from "@material-ui/core";

const TestTable = () => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Column 1</TableCell>
              <TableCell>
                <TableSortLabel
                  style={{ fontWeight: "bold" }}
                  active={true}
                  direction="asc"
                >
                  Column 2
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Column 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              <TableCell>Column 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              <TableCell>Column 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              <TableCell>Column 3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={23}
        rowsPerPage={5}
        page={0}
        onChangePage={() => true}
        onChangeRowsPerPage={() => true}
      />
    </Paper>
  );
};

const SecurityGroup = ({ sequence, push }) => {
  const [string, setString] = useState("");
  return (
    <div>
      <input type="text" onChange={e => setString(e.target.value)} />
      <button onClick={() => push(sequence, string)}>PUSH</button>
      <TestTable />
    </div>
  );
};

const mapState = state => ({
  sequence: state.notifications.sequence
});

const mapDispatch = dispatch => ({
  push: (id, message) => dispatch(pushSuccessNotification(id, message))
});

export default connect(mapState, mapDispatch)(SecurityGroup);
