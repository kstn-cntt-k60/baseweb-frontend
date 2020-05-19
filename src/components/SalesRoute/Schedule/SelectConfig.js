import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { configConfigTable, fetchConfigList } from "../../../actions/schedule";
import AddConfigDialog from "../AddConfigDialog";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  makeStyles,
  Divider,
  Button
} from "@material-ui/core";
import { formatTime, zeroPad } from "../../../util";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee"
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

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const SelectConfig = ({
  entries,
  configCount,
  config,
  selectedConfig,
  fetchConfig,
  configTable,
  onSelectConfig
}) => {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, [config]);

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({
      pageSize: e.target.value
    });
  };

  const onSortChange = name => {
    if (name === config.sortedBy) {
      configTable({ sortOrder: switchSortOrder(config.sortOrder) });
    } else {
      configTable({ sortedBy: name });
    }
  };

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  const rowClass = id =>
    id === (selectedConfig && selectedConfig.id)
      ? classes.rowSelected
      : classes.row;
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add Sales Route Config
      </Button>
      <Divider />
      <AddConfigDialog open={openAdd} onClose={() => setOpenAdd(false)} />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "name"}
                    onClick={() => onSortChange("name")}
                    direction={sortOrder}
                  >
                    Sales Route Config Code
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.tableHead}>Repeat Week</TableCell>
                <TableCell className={classes.tableHead}>Day</TableCell>
                <TableCell className={classes.tableHead}>Created By</TableCell>
                <TableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "createdAt"}
                    onClick={() => onSortChange("createdAt")}
                    direction={sortOrder}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "updatedAt"}
                    onClick={() => onSortChange("updatedAt")}
                    direction={sortOrder}
                  >
                    Updated At
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map(e => (
                <TableRow
                  key={e.id}
                  className={rowClass(e.id)}
                  onClick={() => onSelectConfig(e)}
                >
                  <TableCell>{e.displayId}</TableCell>
                  <TableCell>{e.repeatWeek}</TableCell>
                  <TableCell>{e.dayList}</TableCell>
                  <TableCell>{e.createdBy}</TableCell>
                  <TableCell>{e.createdAt}</TableCell>
                  <TableCell>{e.updatedAt}</TableCell>
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
      </Paper>
    </div>
  );
};

const mapState = createSelector(
  state => state.schedule.configMap,
  state => state.schedule.configIdList,
  state => state.schedule.configCount,
  state => state.schedule.configTable,
  (configMap, configIdList, configCount, config) => ({
    config,
    entries: configIdList
      .map(id => configMap[id])
      .map(w => ({
        ...w,
        displayId: zeroPad(w.id, 5),
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    configCount
  })
);

const mapDispatch = dispatch => ({
  fetchConfig: () => dispatch(fetchConfigList()),
  configTable: config => dispatch(configConfigTable(config))
});

export default connect(mapState, mapDispatch)(SelectConfig);
