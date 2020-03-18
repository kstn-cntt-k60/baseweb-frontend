import React from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { connect } from "react-redux";
import { closeYesNoDialog } from "../actions";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const YesNoDialog = ({ open, title, action, onClose, onYes }) => {
  const classes = useStyles();

  const handleYes = () => {
    onYes(action);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <h2>{title}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          No
        </Button>
        <Button onClick={handleYes} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = state => ({
  open: state.util.openYesNoDialog,
  title: state.util.yesNoTitle,
  action: state.util.yesNoAction
});

const mapDispatch = dispatch => ({
  onClose: () => dispatch(closeYesNoDialog()),
  onYes: action => dispatch(action)
});

export default connect(mapState, mapDispatch)(YesNoDialog);
