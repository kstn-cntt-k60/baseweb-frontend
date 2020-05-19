import React from "react";
import { connect } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../../actions";
import { DELETED_SCHEDULE } from "../../../actions/schedule";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteScheduleDialog = ({
  open,
  scheduleId,
  onClose,
  deleteSchedule
}) => {
  const classes = useStyles();

  const onYes = () => {
    deleteSchedule(scheduleId);
    onClose();
  };

  const title = "Do you want to delete this schedule?";

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
  deleteSchedule: id =>
    dispatch(apiPost("/api/schedule/delete-schedule", { id }, DELETED_SCHEDULE))
});

export default connect(mapState, mapDispatch)(DeleteScheduleDialog);
