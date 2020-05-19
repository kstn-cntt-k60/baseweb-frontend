import React, { useState } from "react";
import { connect } from "react-redux";

// import SelectPlanning from "./SelectPlanning";
// import SelectCustomer from "./SelectCustomer";
import SelectDetail from "./SelectDetail";
import FinalStep from "./FinalStep";

import {
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../../actions";
import { ADDED_CHECKIN, ADD_CHECKIN_FAILED } from "../../../actions/salesman";

const steps = ["Select Sales Route Detail"];

const useStyles = makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

const CheckingStep = ({ step, onSelectDetail, detail, onAdd, onCancel }) => {
  switch (step) {
    case 0:
      return (
        <SelectDetail onSelectDetail={onSelectDetail} selectedDetail={detail} />
      );

    case 1:
      return <FinalStep detail={detail} onCancel={onCancel} onAdd={onAdd} />;

    default:
      return <div></div>;
  }
};

const allowNext = (step, detail) => {
  switch (step) {
    case 0:
      return detail !== null;

    default:
      return true;
  }
};

const SalesmanChecking = ({ onCheckin }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [detail, setDetail] = useState(null);

  const next = () => setActiveStep(activeStep + 1);

  const onSelectDetail = detail => {
    setDetail(detail);
    next();
  };

  const onCancel = () => {
    setActiveStep(0);
    setDetail(null);
  };

  const onAdd = () => {
    onCheckin({
      detailId: detail.id
    });
  };

  return (
    <div>
      <CheckingStep
        step={activeStep}
        detail={detail}
        onSelectDetail={onSelectDetail}
        onCancel={onCancel}
        onAdd={onAdd}
      />
      <Paper className={classes.stepper}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          disabled={activeStep <= 0}
          onClick={() => setActiveStep(activeStep - 1)}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
        {activeStep < steps.length ? (
          <Button
            onClick={next}
            disabled={!allowNext(activeStep, detail)}
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  onCheckin: checkin =>
    dispatch(
      apiPost(
        "/api/salesman/add-checkin",
        checkin,
        ADDED_CHECKIN,
        ADD_CHECKIN_FAILED
      )
    )
});

export default connect(mapState, mapDispatch)(SalesmanChecking);
