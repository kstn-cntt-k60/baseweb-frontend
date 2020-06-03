import React, { useEffect } from "react";
import { connect } from "react-redux";
import "date-fns";

import {
  fetchConfigList,
  configConfigTable
} from "../../../actions/salesroute";
import { formatTime, zeroPad, formatDay } from "../../../util";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TablePagination
} from "@material-ui/core";
import { createSelector } from "reselect";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ddd"
    }
  },
  rowSelected: {
    cursor: "pointer",
    backgroundColor: "#afa",
    "&:hover": {
      backgroundColor: "#8f8"
    }
  }
}));

const ChooseConfigDialog = ({
  open,
  onClose,
  entries,
  configCount,
  config,
  fetchConfigList,
  configTable,
  currentChosenStore,
  selectedConfigId,
  onSelectStores
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchConfigList();
  }, [config]);

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({
      pageSize: e.target.value
    });
  };

  const rowClass = id =>
    id === selectedConfigId ? classes.rowSelected : classes.row;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose one Sales Route Config</DialogTitle>
      <DialogContent>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>
                    Sales Route Config Code
                  </TableCell>
                  <TableCell className={classes.tableHead}>
                    Repeat Week
                  </TableCell>
                  <TableCell className={classes.tableHead}>Day</TableCell>
                  <TableCell className={classes.tableHead}>
                    Created By
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map(e => (
                  <TableRow
                    key={e.id}
                    className={rowClass(e.id)}
                    onClick={() => onSelectStores(currentChosenStore, e)}
                  >
                    <TableCell>{e.displayId}</TableCell>
                    <TableCell>{e.repeatWeek}</TableCell>
                    <TableCell>{e.dayList}</TableCell>
                    <TableCell>{e.createdBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={configCount}
            rowsPerPage={config.pageSize}
            page={config.page}
            onChangePage={onPageChange}
            onChangeRowsPerPage={onPageSizeChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const formatDayList = dayList =>
  dayList
    .split(", ")
    .map(d => parseInt(d))
    .map(d => formatDay(d))
    .map(d => d.toString())
    .join(", ");

const mapState = createSelector(
  state => state.salesroute.configMap,
  state => state.salesroute.configIdList,
  state => state.salesroute.configCount,
  state => state.salesroute.configTable,
  (configMap, configIdList, configCount, config) => ({
    config,
    entries: configIdList
      .map(id => configMap[id])
      .map(w => ({
        ...w,
        dayList: formatDayList(w.dayList),
        displayId: zeroPad(w.id, 5),
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    configCount
  })
);

const mapDispatch = dispatch => ({
  fetchConfigList: () => dispatch(fetchConfigList()),
  configTable: config => dispatch(configConfigTable(config))
});

export default connect(mapState, mapDispatch)(ChooseConfigDialog);
