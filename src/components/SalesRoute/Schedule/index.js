import React, { useState } from "react";
import { connect } from "react-redux";

import SelectPlanning from "./SelectPlanning";
import SelectSalesman from "./SelectSalesman";
import FinalStep from "./FinalStep";
import SelectCustomerStore from "./SelectCustomerStore";

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
  "Select Salesman",
  "Select Customer Store && Config"
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
  stores,
  onSelectStores,
  salesman,
  onSelectSalesman,
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
        <SelectSalesman
          selectedSalesman={salesman}
          onSelectSalesman={onSelectSalesman}
        />
      );

    case 2:
      return (
        <SelectCustomerStore stores={stores} onSelectStores={onSelectStores} />
      );

    case 3:
      return (
        <FinalStep
          planning={planning}
          stores={stores}
          salesman={salesman}
          onCancel={onCancel}
          onAdd={onAdd}
        />
      );

    default:
      return <div></div>;
  }
};

const allowNext = (step, planning, stores, salesman) => {
  switch (step) {
    case 0:
      return planning !== null;

    case 1:
      return salesman !== null;

    case 2:
      return Object.values(stores).some(s => !s.config.id !== true);
    //   return stores !== null;

    default:
      return true;
  }
};

const Schedule = ({ addSchedule }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [planning, setPlanning] = useState(null);
  const [stores, setStores] = useState({});
  const [salesman, setSalesman] = useState(null);

  const next = () => setActiveStep(activeStep + 1);

  const onSelectPlanning = planning => {
    setPlanning(planning);
    setStores({});
    next();
  };

  const onSelectStores = (currentStore, config) => {
    if (
      stores[currentStore.id] &&
      stores[currentStore.id].config.id === config.id
    ) {
      setStores({
        ...stores,
        [currentStore.id]: undefined
      });
    } else {
      setStores({
        ...stores,
        [currentStore.id]: { ...currentStore, config: config }
      });
    }
  };

  const onSelectSalesman = salesman => {
    setSalesman(salesman);
    setStores({});
    next();
  };

  const onCancel = () => {
    setActiveStep(0);
    setPlanning(null);
    setStores({});
    setSalesman(null);
  };

  const customerStore = Object.values(stores).map(store => ({
    customerStoreId: store.id,
    configId: store.config.id
  }));

  console.log(customerStore);

  const onAdd = () => {
    addSchedule({
      planningId: planning.id,
      customerStores: customerStore,
      salesmanId: salesman.id
    });
  };

  return (
    <div>
      <ScheduleStep
        step={activeStep}
        planning={planning}
        onSelectPlanning={onSelectPlanning}
        stores={stores}
        onSelectStores={onSelectStores}
        salesman={salesman}
        onSelectSalesman={onSelectSalesman}
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
            disabled={!allowNext(activeStep, planning, stores, salesman)}
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
