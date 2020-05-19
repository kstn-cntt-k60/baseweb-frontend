import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SalesmanTable from "./SalesmanTable";
import { Button } from "@material-ui/core";
import DeleteSalesmanDialog from "./DeleteSalesmanDialog";

const Salesman = () => {
  const history = useHistory();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteSalesmanId, setDeleteSalesmanId] = useState(null);

  const onDelete = id => {
    setDeleteSalesmanId(id);
    setOpenDelete(true);
  };

  const onOpenAddSalesman = () => {
    history.push("/sales-route/add-salesman");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={onOpenAddSalesman}>
        Add Salesman
      </Button>
      <SalesmanTable onDelete={onDelete} />

      <DeleteSalesmanDialog
        open={openDelete}
        salesmanId={deleteSalesmanId}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default Salesman;
