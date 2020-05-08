import React from "react";
import { connect } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { DELETED_PLANNING_PERIOD } from "../../actions/salesroute";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeletePlanningPeriodDialog = ({
  open,
  planningPeriodId,
  onClose,
  deletePlanningPeriod
}) => {
  const classes = useStyles();

  const onYes = () => {
    deletePlanningPeriod(planningPeriodId);
    onClose();
  };

  const title = "Do you want to delete this planning period?";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <h2>{title}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          No
        </Button>
        <Button onClick={onYes} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  deletePlanningPeriod: id =>
    dispatch(
      apiPost(
        "/api/sales-route/delete-planning-period",
        { id },
        DELETED_PLANNING_PERIOD
      )
    )
});

export default connect(mapState, mapDispatch)(DeletePlanningPeriodDialog);
