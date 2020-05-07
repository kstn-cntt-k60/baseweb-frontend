import React from "react";

import ExportableOrderTable from "./ExportableOrderTable";
import CompletedOrderTable from "./CompletedOrderTable";

const Export = () => {
  return (
    <div>
      <ExportableOrderTable />
      <CompletedOrderTable />
    </div>
  );
};

export default Export;
