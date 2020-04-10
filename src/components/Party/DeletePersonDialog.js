import React from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { connect } from "react-redux";

import { apiPost } from "../../actions";
import { DELETED_PERSON } from "../../actions/account";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeletePersonDialog = ({ open, personId, onClose, deletePerson }) => {
  const classes = useStyles();

  const handleYes = () => {
    deletePerson(personId);
    onClose();
  };

  const title = "Do you want to delete this person?";

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

const mapState = () => ({});

const mapDispatch = dispatch => ({
  deletePerson: id =>
    dispatch(apiPost("/api/account/delete-person", { id }, DELETED_PERSON))
});

export default connect(mapState, mapDispatch)(DeletePersonDialog);
