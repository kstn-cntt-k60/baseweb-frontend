import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import CustomerStoreTable from "./CustomerStoreTable";
import EditCustomerStoreDialog from "./EditCustomerStoreDialog";
import DeleteCustomerStoreDialog from "./DeleteCustomerStoreDialog";

const CustomerStore = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const history = useHistory();

  const onClickAdd = () => {
    history.push("/facility/add-facility");
  };

  const onEdit = id => {
    setEditId(id);
    setOpenEdit(true);
  };

  const onDelete = id => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={onClickAdd}>
        Add Customer Store
      </Button>

      <CustomerStoreTable onEdit={onEdit} onDelete={onDelete} />

      <EditCustomerStoreDialog
        storeId={editId}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteCustomerStoreDialog
        storeId={deleteId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default CustomerStore;
