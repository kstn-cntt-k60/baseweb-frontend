import React from "react";
import { useHistory } from "react-router-dom";

import WarehouseTable from "./WarehouseTable";

const Import = () => {
  const history = useHistory();

  const onSelectWarehouse = id => {
    history.push(`/import-export/import-warehouse/${id}`);
  };

  return (
    <div>
      <h3>Choose Warehouse</h3>
      <WarehouseTable onSelect={onSelectWarehouse} />
    </div>
  );
};

export default Import;
