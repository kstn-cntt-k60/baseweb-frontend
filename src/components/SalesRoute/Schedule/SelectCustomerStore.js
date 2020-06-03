import React, { useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configStoreTable,
  GOT_CLUSTERING_LIST,
  GET_CLUSTERING_FAILED
} from "../../../actions/schedule";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Box
} from "@material-ui/core";
import { generate } from "../../../util";
import AccountCircle from "@material-ui/icons/AccountCircle";
import RoomIcon from "@material-ui/icons/Room";
import { apiGet } from "../../../actions";
import GoogleMapDisplaySelectedStore from "./GoogleMapDisplaySelectedStore";
import ChooseConfigDialog from "./ChooseConfigDialog";

const useStyles = makeStyles(theme => ({
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
  },
  textField: {
    margin: theme.spacing(1),
    width: "120px"
  },
  button: {
    margin: theme.spacing(1),
    lineHeight: "35px"
  },
  margin: {
    margin: theme.spacing(1)
  },
  iconButton: {
    cursor: "pointer"
  }
}));

const SelectCustomerStore = ({
  getCluster,
  nClusterStore,
  onClickClustering,
  stores,
  onSelectStores
}) => {
  const classes = useStyles();

  const [nCluster, setNCluster] = useState(3);
  const [selectedClusterId, setSelectedClusterId] = useState(null);
  const [selectedStoreMap, setSelectedStoreMap] = useState({});
  const [currentStore, setCurrentStore] = useState(null);

  const [currentChosenStore, setCurrentChosenStore] = useState(null);

  const onClustering = () => {
    onClickClustering(nCluster);
    setSelectedClusterId(null);
  };

  const onShowCluster = index => {
    setSelectedClusterId(index);
  };

  const onSelectStore = store => {
    setSelectedStoreMap({ ...selectedStoreMap, [store.id]: store });
    setCurrentStore(store);
  };

  const selectedConfigId = currentChosenStore
    ? stores[currentChosenStore.id] && stores[currentChosenStore.id].config.id
    : null;

  const showClusterTable = nClusterStore === parseInt(nCluster);

  return (
    <Paper>
      <div className={classes.margin}>
        <TextField
          className={classes.textField}
          label="N-Cluster"
          type="number"
          value={nCluster}
          onChange={e => setNCluster(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onClustering}
          disabled={parseInt(nCluster) === nClusterStore}
        >
          Clustering
        </Button>
      </div>

      {/* table cluster */}
      {showClusterTable ? (
        <div className={classes.margin}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">Cluster Table List</Box>
          </Typography>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      Cluster List
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generate(nClusterStore).map(index => (
                    <TableRow
                      key={index}
                      className={classes.row}
                      onClick={() => onShowCluster(index)}
                    >
                      <TableCell>Cluster {index + 1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      ) : null}

      {showClusterTable && selectedClusterId !== null ? (
        <div className={classes.margin}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">
              Cluster {selectedClusterId + 1}
            </Box>
          </Typography>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      Store Name
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                      Customer Name
                    </TableCell>
                    <TableCell className={classes.tableHead}>Address</TableCell>
                    <TableCell className={classes.tableHead}></TableCell>
                    <TableCell className={classes.tableHead}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCluster(selectedClusterId).map(e => (
                    <TableRow key={e.id}>
                      <TableCell>{e.storeName}</TableCell>
                      <TableCell>{e.address}</TableCell>
                      <TableCell>{e.customerName}</TableCell>
                      <TableCell>
                        <RoomIcon
                          className={classes.iconButton}
                          color="secondary"
                          onClick={() => onSelectStore(e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => setCurrentChosenStore(e)}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      ) : null}

      {currentStore ? (
        <div className={classes.margin}>
          <GoogleMapDisplaySelectedStore
            selectedStoreMap={selectedStoreMap}
            currentStore={currentStore}
          />
        </div>
      ) : null}

      <ChooseConfigDialog
        open={currentChosenStore ? true : false}
        onClose={() => setCurrentChosenStore(null)}
        currentChosenStore={currentChosenStore}
        selectedConfigId={selectedConfigId}
        onSelectStores={onSelectStores}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.schedule.clusteringState,
  state => state.schedule.clusterMap,
  state => state.schedule.nClusterStore,
  (clusteringState, clusterMap, nClusterStore) => {
    return {
      clusteringState,
      getCluster: index => clusterMap[index],
      nClusterStore
    };
  }
);

const mapDispatch = dispatch => ({
  configTable: config => dispatch(configStoreTable(config)),
  onClickClustering: nCluster =>
    dispatch(
      apiGet(
        `/api/schedule/view-clustering?nCluster=${nCluster}`,
        GOT_CLUSTERING_LIST,
        GET_CLUSTERING_FAILED
      )
    )
});

export default connect(mapState, mapDispatch)(SelectCustomerStore);
