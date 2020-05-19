import React, { useState } from "react";
import { connect } from "react-redux";

import SelectPlanning from "./SelectPlanning";
import SelectCustomer from "./SelectCustomer";
import SelectSalesman from "./SelectSalesman";
import SelectConfig from "./SelectConfig";
import FinalStep from "./FinalStep";

import {
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  makeStyles
} from "@material-ui/core";

import { ADDED_SCHEDULE, ADD_SCHEDULE_FAILED } from "../../../actions/schedule";
import { apiPost } from "../../../actions";

const steps = [
  "Select Planning",
  "Select Customer",
  "Select Salesman",
  "Select Config"
];

const useStyles = makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

const ScheduleStep = ({
  step,
  planning,
  onSelectPlanning,
  customer,
  onSelectCustomer,
  salesman,
  onSelectSalesman,
  config,
  onSelectConfig,
  onCancel,
  onAdd
}) => {
  switch (step) {
    case 0:
      return (
        <SelectPlanning
          selectedPlanning={planning}
          onSelectPlanning={onSelectPlanning}
        />
      );

    case 1:
      return (
        <SelectCustomer
          selectedCustomer={customer}
          onSelectCustomer={onSelectCustomer}
        />
      );

    case 2:
      return (
        <SelectSalesman
          selectedSalesman={salesman}
          onSelectSalesman={onSelectSalesman}
        />
      );

    case 3:
      return (
        <SelectConfig selectedConfig={config} onSelectConfig={onSelectConfig} />
      );

    case 4:
      return (
        <FinalStep
          planning={planning}
          customer={customer}
          salesman={salesman}
          config={config}
          onCancel={onCancel}
          onAdd={onAdd}
        />
      );

    default:
      return <div></div>;
  }
};

const allowNext = (step, planning, customer, salesman, config) => {
  switch (step) {
    case 0:
      return planning !== null;

    case 1:
      return customer !== null;

    case 2:
      return salesman !== null;

    case 3:
      return config !== null;

    default:
      return true;
  }
};

const Schedule = ({ addSchedule }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [planning, setPlanning] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [salesman, setSalesman] = useState(null);
  const [config, setConfig] = useState(null);

  const next = () => setActiveStep(activeStep + 1);

  const onSelectPlanning = planning => {
    setPlanning(planning);
    next();
  };

  const onSelectCustomer = customer => {
    setCustomer(customer);
    next();
  };

  const onSelectSalesman = salesman => {
    setSalesman(salesman);
    next();
  };

  const onSelectConfig = config => {
    setConfig(config);
    next();
  };

  const onCancel = () => {
    setActiveStep(0);
    setPlanning(null);
    setCustomer(null);
    setSalesman(null);
    setConfig(null);
  };

  const onAdd = () => {
    addSchedule({
      planningId: planning.id,
      customerId: customer.id,
      salesmanId: salesman.id,
      configId: config.id
    });
  };

  return (
    <div>
      <ScheduleStep
        step={activeStep}
        planning={planning}
        onSelectPlanning={onSelectPlanning}
        customer={customer}
        onSelectCustomer={onSelectCustomer}
        salesman={salesman}
        onSelectSalesman={onSelectSalesman}
        config={config}
        onSelectConfig={onSelectConfig}
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
            disabled={
              !allowNext(activeStep, planning, customer, salesman, config)
            }
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
  addSchedule: schedule =>
    dispatch(
      apiPost(
        "/api/schedule/add-schedule",
        schedule,
        ADDED_SCHEDULE,
        ADD_SCHEDULE_FAILED
      )
    )
});

export default connect(mapState, mapDispatch)(Schedule);
