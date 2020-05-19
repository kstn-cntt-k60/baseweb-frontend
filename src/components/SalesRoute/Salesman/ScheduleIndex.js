import React from "react";
import SalesmanSchedule from "./SalesmanSchedule";
import CheckingHistory from "./CheckingHistory";
import { Divider } from "@material-ui/core";

const ScheduleIndex = () => (
  <React.Fragment>
    <SalesmanSchedule />
    <Divider />
    <CheckingHistory />
  </React.Fragment>
);

export default ScheduleIndex;
